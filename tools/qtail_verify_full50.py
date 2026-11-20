#!/usr/bin/env python3
"""Independently validate the selected LeRobot packages, including full video decode."""
import argparse, pathlib, json, hashlib, subprocess, concurrent.futures, time, shutil
from fractions import Fraction
import numpy as np
import pyarrow.parquet as pq

def sha(path, kind='sha256'):
    h=hashlib.new(kind)
    if kind=='sha1':h.update(('blob '+str(path.stat().st_size)+'\0').encode())
    with path.open('rb') as f:
        for b in iter(lambda:f.read(4*1024*1024),b''):h.update(b)
    return h.hexdigest()

def atomic_json(path,obj):
    tmp=path.with_suffix('.tmp');tmp.write_text(json.dumps(obj,ensure_ascii=False,indent=2));tmp.replace(path)

def verify_episode(root, manifest, index, item, download_records):
    checks=[];files=[];media=[]
    for entry in item['files']:
        path=root/'EgoDemo'/entry['path'];record=download_records[entry['path']]
        assert record['verified'] and record['provider_hash_verified'], 'download_not_provider_verified'
        assert path.stat().st_size==entry['bytes'], 'file_size_mismatch'
        actual=sha(path);assert actual==record['sha256'],'local_sha256_changed'
        if record.get('source_sha256'):assert actual==record['source_sha256'],'provider_sha256_mismatch'
        else:assert sha(path,'sha1')==record['source_git_blob_id'],'provider_git_blob_mismatch'
        if path.suffix=='.json':json.loads(path.read_text())
        if path.suffix=='.parquet':pq.read_table(path)
        files.append({'path':entry['path'],'bytes':entry['bytes'],'sha256':actual,'provider_hash_verified':True})
    base=root/'EgoDemo'/pathlib.Path(item['files'][0]['path']).parent
    info=json.loads((base/'meta/info.json').read_text())
    annotation=json.loads((base/'annotation.json').read_text())
    quality=json.loads((base/'bad_frame_ratio.json').read_text())
    state=pq.read_table(base/'data/chunk-000/file-000.parquet')
    episode=pq.read_table(base/'meta/episodes/chunk-000/file-000.parquet').to_pylist()[0]
    tasks=pq.read_table(base/'meta/tasks.parquet').to_pylist()
    frames=state.num_rows;fps=float(info['fps'])
    assert frames==info['total_frames']==episode['length']==quality['total_frames'],'metadata_frame_count'
    flagged=int(episode.get('quality/hand_bad_frame_count',0) or 0)
    assert flagged==len(quality.get('hand_bad_frame_details',[])),'quality_flag_count'
    assert episode['episode_uuid']==item['source_episode_uuid'] and episode['scene_id']==item['scene_id'],'source_identity'
    assert len(tasks)==1 and tasks[0]['task']==item['task'] and item['task'] in episode['tasks'],'task_identity'
    timestamps=np.asarray(state['timestamp'].to_pylist(),dtype=float)
    assert np.isfinite(timestamps).all() and (np.diff(timestamps)>0).all(),'state_timestamp'
    assert np.max(np.abs(timestamps-np.arange(frames)/fps))<.002,'state_timeline'
    for name in state.schema.names:
        if name.startswith('observation.state.'):
            arr=np.asarray(state[name].to_pylist(),dtype=np.float32)
            assert list(arr.shape[1:])==info['features'][name]['shape'],'state_shape'
            assert np.isfinite(arr).all(),'state_nonfinite'
    for stream in ['observation.images.head_left','observation.images.head_right']:
        path=base/'videos'/stream/'chunk-000/file-000.mp4'
        cmd=['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_frames,duration','-of','json',str(path)]
        probe=subprocess.run(cmd,capture_output=True,text=True,check=True)
        st=json.loads(probe.stdout)['streams'][0];feature=info['features'][stream]
        assert [st['height'],st['width'],3]==feature['shape'],'video_dimensions'
        assert abs(float(Fraction(st['r_frame_rate']))-fps)<1e-6,'video_fps'
        assert int(st['nb_frames'])==frames,'container_frame_count'
        pts=subprocess.run(['ffprobe','-v','error','-select_streams','v:0','-show_packets','-show_entries','packet=pts_time','-of','csv=p=0',str(path)],capture_output=True,text=True,check=True)
        times=np.sort(np.array([float(line.split(',')[0]) for line in pts.stdout.splitlines() if line.strip()],dtype=float))
        assert len(times)==frames and np.isfinite(times).all() and (np.diff(times)>0).all(),'video_timestamps'
        assert np.max(np.abs(times-timestamps))<.002,'video_state_alignment'
        assert abs(float(episode['videos/'+stream+'/from_timestamp']))<1e-5,'episode_video_start'
        assert abs(float(episode['videos/'+stream+'/to_timestamp'])-frames/fps)<1/fps+.002,'episode_video_end'
        # Hardware decode checks every encoded frame; an unavailable accelerator falls back to software.
        common=['ffmpeg','-hide_banner','-v','error','-xerror','-err_detect','explode']
        tail=['-i',str(path),'-map','0:v:0','-an','-sn','-dn','-fps_mode','passthrough','-progress','pipe:1','-nostats','-f','null','-']
        decoder='videotoolbox';run=subprocess.run(common+['-hwaccel','videotoolbox','-threads','1']+tail,capture_output=True,text=True,timeout=1200)
        if run.returncode:
            decoder='software';run=subprocess.run(common+['-threads','2']+tail,capture_output=True,text=True,timeout=1200)
        assert run.returncode==0,'full_video_decode_failed'
        counts=[int(line.split('=',1)[1]) for line in run.stdout.splitlines() if line.startswith('frame=')]
        assert counts and counts[-1]==frames,'decoded_frame_count'
        media.append({'stream':stream,'frames_fully_decoded':counts[-1],'fps':fps,'width':st['width'],'height':st['height'],'decoder':decoder,'video_state_timestamp_max_error_s':float(np.max(np.abs(times-timestamps)))})
    return {'task_index':index,'task':item['task'],'scene_id':item['scene_id'],'episode_uuid':item['source_episode_uuid'],'passed':True,'state_frames':frames,'duration_s':frames/fps,'official_hand_bad_frame_count':flagged,'files':files,'videos':media,'json_files_parsed':4,'parquet_files_read':3,'annotation_segments':len(annotation.get('subtask_annotations',[]))}

def main():
    p=argparse.ArgumentParser();p.add_argument('--root',type=pathlib.Path,required=True);p.add_argument('--watch',action='store_true');a=p.parse_args();root=a.root
    manifest=json.loads((root/'subset_50_manifest.json').read_text());cache=root/'full50_validation_cache';cache.mkdir(exist_ok=True)
    complete={};inflight={};errors={}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        while True:
            try:progress=json.loads((root/'full50_download_progress.json').read_text())
            except (FileNotFoundError,json.JSONDecodeError):progress={'files':[]}
            records={r['path']:r for r in progress['files']}
            for i,item in enumerate(manifest['selected']):
                if i in complete or i in inflight or i in errors:continue
                if not all(records.get(e['path'],{}).get('verified') for e in item['files']):continue
                prior=cache/f'{i:02d}.json'
                if prior.exists():
                    old=json.loads(prior.read_text())
                    if old.get('passed') and all(records.get(f['path'],{}).get('sha256')==f['sha256'] for f in old['files']):
                        if 'official_hand_bad_frame_count' not in old:
                            base=root/'EgoDemo'/pathlib.Path(item['files'][0]['path']).parent
                            old['official_hand_bad_frame_count']=int(pq.read_table(base/'meta/episodes/chunk-000/file-000.parquet',columns=['quality/hand_bad_frame_count']).to_pylist()[0]['quality/hand_bad_frame_count'] or 0)
                        complete[i]=old;continue
                inflight[i]=pool.submit(verify_episode,root,manifest,i,item,records)
            for i,future in list(inflight.items()):
                if future.done():
                    try:result=future.result();complete[i]=result;atomic_json(cache/f'{i:02d}.json',result);print('Fully validated episodes',len(complete),'/50',flush=True)
                    except Exception as e:errors[i]={'error':type(e).__name__,'detail':str(e)[:120]};print('Validation failed task',i,errors[i],flush=True)
                    del inflight[i]
            report={'passed':len(complete)==50 and not errors,'source_repo':manifest['repo'],'source_revision':manifest['revision'],'requested_tasks':50,'requested_files':450,'verified_tasks':len(complete),'verified_files':sum(len(x['files']) for x in complete.values()),'verified_bytes':sum(f['bytes'] for x in complete.values() for f in x['files']),'state_frames':sum(x['state_frames'] for x in complete.values()),'video_streams_fully_decoded':sum(len(x['videos']) for x in complete.values()),'video_frames_fully_decoded':sum(v['frames_fully_decoded'] for x in complete.values() for v in x['videos']),'unique_scenes':len({x['scene_id'] for x in complete.values()}),'duration_s':sum(x['duration_s'] for x in complete.values()),'free_disk_bytes_at_validation':shutil.disk_usage(root).free,'scope':'50 selected EgoStand LeRobot episodes, one per distinct task; head stereo, hand/head/camera states, annotations and complete LeRobot metadata; other SKUs and alternative MCAP representation excluded','checks':['All file byte counts, local SHA256 and provider SHA256 or Git blob hashes','All JSON parse and all Parquet payloads read','Official episode UUID, scene, task, frame counts and shapes','All state coordinate arrays finite; state times strictly increasing','100 video streams fully decoded; video counts, fps, dimensions and timestamp alignment'],'errors':errors,'episodes':[complete[i] for i in sorted(complete)]}
            atomic_json(root/'full50_verification_report.json',report)
            if report['passed'] or errors or (not a.watch and not inflight):print(json.dumps({k:v for k,v in report.items() if k not in ['episodes','checks']},ensure_ascii=False),flush=True);return 0 if report['passed'] else 2
            time.sleep(5)
if __name__=='__main__':raise SystemExit(main())
