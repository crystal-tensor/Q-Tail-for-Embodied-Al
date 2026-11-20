"""Build the public evidence page from committed prose and verification results."""
from pathlib import Path
import html,json
base=Path(__file__).resolve().parents[1];md=(base/'docs/finals_20261120.md').read_text();r=json.loads((base/'results/finals_20261120/verification_report.json').read_text());parts=[]
for para in md.split('\n\n'):
 if para.startswith('# '):continue
 if para.startswith('## '):parts.append('<h2>'+html.escape(para[3:])+'</h2>')
 elif '```' in para:parts.append('<pre>'+html.escape(para.replace('```bash','').replace('```',''))+'</pre>')
 else:parts.append('<p>'+html.escape(para).replace('\n','<br>')+'</p>')
rows=''.join('<tr><td>'+html.escape(f['task'])+'</td><td>'+html.escape(f['scene_id'])+'</td><td>'+str(round(f['duration_seconds'],2))+'</td><td>通过</td></tr>' for f in r['files'])
page='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Q-TAIL 决赛进展与证据</title><style>body{margin:auto;max-width:1060px;padding:36px 24px;background:#0a0a0f;color:#e7ecf4;font:18px/1.8 system-ui}a{color:#45f3ff}h1{font-size:36px}h2{font-size:25px;margin-top:48px;color:#8cddff}pre{overflow:auto;background:#172133;padding:20px}p{margin:20px 0}table{width:100%;border-collapse:collapse;font-size:15px}th,td{padding:10px;border-bottom:1px solid #34435a;text-align:left}.table{overflow:auto}.stats{font-size:23px;color:#7ee5ed}</style><a href="/">← Q-TAIL 首页</a><h1>决赛进展与证据</h1><p>2026-11-20 · 6份历史真机证据已核验 · 痛觉与融合收益待测</p><p class="stats">10 任务 · 10 场景 · 311.37 MB · 5.19 分钟 · 全帧解码 10/10 通过</p><p>已下载每任务/场景的一段完整左目视频，来自50小时EgoDemo；右目和其余LeRobot模态不完整。未进行全量10万小时训练，也未测量下游策略收益。</p><div class="table"><table><thead><tr><th>任务</th><th>官方场景ID</th><th>时长（秒）</th><th>解码</th></tr></thead><tbody>'''+rows+'</tbody></table></div>'+''.join(parts)+'<p><a href="/results/finals_20261120/hardware_audit.json">真机核验清单</a> · <a href="/results/finals_20261120/verification_report.json">数据验证与本地SHA256</a></p></html>'
(base/'qtail-finals-20261120.html').write_text(page)
