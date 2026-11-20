#!/usr/bin/env python3
"""Offline archived-receipt integrity check, not a fresh QUAFU platform query."""
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]/'results/finals_20261120'
rows=json.loads((root/'hardware_audit.json').read_text())
assert len(rows)==6
for row in rows:
 d=root/'hardware'/row['task_id']; receipt=json.loads((d/'receipt.json').read_text());counts=json.loads((d/'counts_platform_order.json').read_text())
 assert receipt['status']=='Finished'
 assert sum(counts.values())==receipt['shots']==2048
 assert all(len(k)==8 and set(k)<=set('01') for k in counts)
 assert hashlib.sha256((d/'circuit.qasm').read_bytes()).hexdigest()==receipt['circuit_sha256']
for r in json.loads((root/'vla_wam_sources.json').read_text()):
 p=root.parents[1]/r['snapshot'];assert hashlib.sha256(p.read_bytes()).hexdigest()==r['sha256']
print('PASS: 6 archived receipts, QASM hashes, counts and VLA/WAM source snapshot hashes; no live-platform or policy-gain claim')
