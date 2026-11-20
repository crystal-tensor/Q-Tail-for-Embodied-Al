#!/usr/bin/env python3
"""Download50 full state Parquets with the user's own approved HF credentials."""
import argparse,pathlib,json,shutil
from huggingface_hub import hf_hub_download
p=argparse.ArgumentParser();p.add_argument('--root',type=pathlib.Path,required=True);a=p.parse_args();manifest=pathlib.Path('results/finals_50tasks_20261120/subset_50_manifest.json');m=json.loads(manifest.read_text());a.root.mkdir(parents=True,exist_ok=True);(a.root/manifest.name).write_text(json.dumps(m,ensure_ascii=False,indent=2))
for s in m['selected']:
 files=[f for f in s['files'] if '/data/chunk-' in f['path'] and f['path'].endswith('.parquet')];assert len(files)==1
 f=files[0];path=pathlib.Path(hf_hub_download(repo_id='LightwheelAI/EgoDemo',repo_type='dataset',filename=f['path'],revision=m['revision'],local_dir=a.root/'EgoDemo'));assert path.stat().st_size==f['bytes'];print(s['task'],f['bytes'])
source=hf_hub_download(repo_id='LightwheelAI/EgoDemo',repo_type='dataset',filename='EgoStand/manifests/files.csv',revision=m['revision'],local_dir=a.root);shutil.copy2(source,a.root/'source_files.csv')
