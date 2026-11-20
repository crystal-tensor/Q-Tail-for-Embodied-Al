#!/usr/bin/env python3
import argparse,pathlib,json,hashlib,shutil,csv
import numpy as np
import pyarrow.parquet as pq
p=argparse.ArgumentParser();p.add_argument('--root',type=pathlib.Path,default=pathlib.Path('/Volumes/ORICO/qtail_full_data_10w'));a=p.parse_args();root=a.root;m=json.loads((root/'subset_50_manifest.json').read_text());rows=[]
source_rows=list(csv.DictReader((root/'source_files.csv').open()))
for i,s in enumerate(m['selected']):
 fs=[f for f in s['files'] if '/data/chunk-' in f['path'] and f['path'].endswith('.parquet')];assert len(fs)==1
 f=fs[0];dst=root/'EgoDemo'/f['path'];r={'task_index':i,'task':s['task'],'source_episode_uuid':s['source_episode_uuid'],'scene_id':s['scene_id'],'path':f['path'],'expected_bytes':f['bytes'],'verified':False}
 if not dst.exists():
  matches=[x for x in (pathlib.Path.home()/'Downloads').glob('file-000*.parquet') if x.stat().st_size==f['bytes']]
  if len(matches)==1:dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(matches[0],dst)
 if dst.exists():
  try:
   assert dst.stat().st_size==f['bytes'];t=pq.read_table(dst);left=np.array(t['observation.state.hand_left_world'].to_pylist(),dtype=np.float32).reshape(-1,21,3);right=np.array(t['observation.state.hand_right_world'].to_pylist(),dtype=np.float32).reshape(-1,21,3);pose=np.concatenate([left,right],axis=1);ts=t['timestamp'].to_numpy().astype(float);assert len(ts)==len(pose) and len(ts)>25;assert np.all(np.diff(ts)>0)
   official=[x for x in source_rows if x['source_episode_uuid']==s['source_episode_uuid'] and x['format']=='lerobot-v3.0'];assert len(official)==1;official=official[0];assert int(official['frame_count'])==len(pose);assert official['task_name']==s['task'];assert official['scene_id']==s['scene_id']
   finite=np.isfinite(pose).all(axis=(1,2));r.update(official_frame_count=int(official['frame_count']),official_fps=float(official['fps']),official_metadata_match=True)
   r.update(verified=True,bytes=dst.stat().st_size,sha256=hashlib.sha256(dst.read_bytes()).hexdigest(),frames=len(pose),finite_frames=int(finite.sum()),duration_seconds=float(ts[-1]-ts[0]),coordinate_shape=list(pose.shape),median_dt=float(np.median(np.diff(ts))))
   target=root/'pose50';target.mkdir(exist_ok=True);np.savez_compressed(target/f'task_{i:02d}.npz',pose=pose,timestamp=ts,finite=finite)
  except Exception as e:r['error']=type(e).__name__+': '+str(e)[:200]
 rows.append(r)
report={'requested_tasks':50,'verified_tasks':sum(x['verified'] for x in rows),'downloaded_pose_bytes':sum(x.get('bytes',0) for x in rows),'total_frames':sum(x.get('frames',0) for x in rows),'source_revision':m['revision'],'files':rows,'claim_boundary':'Verified complete state-Parquet episodes counted in verified_tasks; not full multimodal LeRobot directories; one episode per task; no robot success labels'};(root/'pose50_download_report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='files'},ensure_ascii=False));print('missing',[r['task_index'] for r in rows if not r['verified']])
