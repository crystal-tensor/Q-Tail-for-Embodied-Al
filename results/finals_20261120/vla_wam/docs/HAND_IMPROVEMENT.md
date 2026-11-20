# Hand policy improvement (G2, positive pilot)

`HandImprovementController` ran 3 real architecture candidates on Allegro safe-label demos:

| candidate | normal | obs-noise (dev) | gate |
|---|---|---|---|
| width256 | 100% | 42.2% | promoted (parent) |
| depth3 | 100% | 44.4% | rejected vs width+5pp |
| dropout01 | 100% | 48.9% | promoted |

Stable pointer: `configs/stable_hand_policy.json` → dropout candidate.

## Fresh-seed confirmation

Seeds 9500–9529, 30 episodes/task, 3 BC seeds, σ=0.03:

| policy | mean obs-noise | per-seed | Wilson 95% |
|---|---|---|---|
| baseline (v5 arch) | **38.1%** | 23.3 / 37.8 / 53.3 | 32.6–44.1% |
| dropout0.1 | **46.3%** | 50.0 / 44.4 / 44.4 | 40.4–52.3% |

- +8.2pp mean; dropout variance lower across seeds.
- Normal reach remains 100% (saturated).
- CIs overlap; pooled Wilson ignores seed clustering.
- This is fixed reach observation noise, not VLA/robot/generalization.
- Controller gate used dev seeds 9000; confirmation used fresh 9500.

## Cross-hand transfer (pilot, single seed)

The Allegro dropout recipe was applied unchanged to Shadow/Three safe-label data;
fresh seeds 9500–9529, 30 episodes/task:

| hand | baseline obs-noise | dropout obs-noise | normal |
|---|---|---|---|
| Allegro | 38.1% (3 seeds) | **46.3%** (3 seeds) | 100% |
| Shadow | 25.6% | **22.2%** | 100% |
| Three | 47.8% | **43.3%** | 97.8% |

- The Allegro gain does **not** transfer to Shadow/Three; both slightly worse.
- 3-seed fresh-seed confirmation:
  - Shadow baseline 33.3% → dropout 32.6%
  - Three baseline 48.1% → dropout 47.0%
  - CIs overlap; no transfer benefit.
- Architecture improvement is hand/task-specific here; no shared recipe evidence.

## Shadow width256 (hand-specific positive)

Shadow per-hand architecture search (single seed) found width256 at 35.6% vs 25.6% baseline.
3-seed fresh-seed confirmation:

| policy | mean obs-noise | per-seed | Wilson 95% |
|---|---|---|---|
| baseline | **33.3%** | 25.6 / 42.2 / 32.2 | 28.0–39.2% |
| width256 | **40.0%** | 35.6 / 44.4 / 40.0 | 34.3–45.9% |

- +6.7pp; intervals overlap.
- Three width/depth did **not** improve (35.6/42.2 vs 47.8 baseline).
- Architecture search is hand-specific; no universal recipe.

## Three-specific search (all rejected)

Single seed, 30/task, fresh seeds 9500, obs noise σ=0.03:

| candidate | obs-noise |
|---|---|
| baseline v2 | **47.8%** |
| width512 | 31.1% |
| depth4 | 38.9% |
| dropout0.2 | 43.3% |
| narrow64 | 46.7% |

All candidates are below baseline; no promotion. The Three task does not benefit from
the Allegro/Shadow recipes. This is a negative search result, not evidence of a better
architecture.
