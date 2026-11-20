#!/usr/bin/env python3
"""Pin and verify ten EgoSuite task/scene recordings; never treat metadata as data."""
import argparse, concurrent.futures, hashlib, json, pathlib, shutil, subprocess
from datetime import datetime, timezone
from huggingface_hub import HfApi, hf_hub_download

def main():
    p=argparse.ArgumentParser(); p.add_argument('--root',default='/Volumes/ORICO/qtail_full_data_10w'); p.add_argument('--plan-only',action='store_true'); p.add_argument('--verify-only',action='store_true'); p.add_argument('--all-modalities',action='store_true'); args=p.parse_args()
    root=pathlib.Path(args.root); root.mkdir(parents=True,exist_ok=True)
    api=HfApi(); repo='LightwheelAI/EgoDemo'; manifest=root/'subset_manifest.json'
    if manifest.exists(): plan=json.loads(manifest.read_text())
    else:
        rev=api.dataset_info(repo).sha
        tasks=sorted(x.path for x in api.list_repo_tree(repo,'EgoStand/lerobot',repo_type='dataset',revision=rev) if x.__class__.__name__=='RepoFolder')[:10]
        def select(task):
            scenes=sorted(x.path for x in api.list_repo_tree(repo,task,repo_type='dataset',revision=rev) if x.__class__.__name__=='RepoFolder')
            scene=scenes[0]
            files=[{'path':x.path,'bytes':x.size} for x in api.list_repo_tree(repo,scene,recursive=True,repo_type='dataset',revision=rev) if x.__class__.__name__=='RepoFile']
            return {'task':task.rsplit('/',1)[1],'scene':scene.rsplit('/',1)[1],'files':files}
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex: selected=list(ex.map(select,tasks))
        plan={'repo':repo,'revision':rev,'selection':'alphabetical first 10 task directories; first scene per task; complete LeRobot recording including both videos','target_task_scene_pairs':10,'selected':selected}
        manifest.write_text(json.dumps(plan,ensure_ascii=False,indent=2))
    selected_files=lambda scene: scene['files'] if args.all_modalities else [f for f in scene['files'] if '/observation.images.head_left/' in f['path']]
    assert len(plan['selected'])==10 and all(selected_files(s) for s in plan['selected'])
    report={'scope':'full_multimodal_recordings' if args.all_modalities else 'one_complete_left_video_per_task_scene','checked_at':datetime.now(timezone.utc).isoformat(),'revision':plan['revision'],'requested_pairs':10,'downloaded_pairs':0,'verified_pairs':0,'status':'planned','total_planned_bytes':sum(f['bytes'] for s in plan['selected'] for f in selected_files(s)),'files':[],'errors':[],'claim_boundary':'10 recordings, not 100,000 hours; no policy gain measured'}
    if not args.plan_only:
        try:
            if not args.verify_only: api.auth_check(repo_id=repo,repo_type='dataset')
        except Exception as e: report['status']='blocked_access'; report['errors'].append(type(e).__name__+': dataset login/access required')
        else:
            if shutil.disk_usage(root).free < report['total_planned_bytes']*1.1: raise RuntimeError('Insufficient disk space')
            for scene in plan['selected']:
                ok=True; present=True
                for f in selected_files(scene):
                    item={'path':f['path'],'expected_bytes':f['bytes']}
                    try:
                        path=(root/'EgoDemo'/f['path']) if args.verify_only else pathlib.Path(hf_hub_download(repo,f['path'],repo_type='dataset',revision=plan['revision'],local_dir=root/'EgoDemo'))
                        assert path.stat().st_size==f['bytes'],'size mismatch'
                        h=hashlib.sha256()
                        with path.open('rb') as stream:
                            for chunk in iter(lambda:stream.read(8*1024*1024),b''): h.update(chunk)
                        item['sha256']=h.hexdigest()
                        if path.suffix=='.parquet':
                            import pyarrow.parquet as pq
                            table=pq.read_table(path); item['rows']=table.num_rows; item['columns']=table.column_names
                            assert table.num_rows>0,'empty table'
                        elif path.suffix=='.json': json.loads(path.read_text())
                        elif path.suffix=='.mp4':
                            if not shutil.which('ffprobe'): raise RuntimeError('ffprobe required for video validation')
                            probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
                            assert any(x['codec_type']=='video' for x in probe['streams'])
                            item['duration_seconds']=float(probe['format']['duration']); assert item['duration_seconds']>0
                        item['verified']=True
                    except Exception as e:
                        item['verified']=False; item['error']=str(e)[:200]; ok=False
                        if not (root/'EgoDemo'/f['path']).exists(): present=False
                    report['files'].append(item)
                report['downloaded_pairs']+=int(present); report['verified_pairs']+=int(ok)
            report['status']='verified' if report['verified_pairs']==10 else 'incomplete'
    (root/'verification_report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)); print(json.dumps({k:v for k,v in report.items() if k!='files'},ensure_ascii=False,indent=2))
    return 0 if report['status'] in ('verified','planned') else 2
if __name__=='__main__': raise SystemExit(main())
