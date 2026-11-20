#!/usr/bin/env python3
"""Recheck the delivered single-view subset; no network or model-effect claim."""
import argparse,hashlib,json,pathlib,subprocess
p=argparse.ArgumentParser();p.add_argument('--root',type=pathlib.Path,default=pathlib.Path('/Volumes/ORICO/qtail_full_data_10w'));a=p.parse_args()
r=json.loads((a.root/'verification_report.json').read_text());assert r['verified_pairs']==10 and len(r['files'])==10
assert len({f['scene_id'] for f in r['files']})==10
for f in r['files']:
 path=a.root/'EgoDemo'/f['path'];assert path.stat().st_size==f['expected_bytes'];assert hashlib.sha256(path.read_bytes()).hexdigest()==f['sha256']
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)]));assert abs(float(probe['format']['duration'])-f['duration_seconds'])<.00001
 v=next(v for v in probe['streams'] if v['codec_type']=='video');assert int(v['nb_frames'])==int(f['frames'])
 subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','null','-'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
print('PASS: 10 tasks / 10 scene IDs; sizes, local SHA256, durations, frame counts and full-frame decoding. Provider hashes unavailable; no policy benefit measured.')
