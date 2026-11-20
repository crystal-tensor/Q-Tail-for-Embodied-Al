#!/usr/bin/env python3
"""Paired task-level pilot summaries; figures retain negative results."""
import json,pathlib,csv
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
R=pathlib.Path('results/finals_50tasks_20261120/ablation');O=pathlib.Path('output/finals-50tasks-20261120/figures');O.mkdir(parents=True,exist_ok=True)
d=pd.DataFrame(json.loads((R/'per_task_metrics.json').read_text()));d.to_csv(R/'per_task_metrics.csv',index=False)
labels={'last_pose':'Last pose','constant_velocity':'Constant velocity','original_only':'Original only','natural_aug':'Natural + synthesis','uniform_aug':'Uniform + synthesis','classical_risk_aug':'Classical risk + synthesis','ideal_rcs_aug':'Ideal RCS + synthesis','ideal_archive_aug':'Shot-matched 15q ideal + synthesis','baihua_archive_aug':'Historical Baihua + synthesis','baihua_rcs_aug':'New Baihua RCS + synthesis'}
order=[x for x in labels if x in d.arm.unique()];learned=[x for x in order if x not in ['last_pose','constant_velocity']];metrics=['mpjpe_cm','p95_frame_error_cm','forecast_within5cm'];summary=[]
for (arm,condition),g in d.groupby(['arm','condition']):
 for seed,h in g.groupby('seed'):
  row={'arm':arm,'condition':condition,'seed':int(seed),'macro_mpjpe_cm':float(h.mpjpe_cm.mean()),'macro_task_p95_cm':float(h.p95_frame_error_cm.mean()),'forecast_within5cm_pct':float(100*h.forecast_within5cm.mean()),'tail10_mpjpe_cm':float(h[h.tail_task].mpjpe_cm.mean()),'worst20_mpjpe_cm':float(h.nlargest(10,'mpjpe_cm').mpjpe_cm.mean())};summary.append(row)
s=pd.DataFrame(summary);s.to_csv(R/'aggregate_by_seed.csv',index=False)
agg=s.groupby(['arm','condition']).mean(numeric_only=True).reset_index();agg.to_csv(R/'aggregate_metrics.csv',index=False)
# Average seed effects within a task, then paired bootstrap tasks. Does not generalize to unseen episodes.
paired=[];rng=np.random.default_rng(20261120)
for cond in ['clean','noise3mm','noise10mm']:
 base=d[(d.arm=='original_only')&(d.condition==cond)].groupby('task_index')[metrics].mean()
 if len(base)!=50:continue
 for arm in learned:
  if arm=='original_only':continue
  g=d[(d.arm==arm)&(d.condition==cond)].groupby('task_index')[metrics].mean().reindex(base.index)
  if g.isna().any().any():continue
  e0=base.mpjpe_cm.to_numpy();e1=g.mpjpe_cm.to_numpy();draw=rng.integers(0,50,(10000,50));delta=(e0[draw]-e1[draw]).mean(1);relative=100*(e0[draw].mean(1)-e1[draw].mean(1))/e0[draw].mean(1)
  paired.append({'arm':arm,'condition':cond,'macro_error_reduction_cm':float((e0-e1).mean()),'relative_error_reduction_pct':float(100*(e0.mean()-e1.mean())/e0.mean()),'ci95_task_bootstrap_relative_pct':np.quantile(relative,[.025,.975]).tolist(),'ci95_task_bootstrap_absolute_cm':np.quantile(delta,[.025,.975]).tolist(),'tasks_better':int((e1<e0).sum()),'tasks_worse':int((e1>e0).sum()),'within5cm_change_pp':float(100*(g.forecast_within5cm-base.forecast_within5cm).mean())})
(R/'paired_comparisons.json').write_text(json.dumps(paired,indent=2))
for cond in ['clean','noise3mm','noise10mm']:
 means=d[d.condition==cond].groupby(['task_index','task','arm']).mpjpe_cm.mean().unstack('arm');arms=[x for x in learned if x!='original_only'];gain=100*(means['original_only'].to_numpy()[:,None]-means[arms].to_numpy())/means['original_only'].to_numpy()[:,None]
 pd.DataFrame(gain,index=means.index,columns=arms).reset_index().to_csv(R/f'per_task_relative_gains_{cond}.csv',index=False)
 fig,ax=plt.subplots(figsize=(12,15));v=max(10,np.nanpercentile(abs(gain),95));im=ax.imshow(gain,cmap='RdYlGn',vmin=-v,vmax=v,aspect='auto');ax.set_xticks(range(len(arms)),[labels[x].replace(' + ','\n+ ') for x in arms],fontsize=9);ax.set_yticks(range(50),[f'{k+1:02d} {task[:48]}' for k,task in means.index],fontsize=8)
 for i in range(50):
  for j in range(len(arms)):ax.text(j,i,f'{gain[i,j]:+.0f}',ha='center',va='center',fontsize=7,color='black')
 ax.set_title(f'Per-task MPJPE reduction vs original only (%) | {cond}\nThree training seeds averaged; positive means lower error',fontsize=12,pad=16);fig.colorbar(im,ax=ax,label='Error reduction (%)',shrink=.6);fig.tight_layout();fig.savefig(O/f'per_task_{cond}.png',dpi=180);plt.close(fig)
fig,axes=plt.subplots(1,3,figsize=(15,5));colors=['#7d8ca4','#4f6683','#173354','#8eb8d8','#4fa89f','#cc9a40','#946cc2','#db9fbd','#007bef','#ed8441']
for ax,cond in zip(axes,['clean','noise3mm','noise10mm']):
 h=s[s.condition==cond];vals=[h[h.arm==x].macro_mpjpe_cm.mean() for x in order];low=[h[h.arm==x].macro_mpjpe_cm.min() for x in order];high=[h[h.arm==x].macro_mpjpe_cm.max() for x in order];xx=np.arange(len(order));ax.bar(xx,vals,color=[colors[list(labels).index(x)] for x in order]);ax.errorbar(xx,vals,yerr=[np.array(vals)-low,np.array(high)-vals],fmt='none',ecolor='black',capsize=3);ax.set_xticks(xx,[labels[x].replace(' + ','\n') for x in order],rotation=55,ha='right',fontsize=8);ax.set_title(cond);ax.set_ylabel('Macro mean error (cm; lower is better)');ax.grid(axis='y',alpha=.2)
fig.suptitle('Same budget: 60,000 bank rows, 1,200 updates | whiskers: min–max of 3 training seeds',fontsize=12);fig.tight_layout();fig.savefig(O/'aggregate_errors.png',dpi=180);plt.close(fig)
report={'arms':order,'summary':agg.drop(columns='seed').to_dict('records'),'paired':paired,'uncertainty':'95% paired task bootstrap, conditional on the fixed 50 episodes and the mean of three training seeds; seed variation reported separately; frame windows are not independent episodes'};(R/'analysis_summary.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
