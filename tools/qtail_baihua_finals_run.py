#!/usr/bin/env python3
"""Baihua-only RCS submission based on the user's seed-7 reference circuit."""
import ast,contextlib,hashlib,io,json,math,pathlib,random,sys,time
from datetime import datetime,timezone
from quafu import QuantumCircuit
from quark import Task
OUT=pathlib.Path('results/finals_50tasks_20261120/hardware');OUT.mkdir(parents=True,exist_ok=True)
import os
token=os.environ.get('QUAFU_TOKEN');assert token,'Set QUAFU_TOKEN locally'
with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):task=Task(token)
if sys.argv[-1]=='probe':
 with contextlib.redirect_stdout(io.StringIO()):status=task.request(task.URL+'/task/status/0')
 if isinstance(status,dict):print(json.dumps({'Baihua':status.get('Baihua'),'server':task.URL},default=str))
 else: print('Baihua status response type:',type(status).__name__)
 raise SystemExit()
rng=random.Random(7);qc=QuantumCircuit(5,5)
for q in range(5):qc.h(q)
for _ in range(6):
 for q in range(5):qc.ry(q,rng.random()*math.pi)
 for q in range(4):qc.cnot(q,q+1)
qc.measure(list(range(5)),list(range(5)));qasm=qc.to_openqasm();(OUT/'circuit.qasm').write_text(qasm);sha=hashlib.sha256(qasm.encode()).hexdigest()
for repeat_idx in range(3):
 receipt=OUT/f'run_{repeat_idx}.json'
 if receipt.exists():record=json.loads(receipt.read_text())
 else:
  record={'chip':'Baihua','circuit_sha256':sha,'qubits':5,'circuit_seed':7,'shots_requested':2048,'repeat_index':repeat_idx,'submitted_at':datetime.now(timezone.utc).isoformat(),'status':'submission_intent'};receipt.write_text(json.dumps(record,indent=2))
  payload={'chip':'Baihua','name':f'qtail_finals50_rcs_s7_r{repeat_idx}_{datetime.now().strftime("%Y%m%dT%H%M%S")}','circuit':qasm,'compile':True}
  try:
   with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):tid=task.run(payload,repeat=2)
   assert isinstance(tid,(int,str)) and str(tid).isdigit(),'No task identifier returned'
   record.update(task_id=str(tid),task_name=payload['name'],status='Submitted');receipt.write_text(json.dumps(record,indent=2));print('SUBMITTED Baihua',tid,flush=True)
  except Exception as e:
   record.update(status='submission_unconfirmed',error_type=type(e).__name__);receipt.write_text(json.dumps(record,indent=2));print('Submission unconfirmed; do not automatically resubmit',type(e).__name__,flush=True);raise SystemExit(2)
 if not record.get('task_id'):print('Missing task ID; inspect task list before resubmission');raise SystemExit(2)
 if record.get('status')=='Finished':continue
 for poll in range(150):
  try:
   with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):res=task.result(int(record['task_id']))
   if isinstance(res,dict) and res.get('count'):
    counts=res['count'];assert isinstance(counts,dict) and sum(counts.values())==2048
    assert all(set(k)<=set('01') and len(k)==5 for k in counts)
    record.update(status='Finished',counts=counts,shots_observed=sum(counts.values()),finished_observed_at=datetime.now(timezone.utc).isoformat(),result_fields=sorted(res.keys()))
    (OUT/f'result_{repeat_idx}.json').write_text(json.dumps(res,ensure_ascii=False,indent=2,default=str));receipt.write_text(json.dumps(record,indent=2));print('FINISHED Baihua',record['task_id'],'shots',sum(counts.values()),flush=True);break
  except Exception as e:print('poll',poll,type(e).__name__,flush=True)
  time.sleep(4)
 else:print('Pending task',record['task_id'],flush=True);raise SystemExit(3)
