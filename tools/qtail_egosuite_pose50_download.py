#!/usr/bin/env python3
"""Download all 450 files of the 50 selected EgoStand LeRobot episodes.

Use HF_TOKEN or `hf auth login` with an account approved for EgoDemo.
Only --state-only restricts the request to the 50 state Parquets.
"""
import argparse,pathlib,json,hashlib,concurrent.futures,time,shutil
from huggingface_hub import hf_hub_download,hf_hub_url,get_hf_file_metadata

def digest(path,kind='sha256'):
 h=hashlib.new(kind)
 if kind=='sha1':h.update(('blob '+str(path.stat().st_size)+'\0').encode())
 with path.open('rb') as f:
  for b in iter(lambda:f.read(4*1024*1024),b''):h.update(b)
 return h.hexdigest()

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--root',type=pathlib.Path,required=True);p.add_argument('--state-only',action='store_true');p.add_argument('--workers',type=int,default=8);args=p.parse_args();args.root.mkdir(parents=True,exist_ok=True)
 manifest=pathlib.Path(__file__).resolve().parents[1]/'results/finals_50tasks_20261120/subset_50_manifest.json';m=json.loads(manifest.read_text());(args.root/manifest.name).write_text(json.dumps(m,ensure_ascii=False,indent=2))
 jobs=[(k,s['task'],f) for k,s in enumerate(m['selected']) for f in s['files'] if not args.state_only or '/data/chunk-' in f['path'] and f['path'].endswith('.parquet')];records=[];start=time.time();output=args.root/('state50_download_progress.json' if args.state_only else 'full50_download_progress.json')
 def work(job):
  k,task,entry=job;url=hf_hub_url(m['repo'],entry['path'],repo_type='dataset',revision=m['revision']);meta=get_hf_file_metadata(url,token=True);path=pathlib.Path(hf_hub_download(repo_id=m['repo'],repo_type='dataset',filename=entry['path'],revision=m['revision'],local_dir=args.root/'EgoDemo',token=True));assert path.stat().st_size==entry['bytes'],'Manifest byte count mismatch';expected=meta.etag.strip('"');kind='sha256' if len(expected)==64 else 'sha1';assert len(expected) in (40,64),'No recognized provider content hash';assert digest(path,kind)==expected,'Provider content hash mismatch'
  return {'task_index':k,'task':task,'path':entry['path'],'expected_bytes':entry['bytes'],'bytes':path.stat().st_size,'sha256':digest(path),'source_sha256':expected if kind=='sha256' else None,'source_git_blob_id':expected if kind=='sha1' else None,'provider_hash_verified':True,'verified':True}
 def save():
  report={'requested_tasks':50,'requested_files':len(jobs),'complete_files':len(records),'expected_bytes':sum(f['bytes'] for _,_,f in jobs),'verified_bytes':sum(x['bytes'] for x in records),'source_revision':m['revision'],'elapsed_seconds':round(time.time()-start,1),'files':sorted(records,key=lambda x:x['path'])};tmp=output.with_suffix('.tmp');tmp.write_text(json.dumps(report,ensure_ascii=False,indent=2));tmp.replace(output)
 save()
 with concurrent.futures.ThreadPoolExecutor(max_workers=max(1,min(args.workers,20))) as pool:
  pending={pool.submit(work,j):j for j in jobs}
  for future in concurrent.futures.as_completed(pending):
   records.append(future.result());save()
   if len(records)%10==0:print(f'Provider-verified {len(records)}/{len(jobs)} files',flush=True)
 source=hf_hub_download(repo_id=m['repo'],repo_type='dataset',filename='EgoStand/manifests/files.csv',revision=m['revision'],local_dir=args.root,token=True);shutil.copy2(source,args.root/'source_files.csv');print('Download complete; run qtail_verify_full50.py for structural and full video validation.')

if __name__=='__main__':main()
