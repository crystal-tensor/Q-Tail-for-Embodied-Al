#!/usr/bin/env python3
"""Same-budget pose-forecast pilot using real EgoDemo episodes and synthetic observations."""
import argparse,hashlib,json,pathlib,random,time,csv
import numpy as np
import torch
from torch import nn
P=argparse.ArgumentParser();P.add_argument('--root',type=pathlib.Path,default=pathlib.Path('/Volumes/ORICO/qtail_full_data_10w'));P.add_argument('--out',type=pathlib.Path,default=pathlib.Path('results/finals_50tasks_20261120/ablation'));P.add_argument('--arms',default='original_only,natural_aug,uniform_aug,classical_risk_aug,ideal_rcs_aug,baihua_rcs_aug');P.add_argument('--steps',type=int,default=1200);a=P.parse_args();a.out.mkdir(parents=True,exist_ok=True);torch.set_num_threads(4)
protocol=pathlib.Path('results/finals_50tasks_20261120/protocol.json');report=json.loads((a.root/'pose50_download_report.json').read_text());assert report['verified_tasks']==50
files=report['files'];K=50;parts={'train':[],'validation':[],'test':[]};profiles=[]
for k,f in enumerate(files):
 d=np.load(a.root/'pose50'/f'task_{k:02d}.npz');pose=d['pose'].reshape(-1,126);finite=d['finite'];N=len(pose);guard=min(30,max(2,N//20));ranges={'train':(0,int(.6*N)),'validation':(int(.6*N)+guard,int(.75*N)),'test':(int(.75*N)+guard,N)};ids={}
 for label,(start,end) in ranges.items():
  ix=np.arange(start+2,end-5);ix=np.array([i for i in ix if finite[i-2:i+6].all()],dtype=int)
  if label!='train' and len(ix)>500:ix=ix[np.linspace(0,len(ix)-1,500).astype(int)]
  assert len(ix)>0,(k,label,N)
  h=np.stack([pose[ix-2],pose[ix-1],pose[ix]],axis=1).astype(np.float32);y=pose[ix+5].astype(np.float32);parts[label].append((h,y));ids[label]=ix
  if label=='train':
   cv=h[:,-1]+5*(h[:,-1]-h[:,-2]);err=np.linalg.norm((cv-y).reshape(-1,42,3),axis=-1).mean();profiles.append({'task_index':k,'task':f['task'],'frames':N,'train_windows':len(ix),'train_cv_mpjpe_m':float(err),'guard_frames':guard})
 np.savez_compressed(a.out/f'split_indices_{k:02d}.npz',**ids)
counts=np.array([p['train_windows'] for p in profiles]);b=counts/counts.sum();tail=np.argsort(counts)[:10];rarity=1/np.sqrt(counts);difficulty=np.array([p['train_cv_mpjpe_m'] for p in profiles]);rank=lambda x:np.argsort(np.argsort(x))/(K-1);risk=.5*rank(rarity)+.5*rank(difficulty);order=np.argsort(risk)
# A five-qubit classical state-vector reference of the identical seed-7 circuit.
def ideal_probs():
 v=np.zeros(32,dtype=complex);v[0]=1;rg=random.Random(7)
 def gate(U,q):
  nonlocal v
  arr=v.reshape([2]*5);arr=np.moveaxis(arr,q,0);arr=np.einsum('ab,b...->a...',U,arr);v=np.moveaxis(arr,0,q).reshape(32)
 for q in range(5):gate(np.array([[1,1],[1,-1]])/np.sqrt(2),q)
 for _ in range(6):
  for q in range(5):
   ang=rg.random()*np.pi;gate(np.array([[np.cos(ang/2),-np.sin(ang/2)],[np.sin(ang/2),np.cos(ang/2)]]),q)
  for q in range(4):
   perm=np.arange(32);mask=1<<(4-q);target=1<<(3-q)
   for i in range(32):
    if i&mask:perm[i]=i^target
   v=v[perm]
 return np.abs(v)**2
ideal=ideal_probs();assert abs(ideal.sum()-1)<1e-9
# Interpolate sorted probability masses to fifty task ranks; no bit-order dependence.
def matched(p):
 p=np.asarray(p);p=p[np.isfinite(p)&(p>0)];assert len(p)>0
 v=np.interp(np.linspace(0,1,K),np.linspace(0,1,len(p)),np.sort(p));v=np.maximum(v,1e-9);v/=v.sum();out=np.empty(K);out[order]=v;return out
np.savez_compressed(a.out/'frozen_profiles.npz',baseline=b,risk=risk,tail_indices=tail,ideal_probabilities=ideal)
(a.out/'profiles.json').write_text(json.dumps(profiles,ensure_ascii=False,indent=2))
# Fixed transformations: PT-OT target mixture identical across every augmented arm.
from scipy.special import betainc
from scipy.stats import rankdata
noise_grid=np.linspace(0,1,100001);noise_cdf=.9*betainc(2,5,noise_grid)+.1*betainc(5,2,noise_grid)
def bank(arm,seed):
 rg=np.random.default_rng(1000+seed);hardware_id=None
 if arm in ('original_only','natural_aug'):q=b
 elif arm=='uniform_aug':q=np.ones(K)/K
 elif arm=='classical_risk_aug':q=.4*b+.6*(risk+.05)/(risk+.05).sum()
 elif arm=='ideal_rcs_aug':q=.4*b+.6*matched(ideal)
 elif arm in ('baihua_archive_aug','ideal_archive_aug'):
  hp=np.load('results/finals_50tasks_20261120/historical_baihua/probabilities.npz');prob=hp['hardware' if arm=='baihua_archive_aug' else 'ideal_shotmatched'];q=.4*b+.6*matched(prob);hardware_id=hp['selected_task_ids'].astype(str).tolist() if arm=='baihua_archive_aug' else None
 elif arm=='baihua_rcs_aug':
  receipt=pathlib.Path('results/finals_50tasks_20261120/hardware')/f'run_{seed}.json';r=json.loads(receipt.read_text());assert r['chip']=='Baihua' and r['status']=='Finished' and r['shots_observed']==2048
  p=np.array(list(r['counts'].values()),dtype=float);p=np.r_[p,np.zeros(32-len(p))];q=.4*b+.6*matched(p/p.sum());hardware_id=r['task_id']
 else:raise ValueError(arm)
 T=60000;tasks=rg.choice(K,T,p=q);h=np.empty((T,3,126),np.float32);y=np.empty((T,126),np.float32);source=np.empty(T,np.int32)
 for k in range(K):
  at=np.flatnonzero(tasks==k);hs,ys=parts['train'][k];ix=rg.integers(len(hs),size=len(at));h[at]=hs[ix];y[at]=ys[ix];source[at]=ix
 synthetic=np.zeros(T,bool)
 if arm!='original_only':
  synthetic[T//2:]=True;ii=np.flatnonzero(synthetic);n=len(ii);hp=h[ii].reshape(n,3,42,3);yp=y[ii].reshape(n,42,3);original_bones=np.linalg.norm(yp[:,[j for j in range(42) if j not in (0,21)]]-yp[:,[0]*20+[21]*20],axis=-1)
  yaw=rg.uniform(-np.pi/18,np.pi/18,n);R=np.zeros((n,3,3),np.float32);R[:,0,0]=R[:,2,2]=np.cos(yaw);R[:,0,2]=-np.sin(yaw);R[:,2,0]=np.sin(yaw);R[:,1,1]=1
  center=hp[:,-1].mean(axis=1);translation=rg.uniform(-.01,.01,(n,3));hp=np.einsum('ntjc,ncd->ntjd',hp-center[:,None,None,:],R)+center[:,None,None,:]+translation[:,None,None,:];yp=np.einsum('njc,ncd->njd',yp-center[:,None,:],R)+center[:,None,:]+translation[:,None,:]
  u=(rankdata(rg.exponential(size=n))-.5)/n;amplitude=.001+.029*np.interp(u,noise_cdf,noise_grid);noise=rg.normal(size=(n,3,2,3))*amplitude[:,None,None,None];noise=np.repeat(noise,21,axis=2);hp+=noise;h[ii]=hp.reshape(n,3,126);y[ii]=yp.reshape(n,126);bone_delta=float(np.max(np.abs(np.linalg.norm(yp[:,[j for j in range(42) if j not in (0,21)]]-yp[:,[0]*20+[21]*20],axis=-1)-original_bones)))
  assert bone_delta<1e-5
 path=a.root/'synthetic_pose50';path.mkdir(exist_ok=True);np.savez_compressed(path/f'{arm}_seed{seed}.npz',history=h,future=y,task_index=tasks,source_train_window=source,synthetic=synthetic,task_probabilities=q)
 metadata={'arm':arm,'seed':seed,'rows':T,'synthetic_rows':int(synthetic.sum()),'task_counts':np.bincount(tasks,minlength=K).tolist(),'task_probabilities':q.tolist(),'hardware_task_id':hardware_id,'distinct_source_windows':int(len(set(zip(tasks.tolist(),source.tolist())))),'max_target_wrist_distance_deviation_m':None if arm=='original_only' else bone_delta,'training_split_only':True,'synthetic_type':'coordinate-transformed and sensor-noise augmented human pose windows; not robot actions or video synthesis'}
 (a.out/f'bank_{arm}_seed{seed}.json').write_text(json.dumps(metadata,indent=2));return h,y,tasks
# Normalize only from training source data. Residual output is anchored at latest observed pose.
train_sample=np.concatenate([h[::max(1,len(h)//1000),-1] for h,y in parts['train']]);mu=train_sample.mean(0).astype(np.float32);scale=np.maximum(train_sample.std(0),.05).astype(np.float32)
class Model(nn.Module):
 def __init__(self):
  super().__init__();self.task=nn.Embedding(K,16);self.net=nn.Sequential(nn.Linear(378+16,256),nn.ReLU(),nn.Linear(256,256),nn.ReLU(),nn.Linear(256,126))
 def forward(self,x,t):return x[:,-126:]+self.net(torch.cat([x,self.task(t)],dim=1))
def evaluate(predict,arm,seed,condition):
 result=[];sigma={'clean':0,'noise3mm':.003,'noise10mm':.01}[condition]
 for k,(h,y) in enumerate(parts['test']):
  h=h.copy();rg=np.random.default_rng(90000+k);noise=rg.normal(0,sigma,(len(h),3,2,3));h+=np.repeat(noise,21,axis=2).reshape(h.shape)
  pred=predict(h,k);e=np.linalg.norm((pred-y).reshape(-1,42,3),axis=-1).mean(axis=1)*100
  result.append({'arm':arm,'seed':seed,'condition':condition,'task_index':k,'task':files[k]['task'],'test_windows':len(e),'mpjpe_cm':float(e.mean()),'p95_frame_error_cm':float(np.quantile(e,.95)),'forecast_within5cm':float((e<=5).mean()),'tail_task':bool(k in tail)})
 return result
rows_path=a.out/'per_task_metrics.json';all_rows=json.loads(rows_path.read_text()) if rows_path.exists() else []
for name,fn in [('last_pose',lambda h,k:h[:,-1]),('constant_velocity',lambda h,k:h[:,-1]+5*(h[:,-1]-h[:,-2]))]:
 if not any(r['arm']==name for r in all_rows):
  for cond in ['clean','noise3mm','noise10mm']:all_rows.extend(evaluate(fn,name,-1,cond))
rows_path.write_text(json.dumps(all_rows,ensure_ascii=False,indent=2))
for arm in a.arms.split(','):
 for seed in [0,1,2]:
  if any(r['arm']==arm and r['seed']==seed for r in all_rows):continue
  if arm=='baihua_rcs_aug':
   receipts=[pathlib.Path('results/finals_50tasks_20261120/hardware')/f'run_{s}.json' for s in [0,1,2]]
   if not all(p.exists() and json.loads(p.read_text()).get('status')=='Finished' for p in receipts):print('WAITING_BAIHUA; completed classical arms retained',flush=True);raise SystemExit(3)
  started=time.time();torch.manual_seed(seed);h,y,tasks=bank(arm,seed);x=torch.from_numpy(((h-mu)/scale).reshape(-1,378));target=torch.from_numpy((y-mu)/scale);tasks=torch.from_numpy(tasks).long();model=Model();opt=torch.optim.AdamW(model.parameters(),lr=.0005,weight_decay=.0001);rg=np.random.default_rng(seed+444)
  for step in range(a.steps):
   ix=rg.integers(len(x),size=256);opt.zero_grad(set_to_none=True);loss=nn.functional.smooth_l1_loss(model(x[ix],tasks[ix]),target[ix]);loss.backward();opt.step()
  model.eval()
  def pred(h,k):
   z=torch.from_numpy(((h-mu)/scale).reshape(-1,378));t=torch.full((len(z),),k,dtype=torch.long)
   with torch.no_grad():return model(z,t).numpy()*scale+mu
  for cond in ['clean','noise3mm','noise10mm']:all_rows.extend(evaluate(pred,arm,seed,cond))
  torch.save({'model':model.state_dict(),'mean':mu,'scale':scale,'arm':arm,'seed':seed,'steps':a.steps},a.out/f'model_{arm}_{seed}.pt');rows_path.write_text(json.dumps(all_rows,ensure_ascii=False,indent=2));print('DONE',arm,seed,'seconds',round(time.time()-started,1),flush=True)
with (a.out/'per_task_metrics.csv').open('w') as f:
 w=csv.DictWriter(f,fieldnames=list(all_rows[0]));w.writeheader();w.writerows(all_rows)
print('All requested arms completed',flush=True)
