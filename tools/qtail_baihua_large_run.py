#!/usr/bin/env python3
"""One topology-aware 54-active-qubit Baihua scale check. No other chip is permitted."""
import ast,contextlib,io,json,pathlib,hashlib,random,math,os,sys,time
from datetime import datetime,timezone
import networkx as nx
from quafu import QuantumCircuit
from quark import Task
R=pathlib.Path('results/finals_50tasks_20261120/hardware_large');R.mkdir(parents=True,exist_ok=True)
token=os.environ.get('QUAFU_TOKEN');assert token,'Set QUAFU_TOKEN locally'
with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):task=Task(token)
receipt=R/'receipt.json'
if not receipt.exists():
 r=json.loads((R/'backend_snapshot.json').read_text());g=nx.Graph()
 for x in r['qubits_info'].values():
  if x['fidelity']>0:g.add_node(x['index'],fidelity=x['fidelity'])
 for x in r['couplers_info'].values():
  u,v=x['qubits_index']
  if x['fidelity']>0 and u in g and v in g:g.add_edge(u,v,fidelity=x['fidelity'],weight=x['fidelity'])
 component=max(nx.connected_components(g),key=len);assert len(component)>=54
 tree=nx.maximum_spanning_tree(g.subgraph(component));largest=len(tree)
 while len(tree)>54:
  leaves=[x for x in tree if tree.degree[x]==1];bad=min(leaves,key=lambda x:(tree.nodes[x]['fidelity']*tree.edges[x,next(iter(tree[x]))]['fidelity'],x));tree.remove_node(bad)
 physical=sorted(tree);mapping={v:i for i,v in enumerate(physical)};assert len(physical)==54 and nx.is_connected(tree)
 edges=sorted(tree.edges());colors=[]
 for edge in edges:
  used={color for e,color in colors if set(edge)&set(e)};color=next(c for c in range(6) if c not in used);colors.append((edge,color))
 circuit=QuantumCircuit(54,54);rg=random.Random(7)
 for q in range(54):circuit.h(q)
 for cycle in range(2):
  for q in range(54):circuit.ry(q,rg.random()*math.pi)
  for edge,color in sorted(colors,key=lambda x:(x[1],x[0])):circuit.cz(mapping[edge[0]],mapping[edge[1]])
 for q in range(54):circuit.ry(q,rg.random()*math.pi)
 circuit.measure(list(range(54)),list(range(54)));qasm=circuit.to_openqasm();(R/'circuit.qasm').write_text(qasm)
 plan={'chip':'Baihua','logical_active_qubits':54,'measured_qubits':54,'physical_target_qubits':physical,'calibration_time':r['calibration_time'],'largest_nonzero_calibration_component':largest,'selected_edges_physical':[list(x) for x in edges],'native_cz_gates':106,'single_qubit_ry_gates':162,'h_gates':54,'entangling_rounds':2,'edge_coloring_layers_per_round':1+max(c for e,c in colors),'selected_link_fidelity_min':min(tree.edges[e]['fidelity'] for e in edges),'selected_link_fidelity_median':sorted(tree.edges[e]['fidelity'] for e in edges)[len(edges)//2],'shots_requested':4096,'seed':7,'circuit_sha256':hashlib.sha256(qasm.encode()).hexdigest(),'claim_boundary':'54-qubit scale and connectivity check; shallow tree-interaction circuit; no classical hardness/quantum advantage/robot improvement claim; differs from 5q downstream pilot'};(R/'plan.json').write_text(json.dumps(plan,indent=2))
 record={**plan,'submitted_at_utc':datetime.now(timezone.utc).isoformat(),'status':'submission_intent'};receipt.write_text(json.dumps(record,indent=2));payload={'chip':'Baihua','name':'qtail_finals54q_topology_seed7_'+datetime.now().strftime('%Y%m%dT%H%M%S'),'circuit':qasm,'compile':True,'shots':4096,'options':{'compiler':'quarkcircuit','correct':False,'target_qubits':physical}}
 try:
  with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):tid=task.run(payload,repeat=4)
  assert isinstance(tid,int);record.update(task_id=str(tid),task_name=payload['name'],status='Submitted');receipt.write_text(json.dumps(record,indent=2));print('SUBMITTED Baihua 54 active qubits',tid,flush=True)
 except Exception as e:
  record.update(status='submission_unconfirmed',error_type=type(e).__name__);receipt.write_text(json.dumps(record,indent=2));raise SystemExit('Submission unconfirmed; inspect platform before any resubmission')
else:record=json.loads(receipt.read_text())
assert record.get('task_id'),'Missing task ID; do not resubmit automatically'
with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):s=task.status(int(record['task_id']));result=task.result(int(record['task_id']))
if isinstance(result,dict) and result.get('count'):
 assert result['chip']=='Baihua' and result['status']=='Finished' and sum(result['count'].values())==4096;assert all(len(k)==54 and set(k)<=set('01') for k in result['count']);(R/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));(R/'compiled.qasm').write_text(result['transpiled']);record.update(status='Finished',shots_observed=4096,observed_outcomes=len(result['count']),execution_created_platform=result['created'],execution_finished_platform=result['finished']);receipt.write_text(json.dumps(record,indent=2))
print(json.dumps({'task_id':record['task_id'],'chip':'Baihua','active_qubits_requested':54,'status':record['status'],'platform_status':s},ensure_ascii=False))
