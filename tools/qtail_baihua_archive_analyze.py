#!/usr/bin/env python3
"""Verify platform-retrieved Baihua counts and produce matched historical references."""
import json,pathlib,hashlib,re,numpy as np
from quafu.simulators import simulate
R=pathlib.Path('results/finals_50tasks_20261120/historical_baihua');rows=[];selected=[2604191311391358859,2604191544020368432,2604191619343003590];pooled=np.zeros(32768)
for path in sorted(R.glob('26*.json')):
 raw=json.loads(path.read_text());r=raw['result'];q=raw['query'];assert r['chip']=='Baihua' and r['status']=='Finished';assert q['total']==1 and q['items'][0]['chipName']=='Baihua';assert sum(r['count'].values())==r['shots'];assert r['error']==''
 assert all(len(k)==15 and set(k)<=set('01') for k in r['count']);sha=hashlib.sha256(r['circuit'].encode()).hexdigest();compiled_sha=hashlib.sha256(r['transpiled'].encode()).hexdigest()
 row={'task_id':str(r['tid']),'chip':'Baihua','status':'Finished','shots':r['shots'],'observed_outcomes':len(r['count']),'logical_qubits':15,'logical_cx_gates':len(re.findall(r'^cx ',r['circuit'],re.M)),'logical_rotation_gates':len(re.findall(r'^r[xyz]\(',r['circuit'],re.M)),'qasm_sha256':sha,'compiled_qasm_sha256':compiled_sha,'created_platform':r['created'],'finished_platform':r['finished'],'submitTime':q['items'][0]['submitTime'],'source':'platform API re-retrieved 2026-11-20; historical run, not a new execution'};rows.append(row)
 if int(r['tid']) in selected:
  for k,v in r['count'].items():pooled[int(k,2)]+=v
 (R/(str(r['tid'])+'.qasm')).write_text(r['circuit']);(R/(str(r['tid'])+'.compiled.qasm')).write_text(r['transpiled'])
assert len({x['qasm_sha256'] for x in rows})==1;assert pooled.sum()==3*99328
ideal=np.asarray(simulate(r['circuit']).probabilities);assert abs(ideal.sum()-1)<1e-9
# Same shot total for classical sampling reference; sorting makes bit-order immaterial downstream.
shotmatched=np.random.default_rng(20261120).multinomial(int(pooled.sum()),ideal);np.savez_compressed(R/'probabilities.npz',hardware=pooled/pooled.sum(),ideal=ideal,ideal_shotmatched=shotmatched/shotmatched.sum(),selected_task_ids=np.array(selected,dtype=np.int64))
summary={'verified_runs':len(rows),'historical_dates':['2026-04-19','2026-04-21'],'pooled_task_ids':[str(x) for x in selected],'pooled_shots':int(pooled.sum()),'pooled_observed_outcomes':int((pooled>0).sum()),'rows':rows,'bit_order_boundary':'probability masses rank matched only; no bit-string XEB claimed','claim_boundary':'historical hardware distribution used in a new offline hand-pose pilot; no new robot hardware execution or quantum advantage claim'};(R/'audit_summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in summary.items() if k!='rows'},ensure_ascii=False))
