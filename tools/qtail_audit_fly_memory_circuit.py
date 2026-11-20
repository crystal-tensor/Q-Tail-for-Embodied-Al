#!/usr/bin/env python3
"""Audit MaleCNS annotations and official, type-aggregated memory-circuit edges.

This is an anatomical data audit, not a learning or behavioral simulation.
The cross-matched edge table covers central-brain type groups and excludes VNC
connections. Synapse counts do not specify physiological weights or valence.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def role(value: object) -> str | None:
    name = str(value)
    for prefix in ("KC", "MBON", "PPL1", "PAM"):
        if name.startswith(prefix):
            return prefix
    return "APL" if name == "APL" else None


def audit(annotations: Path, type_edges: Path, manifest_path: Path, out: Path) -> dict:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("dataset") != "MaleCNS v1.0":
        raise ValueError("This audit requires a MaleCNS v1.0 source manifest")
    bindings = {Path(source["path"]).resolve(): source for source in manifest["sources"]}
    verified = []
    for path in (annotations, type_edges):
        source = bindings.get(path.resolve())
        if source is None:
            raise ValueError(f"Source is not bound in the manifest: {path}")
        actual_hash = sha256(path)
        if path.stat().st_size != source["bytes"] or actual_hash != source["sha256"]:
            raise ValueError(f"Source size/hash mismatch: {path}")
        verified.append({**source, "verified_sha256": actual_hash})

    cells = pd.read_feather(annotations)
    edges = pd.read_feather(type_edges, columns=["pre", "post", "weight_m"])
    for frame, required in (
        (cells, {"bodyId", "superclass", "class", "type"}),
        (edges, {"pre", "post", "weight_m"}),
    ):
        if not required.issubset(frame.columns):
            raise ValueError(f"Missing required columns: {required - set(frame.columns)}")
    if cells["bodyId"].isna().any() or cells["bodyId"].duplicated().any():
        raise ValueError("Neuron/segment IDs must be non-null and unique")
    weights = edges["weight_m"].to_numpy()
    if not np.isfinite(weights).all() or (weights < 0).any():
        raise ValueError("Male synapse counts must be finite and nonnegative")
    if not np.equal(weights, np.floor(weights)).all():
        raise ValueError("Expected integer synapse counts, not fitted dynamic weights")
    if edges[["pre", "post"]].isna().any().any() or edges.duplicated(["pre", "post"]).any():
        raise ValueError("Type-group edge keys must be non-null and unique")

    # The annotation file also contains glia, orphan fragments and other segments.
    # Count only records with the published superclass annotation.
    neurons = cells[cells["superclass"].notna()].copy()
    types = neurons["type"].fillna("")
    groups = {
        "Kenyon_cells": neurons["class"].eq("Kenyon_Cell"),
        "MBON": neurons["class"].eq("MBON"),
        "DAN_all": neurons["class"].eq("DAN"),
        "PPL1_candidates": types.str.startswith("PPL1"),
        "PAM_candidates": types.str.startswith("PAM"),
        "APL": types.eq("APL"),
    }
    cell_counts = {
        name: {"neurons": int(mask.sum()), "annotated_types": sorted(types[mask].unique().tolist())}
        for name, mask in groups.items()
    }
    if len(neurons) != 166700 or any(item["neurons"] == 0 for item in cell_counts.values()):
        raise ValueError("Published neuron count or required circuit classes are not reproduced")

    edges["pre_role"] = edges["pre"].map(role)
    edges["post_role"] = edges["post"].map(role)
    circuit = edges[
        edges["pre_role"].notna() & edges["post_role"].notna() & edges["weight_m"].gt(0)
    ].copy()
    pairs = [("KC", "MBON"), ("PPL1", "KC"), ("PPL1", "MBON"),
             ("MBON", "PPL1"), ("PAM", "KC"), ("KC", "APL"), ("APL", "KC")]
    pathways = []
    for pre, post in pairs:
        subset = circuit[circuit["pre_role"].eq(pre) & circuit["post_role"].eq(post)]
        pathways.append({
            "pre_role": pre, "post_role": post,
            "positive_type_group_edges": len(subset),
            "male_synapse_count": int(subset["weight_m"].sum()),
            "present": not subset.empty,
        })
    if not all(pathway["present"] for pathway in pathways):
        raise ValueError("At least one required anatomical pathway is absent")

    out.mkdir(parents=True, exist_ok=True)
    circuit_path = out / "male_cns_memory_type_edges.csv"
    circuit.sort_values(["pre", "post"]).to_csv(circuit_path, index=False)
    selected_cells = neurons[neurons["type"].map(role).notna()]
    cell_path = out / "male_cns_memory_cells.csv"
    selected_cells[["bodyId", "type", "class", "superclass"]].sort_values("bodyId").to_csv(cell_path, index=False)
    report = {
        "format_version": "qtail_fly_memory_anatomy_audit_v1",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dataset": "MaleCNS v1.0",
        "evidence_level": "annotation_and_type_aggregated_anatomy_only",
        "annotation_rows_all_segments": len(cells),
        "superclass_annotated_neurons": len(neurons),
        "cell_counts": cell_counts,
        "pathways": pathways,
        "selected_positive_type_group_edges": len(circuit),
        "sources": verified,
        "supplement_repository_commit": manifest["supplement_repository_commit"],
        "artifacts": {
            "circuit_edges": {"path": str(circuit_path.resolve()), "sha256": sha256(circuit_path)},
            "candidate_cells": {"path": str(cell_path.resolve()), "sha256": sha256(cell_path)},
        },
        "claim_boundary": [
            "The anatomy is real; no behavioral or learning simulation was run by this audit.",
            "The edge export is aggregated by cross-matched central-brain type groups, not individual neurons.",
            "VNC edges are excluded from this export; this is not a simulation of all 166,700 neurons.",
            "PPL1/PAM labels identify candidates, not proof of nociceptive function for every selected cell.",
            "Synapse count is not functional synaptic strength, sign, delay, receptor identity or plasticity.",
            "This audit does not establish single-event learning, permanent memory, or superiority to reinforcement learning.",
        ],
        "anatomical_feasibility_passed": True,
    }
    (out / "fly_memory_anatomy_audit.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--annotations", type=Path, required=True)
    parser.add_argument("--type-edges", type=Path, required=True)
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    report = audit(args.annotations, args.type_edges, args.manifest, args.out)
    print(json.dumps({
        "anatomical_feasibility_passed": report["anatomical_feasibility_passed"],
        "superclass_annotated_neurons": report["superclass_annotated_neurons"],
        "cell_counts": {key: value["neurons"] for key, value in report["cell_counts"].items()},
        "pathways": report["pathways"],
        "evidence_level": report["evidence_level"],
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
