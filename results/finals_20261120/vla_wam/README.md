# Embodied Runtime v0.2 / v0.3

面向灵巧手研发企业的本地可部署具身学习与推理系统。当前从 v0.1 的
LIBERO + 世界模型 + Python/Rust 运行时继续，不另建展示项目。

**当前状态：IN PROGRESS。** v0.2 的 G0 审计、Mac 硬件探测、性能剖析、首轮
ImprovementController 已完成；G3（API/SDK/工作台）与 G4–G6（灵巧手/跨手型）
未完成。OpenVLA-OFT 官方基线因本机无 CUDA 仍 **BLOCKED**。

## 已实测能力

| 能力 | 状态/证据 |
|---|---|
| Mac mini M4 Pro / 64 GiB / MPS | `logs/hardware_probe.json` |
| CPU/MPS 矩阵基准、12 s 持续负载 | `docs/HARDWARE_CAPABILITIES.md` |
| 阶段性能剖析 | `logs/performance_profile.json`、`docs/PERFORMANCE.md` |
| ImprovementController（3 个真实候选） | `artifacts/improvement/state.json` |
| 独立验证门禁、拒绝、幂等、回滚逻辑 | `docs/IMPROVEMENT_PROTOCOL.md` |
| EmbodimentSpec（可变动作/观测） | `src/embodied_runtime/embodiments/` |
| Allegro 手 MuJoCo 环境 + 3 任务 | `src/embodied_runtime/adapters/allegro_env.py`，`logs/hand_env_probe.json` |
| Allegro BC 策略（90/90） | `models/hand_policy/bc_v4.pt`，`logs/hand_bc_v4_eval.json` |
| 手型 dynamics + 1-step MPC（90/90） | `models/hand_world_model/hand-dyn-v1`，`logs/hand_mpc_eval.json` |
| Shadow 独立 BC（90/90） | `models/hand_policy/shadow_bc_v1.pt`，`logs/shadow_bc_eval.json` |
| 双手共享 trunk（180/180） | `models/hand_policy/shared_v1.pt`，`logs/shared_hand_eval.json` |
| 第三手型 + few-shot adapter | `models/hand_policy/three_adapter_v1.pt`，`docs/THREE_HAND.md` |
| 手型 API 投影安全 | `docs/HAND_SAFETY.md`，`tests/test_hand_safety.py` |
| 可选本地 API Token | `docs/AUTH.md`，`tests/test_auth.py` |
| v0.2 wheel 候选 | `artifacts/release/`，`docs/RELEASE.md` |
| 手型异步运行时 | `docs/HAND_RUNTIME.md`，`logs/hand_runtime_bench.json` |
| 手型 runtime 闭环（仿真 30/30） | `logs/hand_loop_smoke.json` |
| 手型 runtime 延迟/故障退化 | `logs/hand_runtime_degradation.json` |
| 手型 obs-noise 鲁棒性（3 seeds） | `docs/ROBUSTNESS.md`，`logs/hand_noise_3seed.json` |
| 手型 WM 噪声规划 | `logs/hand_mpc_noise.json` |
| 手型策略改进（Allegro +8.2pp） | `docs/HAND_IMPROVEMENT.md`，`logs/hand_improve_3seed.json` |
| dropout 跨手型迁移（3 seeds，未迁移） | `logs/hand_dropout_3seed.json` |
| 动作延迟扰动（饱和） | `logs/hand_action_delay.json` |
| Shadow width256 改进（+6.7pp） | `logs/shadow_width_3seed.json` |
| Three 架构搜索（全拒绝） | `logs/three_arch_search.json` |
| 共享 vs 独立 obs-noise（30/task, 3 seeds） | `logs/hand_formal_noise_3seed.json` |
| 安全动作标签修正（三手型） | `docs/SAFE_LABELS.md`，`logs/safe_labels_all.json` |
| LIBERO CPU 环境 / 世界模型 / Python-Rust 运行时 | v0.1 代码与日志 |
| 故障注入 7/7、10 万周期墙钟调度 | `logs/fault_injection.json` |
| C/D 回放一致、安全回放 0 diff | `logs/crosslang_report.json` |
| 74 项 Python / 16 项 Rust 测试 | `make test` |

## 首轮改进循环结果

稳定模型 `world_model_probe_v1`（validation ep3 Spearman 0.724）保持。三个候选：

| 候选 | Spearman | top-1 | 结果 |
|---|---|---|---|
| arch_width_256 | 0.536 | 1.0 | 拒绝 |
| rollout_h4 | -0.147 | 0.167 | 拒绝 |
| resnet18_encoder | 0.325 | 0.667 | 拒绝 |

**机制可运行，模型改进收益未获支持**；没有候选被晋升。

## 快速开始

```bash
make setup            # Python editable install + Rust build + configs
make test             # pytest + cargo test
make smoke            # 契约/故障/回放/TCP/环境探针
python3 scripts/probe_hardware.py
python3 scripts/profile_pipeline.py
python3 scripts/improve.py --cycles 3
make report
```

LIBERO CPU 环境：

```bash
make setup-libero
make env-probe
make collect && make train && make eval
make dry-run && make analyze
```

GPU 主机：

```bash
bash scripts/gpu_unblock.sh
python3 scripts/run_openvla_baseline.py
```

## macOS 安装包（DMG）

- `artifacts/release/EmbodiedRuntime-0.2.0-macOS-arm64.dmg`（约 244 MB，Apple Silicon）
- 拖入 Applications；首次右键 Open；未公证
- 安装/限制：[docs/DMG.md](docs/DMG.md)

## 交互式 Harness 工作台

```bash
PYTHONPATH=src python3 scripts/serve.py --port 8000
# http://127.0.0.1:8000/ui/
```

- 左侧 21 个工具，中间 Chat，右侧参数检查器
- 不配置 LLM 也能直接调用工具
- 配置 OpenAI-compatible endpoint 后，LLM 通过 function calling 调工具
- 每个工具都有示例 prompt、JSON Schema、原始输出
- 教程：[WORKBENCH_GUIDE.md](docs/WORKBENCH_GUIDE.md)

![harness](docs/images/harness-home.png)

## 关键文档

- [PLAN.md](PLAN.md)：v0.2/v0.3 工作包与 G0–G6
- [STATUS.md](STATUS.md)：当前状态与阻塞
- [EXPERIMENTS.md](EXPERIMENTS.md)：预注册协议与历史实验
- [DECISIONS.md](DECISIONS.md)：ADR
- [GPU_HANDOFF.md](GPU_HANDOFF.md)：CUDA 解锁清单
- [LICENSES.md](LICENSES.md)：代码/权重/数据/资产许可
- [docs/G0_AUDIT.md](docs/G0_AUDIT.md)：历史声明核实
- [docs/HARDWARE_CAPABILITIES.md](docs/HARDWARE_CAPABILITIES.md)
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
- [docs/IMPROVEMENT_PROTOCOL.md](docs/IMPROVEMENT_PROTOCOL.md)
- [docs/EMBODIMENT_SPEC.md](docs/EMBODIMENT_SPEC.md)
- [docs/API_SDK.md](docs/API_SDK.md)

## 明确未完成

- HTTP API、Python SDK、CLI、工作台：**基础 + 时间轴/标注/导出/暂停恢复**已实现；鉴权/项目隔离/训练曲线未完成；
- 灵巧手仿真环境/任务/数据/策略：**未实现**；Allegro/Shadow specs 仅为 draft；
- 跨手型共享模型、迁移、负迁移、未见手型：**未开始**；
- 真实 OpenVLA-OFT 基线、正式 A/B/C/D：**BLOCKED**（无 CUDA）；
- MPS 端到端推理加速：未验证，不宣称；
- 企业数据隔离/开源发布候选包：未完成。

## 架构（v0.1 延续）

```
Observation → Policy → ActionChunk → Planner (candidates + world model)
→ Safety → Runtime (Python/Rust) → EnvAdapter → short prefix → re-observe
```

现有 7D LIBERO 契约继续使用；灵巧手通过 `EmbodimentSpec` 逐步替换，不用补零复用。
