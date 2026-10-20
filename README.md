# ⚒️ DeepSeek Harness AI 驱动专业逆向工作台（无限五代 ∞ IG5）v1.1.0

本次 1.1.0 更新包含独立 HTTP/HTTPS 采集、受控子代理交接与共享 IG5 调用预算，并修复 PE 导出表与分析入口混淆。安装和验证范围见 [1.1.0 发布说明](docs/RELEASE_1.1.0.md)，协作参数见 [子代理工作流](docs/SUBAGENT_WORKFLOW.md)。正式 Windows 完整包从 [GitHub Releases](https://github.com/Minglink/dsh-infinite-gen-5/releases) 下载；自动生成的 Source code ZIP 不含完整运行资产。

重复路径新增[不同源值/目标组合选样](docs/VM_FETCH_FLOW.md#diverse-source-target-pair-pages)：`recovery.recurrences` 可显式设置 `sample_strategy="distinct-source-targets", pair_offset=0`，每页自动选八个不同组合的首次完整路径，随后交给 handlers。它帮助发现首尾采样遗漏的主体；组合盘点仍是观察，不代表全部处理器、ISA 或完整业务已验证。

新增[录制主体自动恢复](docs/VM_FETCH_FLOW.md#recorded-handler-bodies)：`ig5_profile recovery={handlers:{recurrences_ref:{id,sha256},target}}` 从已提交重复路径报告自动选择分发目标至下一取流头的主体，使用 Java 投影全部16 GPR、内存与有序STORE并核对原记录。相对控制地址与运行期数据分开；未定义标志映像保留未知，部分一致不能升级为完整VM、精确3.8或业务通过。

P1采集可选[存储位置前后字节](docs/NATIVE_STORE_EVENTS.md)：`ig5_dbg op=trace record_trace=true record_events=true`沿用原公共审批和共享证据预算，补充同暂停身份的内存观察。未知字节、阶段和全局epoch保持未知，不将变化归因或升级为完整VM业务证明。

新增[取流到间接控制依赖](docs/VM_FETCH_FLOW.md)：`ig5_profile recovery={flow:{roles_ref:{id,sha256},target}}` 自动选择候选后的连续指令、核对同摘要原文件映射，并通过 Java 完整状态投影连接源 LOAD、索引读取与终端目标。保留全部有序写入及普通跳转表歧义，结构依赖不等于VM/业务证明。

同入口可显式加 `semantic_check:true`：在一致字节内存中仅改变源字节，使用固定预算求解和独立见证回放排除抵消索引/目标。正结果仅是所选普通 IR 路径中存在索引和目标变化见证，CPU、VM 角色、精确 VMP 3.8 与完整业务仍需各自验证。

已有流程报告后，可用 `ig5_profile recovery={recurrences:{flow_ref:{id,sha256}}}` 自动重新核验全部原录制、匹配重复字节路径，并检查首尾各四次完整路径的普通 IR 末态、目标和有序写入。源地址更新及表输入仅为观察候选，不直接认定 VIP/VM；缺失内存不补零，未录完、代码变化、冲突及配额不足明确保留。

新增[录制寻址与 VM 角色假设](docs/VM_ADDRESS_ROLES.md)：`ig5_profile recovery={roles:{recordings:[{id,sha256}],target_sha256}}` 自动选点并核对实际寻址、窄加载和间接目标。最多128位置/1024观察，保留普通程序歧义、采样遗漏与未知阶段；不是VM或VMP3.8业务证明。回归：`npm run test:vm-roles`。

P1新增[原生录制统一观察层](docs/VM_OBSERVATIONS.md)：`ig5_profile recovery={observations:{recordings:[{id,sha256}],target_sha256}}` 读取已提交的轨迹，绑定运行/线程/停止、寄存器、代码和内存来源。它保留缺失状态与未知阶段，不执行目标，也未完成自动VM模型或业务恢复。回归：`npm run test:vm-observations`。

后续研发以[完整 VM 业务恢复框架](docs/VM_RECOVERY_FRAMEWORK.md)为主线：样本与函数合同 → 运行采集 → VM 模型 → ISA → 具体字节码程序 → 独立业务/路径/自主/部署验收。P0 已增加严格 case 合同、依赖与失败规划器、只读 CLI 及 `ig5_profile recovery={case_ref:{path,sha256}}` 入口；计划、完整输入快照与依赖保存为独立报告。自动执行与阶段验证器仍未连接，不能由规划结果宣称 VMP 3.8 或完整业务通过。两份本地参考项目的吸收与适用边界见[方法审查](docs/REVERSE_WORKFLOW_SOURCE_REVIEW.md)。

槽208与137的条件连接见docs/CONTEXT208_JOIN.md：78保存原入口RBP到F+208，137从旧槽144读取原入口RSI，不能混淆当前VIP寄存器。四份完整核心相等后复用旧6项未切割局部查询，本轮22查询16UNSAT6SAT另证3层54绑定/4写/2出口与84→86→88事实、21槽和原671窗口/映像保持；复用不是新增覆盖，非CPU/原生/整VM/精确3.8业务证明。

槽200与处理器0条件连接见docs/CONTEXT200_JOIN.md：136保存原RSP S到F+200，0从旧槽120读取原始入口RBP经R9压栈，不能混淆当前RBP=S。全16GPR/整内存/6写/4出口及20槽保持，76→82→84事实，表项78四字节复用。30查询23UNSAT7SAT是局部方程和明确归纳；源字cut另有原LOAD证明，SAT派发cut恢复原STORE。初版2秒unknown保留，非整VM/CPU/精确3.8业务通过。

处理器208与256字节搬栈循环固定样本证书见docs/HANDLER208_RELOCATION.md；12/24/41条路径、自动32次复制和34层组合保持全16GPR/整内存/有序STORE/互补出口。84查询79UNSAT5SAT为局部方程与明确内存/绑定归纳，不是未切割整VM或精确3.8业务通过；75→76仅加一字节、复用四表项，原671窗口和19槽保持不可省略。

已补充固定SLEIGH的`CALL rel0`完整压栈/BRANCH形状，保留原raw与全部栈写，支持显式RET及组合；活初始flags和其他畸形调用继续拒绝。有限普通状态证明及验收边界见[CALL_REL0](docs/CALL_REL0.md)，不代表完整VMP业务恢复。

Agent现在可用`ig5_ir level=discover`从首选入口生成有界候选路径，再将实际数组交给Java project重新验语义。直接调用跟随须显式开启，返回/间接/条件及原拒绝边界保留；它补充地址生成，尚未完成新VM语义自动恢复，见[PATH_DISCOVERY](docs/PATH_DISCOVERY.md)。

`opaque-status` 已修复合法 SHR 的“架构未定义/解码未建模”交叠误拒，活未知标志继续拒绝。固定3.11样本新增136/78完整普通状态摘要与67→69→75字节条件接点证书，保留旧17上下文槽、两个新槽和完整失败分支；并非精确3.8或完整业务恢复，见[CONTEXT_WRITE_JOIN](docs/CONTEXT_WRITE_JOIN.md)。

多段逆向现在可显式用`compose`的`sequence/transition-chain + template_mode="opaque-status"`，把保存到虚拟栈的标志映像与运算关系连续传给后续处理器。原始字节、逐段完整状态、全部写入和互补出口保留；CPU flags仍须每段自行闭合。公开组合、固定处理器语义证明和原生业务分别验收，详见[OPAQUE_STATUS_COMPOSITION](docs/OPAQUE_STATUS_COMPOSITION.md)。

固定路径可显式选择`projection_mode="opaque-status"`，将同一路径已定义、已建模的状态位关系保留到PUSHFQ保存的标志映像中，其他位继续未知。它补充VM handler中“运算→保存标志→虚拟栈”的数据流；默认模式与原预算保持。当前ADD64处理器的条件证明、AF缺口、独立回归及重验参数见[OPAQUE_STATUS_PROJECTION](docs/OPAQUE_STATUS_PROJECTION.md)，不等于完整CPU或VMP业务恢复。

`project/compose` 可显式选择 `projection_decoder="java"`，通过固定 Ghidra Java API 解码原始字节，复用原状态规则、截止时间和清理协议。默认 native 保持，Java 不加载 IG5 解码 DLL；仍不代表完整业务恢复。参数、来源、重建和分层验收见 [JAVA_PROJECTION](docs/JAVA_PROJECTION.md)。

长显式sequence计划可选`representation="transition-chain"`，以精确状态等式连接全部16GPR、完整内存和守卫；分段深度与展开依赖深度分别报告。原flat深度拒绝及所有工作量、节点、进程预算保留。独立schema和验收边界见[TRANSITION_CHAIN](docs/TRANSITION_CHAIN.md)。

该表示可另显式选择`template_mode="opaque-effects"`，把原严格字节匹配的入口未知效果接入状态链，每次应用生成独立的活未知值；默认strict不变，全部原raw工作与写入保留，模板与组合共享4096次优化访问。宿主返回明确限于结构和来源的核验摘要，避免把绑定节点与其来源混淆。详见[OPAQUE_COMPOSITION](docs/OPAQUE_COMPOSITION.md)。
显式未知效果路径投影见 [OPAQUE_PROJECTION](docs/OPAQUE_PROJECTION.md)；VM 状态、取指、初始化与整机回放的研究边界见 [VM_MODEL_RESEARCH](docs/VM_MODEL_RESEARCH.md)。结构模型、运行期观察与完整业务恢复分别验收。
入口加16段初始化链的维护证明见 [ENTRY_CHAIN_DOMAIN](docs/ENTRY_CHAIN_DOMAIN.md)：全部53次写入的模栈窗口界、显式初始字节与映像分离前提下的路径结论分别核验，反例和未验证原生前提保留。该脚本不新增公开求解接口，不等于完整保护业务恢复。
维护器另支持入口加17段（55写／30字节前提）及后继立即数压栈处理器的完整状态摘要，保留栈检查两侧、原2秒超时和133不同地址的整体组合拒绝。局部接点证明与公开跨报告组合、原生栈前提及完整业务分别处理，参数和回归见同一说明。
公开project/compose预览统一提供宿主核对的`dagReferences`，避免沿用旧报告的引用数。17槽上下文研究另在47个明确字节与映像分离前提下验证入口后写值和存储顺序；15个原始GPR、自由flag映像与零槽分开记录，仍不代表完整保护业务。
后继opcode137的16指令检查路径和28指令快路可另验证完整16GPR、整内存与两侧出口；66个明确初始字节和原区域前提下可条件性接到opcode250。数组查询超时保留，以逐字节证书完成上下文保持；独立证书读取器核对来源与限制，均不代表CPU或完整业务证明。见同一入口域研究说明。
自有目标的可选反反调试环境、固定源码重建和异常续行见 [SCYLLAHIDE](docs/SCYLLAHIDE.md)。
（本工具仅限用于合法授权的软件逆向工程、安全审计与学术研究）

原生轨迹采集、Win64 输入与分段恢复见 [TRACE_RECOVERY](docs/TRACE_RECOVERY.md)；官方 VMP 3.11 Demo 自产样本、现代多壳清单与分层验收见 [MODERN_PROTECTION_CORPUS](docs/MODERN_PROTECTION_CORPUS.md)。静态加载、局部模型与实际业务恢复分别统计。

本地实验版新增 `ig5_ir level=lift`，通过固定修订、独立进程中的开源 Mergen 将 AMD64 PE32+ 函数提升为 LLVM IR；目标只作为数据读取。显式初始 flags、精确内联地址、未决控制流与完整报告均保留，生成 IR 不计业务恢复通过。参数、来源、已知限制与本地验证见 [LIFTER](docs/LIFTER.md)。此新增运行时尚未发布到现有 Release。

本地源码另提供`ig5_ir level=compose`，将原文件的明确地址模板组合为全部16个GPR、顺序字节内存及带守卫的控制状态，支持确定常量条件的有限循环和显式间接/RET目标续接。长计划可用`composition_plan_ref`按文件SHA引用，工具保存快照并返回实际计数，避免模型转抄丢项。工作量、推导开销与未分析出口完整保留；它不证明原生可达性、全输入覆盖或完整去虚拟化，也不放宽旧`level=project`的限制。参数和分层验收见[STATE_COMPOSITION](docs/STATE_COMPOSITION.md)，安装副本和DSH模型验收另记。

状态组合可在精确同主体地址关系下转发最新写入的字节，支持宽窄重叠与地址回绕；未知别名继续保留完整内存读取。`PUSH/RET`能显露同址写入的目标，存储副作用和弹栈状态仍保留；单项化简不代表完整保护业务已经恢复。

`project/compose`还可建模严格字节匹配的无前缀`E8 rel32`近调用，保留完整返回地址压栈状态，并只继续到显式给出的callee入口；没有函数ABI摘要或自动执行。间接/远/前缀调用及未知硬件/完整初始flags依赖继续保留缺口。


首次使用：从 [Windows x64 完整包发布页](https://github.com/Minglink/dsh-infinite-gen-5/releases/latest) 下载完整 Windows ZIP → 完整解压 → 运行 & .\plugin\install.ps1 → 重启 DSH → /ig5 engines → /ig5 open --engine ghidra <路径>。完整包默认离线安装；旧附件不会自动获得新安装器修复。使用 [最新源码 ZIP](https://github.com/Minglink/dsh-infinite-gen-5/archive/refs/heads/master.zip) 或 git clone 时，可在源码根目录运行 & .\install.ps1，安装器检查源码与 DSH profile 后下载固定资产，只补齐运行时和上游源码，保留当前代码。高级功能通过 /ig5 toolset full 展开。


<p align="center">
  <img src="assets/banner.png" alt="无限五代 IG5 · AI 驱动的专业逆向工作台" width="100%" />
</p>

<p align="center">
  <a href="#local-install">
    <img src="https://img.shields.io/badge/DeepSeek%20Harness-📦%20本地自包含安装-10B981?style=for-the-badge&logo=deepseek&logoColor=white" alt="本地自包含安装" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/开源协议-CC%20BY--NC--SA%204.0-brightgreen?style=for-the-badge" alt="CC BY-NC-SA 4.0 协议" />
  </a>
  <img src="https://img.shields.io/badge/项目性质-非盈利开源公益-blue?style=for-the-badge" alt="非盈利开源公益项目" />
</p>

> 🌐 **插件生态市场**：[DeepSeek Harness Hub - DeepSeek 官方与开源生态市场 | 插件发现与一键安装](https://deepseek.stream/)

> ## 💬 DeepSeek 交流群 & 社区
>
> ### 👉 **红队安全交流 9 群：`338431075`**
> ### 👉 **腾讯频道技术交流社区：`pd86424753`**
>
> 🔥 欢迎进群交流 AI 辅助逆向工程心得、二进制安全审计经验、软件漏洞分析基准与大模型逆向工具生态共建！

---

## v1.1.0 独立流量采集（本地开发版）

新增 `ig5_capture` 和 `ig5_capture_control`，由五代自身提供本机 HTTP 代理、显式开启的 HTTPS 解密、流量历史、证据导出和请求重放，不依赖 Burp 程序。Core 8 保持不变，Full 扩展到 40 个入口，13 个写入或执行入口经过审批。工作台新增“流量”页，控制按钮只生成待发送草稿。

下发内容可以经 `ig5_capture action=inspect_payload` 做有界格式检查，再用 `action=materialize` 将完整、未编码的字节保存为 SHA-256 命名的逆向样本。报告保留捕获会话、方向和来源摘要，随后显式 `ig5_open` → 函数 dossier，核对同一份样本的哈希。PE/ELF/WASM 头、JSON 结构及脚本文本线索是分析入口；实际引擎支持需要另行核验，流量无法揭示未下发的服务器内部代码。

本轮增加 `ig5_capture action=state_trace`、`ig5_protocol action=state_infer|state_validate` 与 `ig5_microcode action=deobfuscate`，仍为 Full40。显式选择应用会话后，可从保存的 HTTP 交换建立带来源的观察状态模型，单独检验新轨迹；静态侧可用原生 SSA 的有界常量传播、位片与条件分支证明生成只读去混淆证据。状态合并是外推假设，覆盖层不改数据库、不生成完整去混淆 C，也不提供任意 VM 去壳或隐藏服务代码恢复。调用、预算和验收分层见 [去混淆与协议状态指南](docs/DEOBFUSCATION_STATE.md)。

采集只覆盖测试客户端明确配置到该代理、且位于批准 origin 范围的流量。默认 HTTPS CONNECT 是加密隧道；启用 TLS 解密还需要客户端明确信任本地生成的 CA。不会自动修改系统代理或安装根证书。TCP/UDP 网卡级抓包、HTTP/2、完整主动扫描器和 Burp 全部功能尚未实现，不将此版本称为 Burp Professional 的完整替代。

安装与调用步骤、能力边界及验证入口见 [独立采集指南](docs/CAPTURE.md)。现有 GitHub 1.0.0 附件只是固定引擎资产供体，不含 1.1.0 代码；本地版本号不代表已经发布新的 GitHub 附件。

## 🚀 项目定位与五代革命性升级

**无限五代（dsh-infinite-gen-5 / IG5）** 是专为 **DeepSeek Harness (DSH)** 桌面客户端打造的高性能、无头**逆向分析插件与可视化工作台系统**。

与上一代以提示词注入为主的形态不同，五代彻底实现了从“脚本封装”向专业级全功能 Agent 逆向工作站的本质蜕变：
* **零提示词常驻占领**：不侵占全局系统提示词，彻底杜绝大模型在日常对话中的偏见与输出畸变；
* **40 项专业逆向工具面**：覆盖二进制侦察、CFG、符号与类型、真实 IR、受限仿真、原生调试、跨引擎修改计划，以及显式解密和报文解析；
* **双模式动态降噪**：默认仅加载 **Core 8 核心工具**，减少常驻工具描述开销；高级场景按需展开为 **Full 40 全景工具**；
* **人机协作安全审批门**：13 个写入或执行工具通过宿主公共审批服务请求一次批准，仅明确的 `allowed-once` 才交给后续工具策略；拒绝、缺少活跃 agent 或审批服务时不执行。自建操作日志覆盖部分数据库修改，具体 Undo 范围以各后端为准；
* **现代化交互式工作台**：原生注入 DSH 桌面端，包含富交互 SVG CFG（平移/缩放/双击汇编跳转）、局部变量切片高亮、在线 C 结构体声明草稿箱与真实审计时间线。

---

> ### ⚖️ 严正法律免责与合规使用声明（Strict Legal & Compliance Disclaimer）
>
> **【合规与合法使用严正申明】**：本项目坚决反对并严禁任何形式的违法犯罪行为！本项目开发者绝不支持、不鼓励、不协助任何未授权漏洞挖掘、黑灰产破解、非法获取计算机信息系统数据或破坏计算机信息系统的活动。
>
> 1. **合法受控范围限定**：本项目定位为面向安全研究员、逆向工程师、高校师生及企事业单位的**辅助逆向工程科研工具与防御性软件安全审计套件**。使用本工具必须严格遵守《中华人民共和国网络安全法》、《中华人民共和国数据安全法》、《中华人民共和国计算机软件保护条例》及相关司法解释。**严禁在未经软件著作权人或资产所有者合法书面授权的目标、商业软件或生产系统上运行本项目**。一切逆向与调试行为必须严格限制在自有软件、授权网络安全演练靶标、开源软件审计及合规教学科研环境中进行。
> 2. **严禁违法恶意用途**：使用者严禁利用本项目直接或间接从事：
>    - 破解侵犯正版软件版权、绕过数字版权管理（DRM）或商业授权验证机制；
>    - 分析、提取或利用漏洞编写武器化恶意载荷、病毒木马或勒索软件；
>    - 逆向分析特定受保护的关键信息基础设施系统并实施未授权入侵或窃密；
>    - 违反相关大模型提供商的《服务条款（Terms of Service）》与《滥用政策（Usage Policy）》。
> 3. **开源协议与严格非商用限制（CC BY-NC-SA 4.0）**：本项目依据 **CC BY-NC-SA 4.0（署名-非商业性使用-相同方式共享 4.0 国际开源协议）** 及严禁商用特别条款“按现状（AS-IS）”提供。**严禁任何个人、企业或第三方将本项目（或二次开发衍生版本）用于商业售卖、付费倒卖、商业培训封装或黑灰产牟利，二次开发商用属于严重违法违规行为**。使用者应对自身的所有下载、部署、运行、修改、传播行为以及由此产生的全部输入与输出后果承担独立、完全的法律责任。项目作者与贡献团队绝不承担任何因使用者滥用导致的直接、间接或连带责任。
> 4. **第三方独立性声明**：本项目属于完全独立的开源逆向辅助工具研究项目，与 DeepSeek 官方或其关联主体无任何隶属、商业合作或官方背书关系。

---

## 🧰 工具面与能力矩阵（25 只读 + 13 审批 + 2 配置）

五代提供 40 项逆向工具，并采用 **Core / Full 智能分级机制**：

| 类别 | 数量 | 工具清单 | 典型功能说明 |
| :--- | :---: | :--- | :--- |
| **只读分析面** | 25 | `ig5_doctor`, `ig5_open`, `ig5_status`, `ig5_funcs`, `ig5_strings`, `ig5_decompile`, `ig5_xrefs`, `ig5_calls`, `ig5_bytes`, `ig5_search`, `ig5_listing`, `ig5_scan`, `ig5_export_diff`, `ig5_cfg`, `ig5_slice`, `ig5_fingerprint`, `ig5_stack`, `ig5_switches`, `ig5_vtables`, `ig5_microcode`, `ig5_bindiff`, `ig5_ir`, `ig5_crypto`, `ig5_protocol`, `ig5_capture` | 静态证据、启发式差异、显式参数数据变换、捕获文件解析与明确 schema 解码；分析产物单独保存，不修改原始输入或引擎数据库 |
| **写操作审批门** | 13 | `ig5_rename`, `ig5_patch_bytes`, `ig5_comment`, `ig5_analyze`, `ig5_set_type`, `ig5_undo`, `ig5_run_idapython`, `ig5_dbg`, `ig5_struct`, `ig5_switch_repair`, `ig5_emulate`, `ig5_sync`, `ig5_capture_control` | 按工具名称请求公共 `approval.request`（含 sync preview）；仅 `allowed-once` 继续后续策略。拒绝、不可用、未知结果或请求异常均拒绝执行，取消保持取消；实际执行后登记审计 |
| **生命周期/配置** | 2 | `ig5_close`, `ig5_profile` | 会话安全关闭与工具集热切换（Core 8 ↔ Full 40） |

### 💡 Core 8 与 Full 40 动态降噪架构
* **Core 8 默认模式**：日常对话中仅注册 `ig5_doctor`、`ig5_open`、`ig5_status`、`ig5_funcs`、`ig5_strings`、`ig5_decompile`、`ig5_close`、`ig5_profile` 8 个工具，减少模型常驻工具上下文。
* **Full 40 展开模式**：需要高级分析时，模型可调用 `ig5_profile toolset=full`，或由用户在聊天框直接输入命令切换：
  ```text
  /ig5 toolset full   # 展开为全量 40 个专业工具
  /ig5 toolset core   # 恢复为轻量 8 工具省 Token 模式
  ```

支持 scoped API 的 DSH 全局保留 Core8，Full 只展开到当前智能体会话，其他会话不受影响；`ig5_profile` 返回 `toolsetScope=agent`。旧宿主保留插件实例模式并明确返回 `plugin-instance`。切换不持久化，重载按配置初始化；不会授予运行或写权限。

### 调查任务与单函数证据包

Core8 保持不变。`ig5_decompile style=dossier` 在同一静态会话与数据库修订下聚合反编译、CFG、调用者/被调函数和栈帧，逐章返回成功、截断、不支持或错误，整个证据包保留实际来源与分析 partial；正文按 UTF-8 字节和每个数组的项数限制输出，结果在同会话修订内缓存。响应预算不等于全部后端计算预算，宜围绕问题选取少量函数。

已打开目标可用 `ig5_profile target=... workspace={action:create,goal:...}` 建立持久调查任务，get/list 恢复进展，update 用返回的 `taskRevision` 作 `expected_task_revision` 防止覆盖并发修改。`ig5_decompile style=dossier task_id=...` 将系统快照与独立报告 hash/引用绑定任务；重开或修订变化会标记旧证据 stale。hypothesis/conclusion 与 status 是调用者陈述，保存不代表验证；任务不写 IDB、不授予样本执行权限。参数与恢复步骤见 [调查工作流](docs/INVESTIGATION_WORKFLOW.md)。

本轮已用本机实际安装的 **DSH `0.2.1-alpha.1`** SDK 验证工具 registry、两个 agent 的 Core/Full 隔离、七技能、命令、投影、审批拒绝及卸载。插件声明 `@deepseek-ai/dsh: >=0.2.0-rc.1 <0.3.0-0`，宿主按 `includePrerelease: true` 判断版本；这个范围接受 0.2 的相应预发布版，排除 0.3（含预发布版），不等于每个版本均已完成运行验收。用户所说的“0.2.1 re1”应以安装包实际 runtime 版本对账，详见 [兼容记录](docs/DSH_COMPATIBILITY.md)。

工具返回严格 JSON：可选对象字段的 `undefined` 被省略，`null` 保留；数字必须有限，零必须为正零，64 位地址使用十六进制字符串。常量样本的扫描熵返回 `0.0`，未读取到字节的熵仍为 `null`。无效数组项、BigInt、循环对象或非 JSON 值会明确拒绝，避免宿主在展示结果前校验失败。

---

## 🌟 核心技术亮点

### 1. 交互式 SVG 控制流图 (CFG) 与变量切片
* **富交互画布**：工作台内置高性能原生 SVG 渲染引擎，支持鼠标平移（Pan）、滚轮缩放（Zoom），清晰标明分支与回边。
* **双击汇编跳转**：在流程图上双击任意基本块，即可直接呼出该块的只读反汇编指令检视窗。
* **局部变量切片**：点击变量读取匹配代码行并高亮标识符；这是焦点行过滤，不代表完备的定义使用链或污点分析。

### 2. 轻量纯内存单函数仿真执行 (`ig5_emulate`)
* **内置 Unicorn 2.1.4 引擎**：无需安装庞大的外部依赖，零环境污染。
* **受限函数执行**：Reverse 与 Ghidra 通过公共内存映像提供器执行 x86/x64，Ghidra 另支持 ARM64 / AAPCS64；内存复制上限 64 MiB，可设置参数和指令/时间预算，捕获返回值、内存和 fault。无 OS/import/TLS 环境，不能外推真实进程行为。ARM64 样本在 Windows 宿主仿真通过，不代表 Android 原生运行包已完成。

### 3. Reverse Win32 与 x64dbg 原生调试车道 (`ig5_dbg`)
* Reverse native win32 与自建 x64dbg SDK/NamedPipe headless bridge 已分别验证真实 start、ASLR/RVA 断点、寄存器读写、step 与结构化异常；两条后端证据分别记录。Bochs 仍只有 load/bpt 通过。
* x64dbg 已分别验证 x64/x86 的真实 headless 闭环，其中 x64 中文路径 PE 覆盖受限 5 步 trace、控制 owner/takeover、过期 run/stop 拒绝、缓存读取与 stop/dispose；不使用 automate/ZeroMQ。load 不启动样本，执行需目标运行授权和审批。

### 4. C++ 虚函数表 (vtables) 与跳转表 (Switches) 恢复
* 支持 MSVC64 与 Itanium class/SI/VMI RTTI 布局检视；已验证生成 PE 夹具，未验证原生 Linux ELF 装载，调用解析要求显式表地址和偏移。
* 读取已识别跳转表的分支信息；修复默认 preview，应用需审批且不在 Reverse 操作日志的 Undo 范围。

### 5. 解密、配置提取与协议分析

* `ig5_crypto`：有界 hex/base64、本地文件、静态字节或 blob ref 输入；检查熵/编码/压缩头，执行 XOR、AES-CBC/CTR/GCM、gzip/zlib 及精确验证。`recover` 支持单字节 XOR 全空间、重复 XOR 统计/已知明文约束和 AES 候选材料检索；Latin、有效 UTF-8 CJK 和有限二进制格式头只影响候选评分，不保证任意中文编码或未知二进制。完整密钥以敏感 blob ref 复用，报告不展示原始密钥；随机 AES 全空间不在现实穷举能力内。
* `ig5_protocol`：解析已有 PCAP/PCAPNG 与受支持的 TCP/UDP 层，按方向保留连续片段、缺口与冲突。`infer` 提出有限整数长度、canonical varint 长度、TLV、固定长度及换行分帧候选和字段证据，支持独立 holdout；输出可传给 `decode`。`state_infer` 从显式会话轨迹建立观察前缀树及可选合并假设，`state_validate` 对保存模型重放新轨迹并给出 accepted/rejected/unknown、来源重叠与反例。部分轨迹、未知起点和未观察后续保留不确定性，TCP 不自动提供应用会话边界。TLV 不等于通用嵌套/BER 解析；协议工具本身不监听网络、不恢复通用业务语义或隐藏服务器状态，不做 IP 分片重组。
* 两条数据车道在独立 Node worker 中执行，报告和输出单独保存到 analysis-data；后续调用使用 `result_id` 和 SHA-256 ref，避免重复大缓冲区。工作台只读查看结果，操作入口生成用户可审阅的 composer 草稿。动态取证和执行仍走原有审批门。
* 解密输入/输出最多 1 MiB，普通协议输入最多 8 MiB，状态轨迹 JSON 最多 1 MiB，完整报告与模型预览分别受预算控制。密钥等秘密参数不写入保存的报告；状态建模配置与来源会保存以重建模型，输入/明文产物仍可能包含敏感内容，应按用户工程保管。纯数据层不依赖静态引擎，可供支持 Node worker 的宿主复用，但尚未通过 Android/iOS 真机验收，也不补足手机原生运行包。

### 6. 单函数只读去混淆

`ig5_microcode action=deobfuscate` 在 Ghidra provider 的真实 HighFunction SSA 上执行有界 SCCP，提供受支持位向量的常量传播、精确位片、部分不透明谓词证明和入边条件化 dispatcher 路径。LOAD/CALL 与未知间接目标没有完整语义模型；部分图、未完成定点和预算耗尽不能发布确定性剪枝证明。返回的是不修改机器码、SSA 或数据库的证据覆盖层，不能等同通用去平坦化、任意 VM 去虚拟化、去壳或重新生成去混淆 C。具体限制见 [去混淆与协议状态指南](docs/DEOBFUSCATION_STATE.md)。

新增局部位运算真值表和线性 MBA 恒等式，可证明指定 SSA 的更短表达式；间接目标返回向后依赖切片，保留未决内存和截断，不猜测 handler 地址。`npm run test:vmp-research` 对固定哈希的公开学习样本做离线静态回归，包含原始/VMP 成对文件和吾爱官方挑战题基线；所需样本、来源与验收边界见上述指南，样本不随插件分发。

具体参数、可重复使用的调用例子和验收边界见 [解密与协议工作流](docs/CRYPTO_PROTOCOL.md)。

`ig5_ir level=trace` 现支持在独立 Triton 子进程中恢复已有 x86-64 VMP 轨迹的输入输出表达式，包含宽度投影、状态冲突拒绝、环境未知量、地址选择条件和互补路径合并。六份固定学习样本覆盖加法、XOR、8 位 MBA、signed max、和常量相等分支及 unsigned 和阈值分支；这是记录环境下的轨迹模型证明，保留 `wholeBinaryVerified=false`。调用、来源、限制与真实回归见 [离线业务逻辑恢复](docs/TRACE_RECOVERY.md)。

更大样本库固定了 93 个不同测试目标的来源/大小/SHA，包括 25 份 Tigress 虚拟化挑战、VMP ELF/PE 配对和重编译变体、吾爱破解 2023–2026 春节挑战及 14 个原生对照。下载与有界提取只保存为外部 artifacts，不启动样本；隔离、格式拒绝、APK 未支持与局部分析分别记入报告。收集数量不等于恢复成功率，复现入口和实际证据见 [复杂保护测试样本库](docs/PROTECTION_CORPUS.md)。

---

<a id="local-install"></a>

可选的 Windows 客体调试接入与私有测试包准备见 [VMCI 客体调试](docs/GUEST_DEBUG.md)。它复用现有审批与 x64dbg 录制器，并保留断线后的客体执行归属；客体链路验收不代表 VMP/Enigma 业务恢复通过。

## ⚡ 本地自包含安装

需要 Windows x64 和已安装的 DeepSeek Harness profile。完整 ZIP 包含插件、两套开源运行依赖和上游源码；GitHub **Source code ZIP / tar.gz** 或 `git clone` 提供插件维护源码。当前源码的 `install.ps1` 能为源码目录补齐资产：显示固定附件、大小和进度，流式下载并核验固定 ZIP 大小/SHA-256、校验文件、GitHub 资产摘要（如有）及逐文件清单，最后只补齐 `runtimes/` 与 `third_party/sources/`。固定供体由 `scripts/distribution.json` 锁定为已发布的 `IG5-1.0.0-Windows-x64-dsh021-full-20261010.zip`；它提供不变的引擎资产，不覆盖当前插件代码，也不表示旧 ZIP 已包含本次修复。

1. 完整解压下载的 ZIP，保留包内 `plugin/runtimes/`、`plugin/third_party/sources/` 与各清单文件，不单独复制安装脚本；
2. 打开 PowerShell，进入 ZIP 解压根目录；
3. 执行一键安装脚本：
   ```powershell
   & .\plugin\install.ps1
   ```
4. 脚本离线核验完整运行包，暂存插件及内置依赖，备份已有插件并配置 profile；缺件或校验失败时拒绝安装；
5. 重启 DeepSeek Harness；使用 `/ig5 engines` 或 `ig5_doctor` 检查实际引擎可用性。

源码安装默认首次联网获取完整资产，下载或校验失败不会更改 DSH profile。已下载原始固定 ZIP 的用户可完全离线复用，**在最新源码根目录**执行：

```powershell
& .\install.ps1 -DistributionArchive 'D:\IG5-1.0.0-Windows-x64-dsh021-full-20261010.zip' -Offline
```

`-DistributionArchive` 指向原始 ZIP 文件，并置于源码目录之外；安装器检查固定大小和整包 SHA-256，再在独立暂存目录提取、逐文件校验和安装。已确认完整的解压目录也可作为供体：

```powershell
& .\install.ps1 -DistributionRoot 'C:\已解压的完整发行包根目录' -Offline
```

`-DistributionRoot` 指向含 `manifest.json` 与 `plugin/` 的完整解压根目录，不能与 `-DistributionArchive` 同时使用。只传 `-Offline` 而未提供完整资产时，安装器给出对应发布页和可执行指引；需要下载固定供体时见 [已发布资产基线](https://github.com/Minglink/dsh-infinite-gen-5/releases/tag/v1.0.0-dsh021-20261010)。固定 ZIP 的 SHA-256 为 `a2459ddca1f19e5eec2d7918c504f133889809800a0b277e1e379d3ce1459b54`。

若完整包的 `runtimes/` 或 `third_party/sources/` 缺件、SHA-256 不符，当前安装器支持显式 `-RepairAssets`：先核验插件自身代码与完整外层清单一致，再以固定供体替换这两类资产并完整复验；核心代码被改动、外层清单缺失、资产版本或固定哈希不符仍拒绝。对于**包含此参数的新安装器完整包**，可在解压根目录执行：

```powershell
& .\plugin\install.ps1 -RepairAssets -DistributionArchive 'D:\IG5-1.0.0-Windows-x64-dsh021-full-20261010.zip' -Offline
```

SHA-256 不符时保留报错中的相对路径、Expected/Actual SHA-256 和文件大小，并核对原始 ZIP 哈希；当前证据不能确定其他用户文件变化的原因，不能直接归咎某种解压工具。不要改清单、跳过校验或只补空 JSON。安装成功后 profile 的 `node_modules/dsh-infinite-gen-5` 应指向 `.dsh/plugins/dsh-infinite-gen-5` 的完整目录；未完成安装而保留的普通 npm 源码副本没有运行时。完全退出并重启 DSH 后，以 `/ig5 engines` 和 `ig5_doctor engine=ghidra` 验证新副本。维护者资产重建步骤见 [BUILD](docs/BUILD.md)。

### macOS Apple Silicon（Ghidra 静态分析，实验性）

上面的 `install.ps1` 和 Windows 完整包**不适用于 macOS**；源码副本也没有自带 Apple Silicon 的 JDK、Python 或 Ghidra，不能只修改配置就宣称引擎可用。现可为 `darwin-arm64` 选择独立 Ghidra 运行包（内置 Reverse 静态车道复用 Ghidra 后端），但 x64dbg/原生 Windows 调试不支持；`ig5_emulate` 也不包含可用的 macOS Unicorn 原生运行时。准备包、来源校验及诊断边界见 [macOS 运行包指南](docs/MACOS_RUNTIME.md)。纯数据分析仍可不依赖 Ghidra 使用。

---


## 🧭 逆向工作台操作与常用指令

在对话框中可直接使用斜杠命令与模型工具调用：

### 1. 快捷斜杠命令（免模型 Token 消耗）
* `/ig5 status`：查看已打开引擎会话、样本身份、数据库修订与当前状态；
* `/ig5 engines`：检查三引擎配置和可用性；
* `/ig5 open --engine ghidra <样本路径>`：显式选静态后端；省略参数使用默认引擎，打开不启动样本；
* `/ig5 deobfuscate [--engine reverse|ghidra] <十六进制函数地址> [样本路径]`：读取单函数 SSA 去混淆覆盖层，多目标时须明确路径；
* `/ig5 state <轨迹JSON完整路径>`：建立观察前缀树与深度 2 的合并假设；
* `/ig5 state-validate <推断报告UUID> <新轨迹JSON完整路径>`：以保存的前缀树验证新数据；验证合并假设时使用 `ig5_protocol` 的显式 `state_model.model` 参数；
* `/ig5 toolset full`：展开为 40 个全量逆向分析工具面；
* `/ig5 toolset core`：恢复为 8 工具轻量模式；
* `/ig5 export --engine ghidra <样本路径>`：导出指定数据库当前有效字节补丁副本与报告（尊重 Undo）；多目标时明确路径和来源。

### 2. 8 个原生工作流技能包（Runbooks）
系统预置 7 套分析流程，可在聊天中直接唤起：
* `/ig5-triage`：**新样本 10 分钟快速侦察流**（架构识别 → 熵与加密常量扫描 → 库函数过滤 → 提出关键假设）；
* `/ig5-deep-dive`：**核心算法攻坚流**（关键分支定位 → CFG 拓扑 → 变量切片 → 重建结构体与命名）；
* `/ig5-patch-and-sign`：**补丁实验与哈希签收流**（前置原字节安全校验 → 审批门提交 → 导出副本并校验 SHA-256）；
* `/ig5-diff`：**版本补丁差异比对流**（提取新旧二进制调用图与拓扑结构，定位 Patch 变更块）；
* `/ig5-debug-live`：**动态调试验证流**（断点设置 → 进程挂载 → 命中事件 → 寄存器回读）；
* `/ig5-crypto`：**解密与配置提取流**（定位处理路径 → 显式参数/捕获证据 → 数据变换 → 认证或已知明文对比 → 产物引用）；
* `/ig5-protocol`：**协议证据流**（导入捕获 → 检查方向/缺口/冲突 → 明确分帧、字段和应用会话边界 → 观察状态建模与留出重放 → 保存配置与来源）。
* `/ig5-reverse-agent`：**持续逆向**（持久 Goal → 按失败选择静态/动态/语义路线 → 保存证据与进度 → 自主续轮 → 逐项验收）。Skill 提供方法与判断约束，持续运行由 DSH 原生 Goal 驱动；工具注册或一条最终回复不能证明完整自主能力。宿主状态、停止/恢复和验收见 [自主逆向](docs/AGENT_AUTONOMY.md)。

---

## 📁 项目目录结构

```
dsh-infinite-gen-5/
├── 🖼️ assets/
│   ├── banner.png               # 无限五代高分辨率宽屏海报
│   └── community.jpg            # 官方社区与交流群二维码
├── 🚀 一键安装与维护套件
│   ├── install.ps1              # Windows 自动化一键部署脚本
│   └── uninstall.ps1            # 自动化卸载脚本
├── 🧩 核心插件装载面 (Cordis 架构)
│   ├── package.json             # 插件元数据（dsh-infinite-gen-5 v1.1.0）
│   ├── index.js                 # 宿主核心（40工具注册 + 审批门 + HTTP 诊断端点）
│   ├── client.js                # 工作台前端（SVG CFG + 变量切片 + 结构体草稿箱）
│   ├── advanced_tools.js        # 高阶工具扩展（栈帧 / 跳转表 / 虚表 / 微代码 / 差异比对）
│   ├── semantic_diff.js         # 多特征启发式匹配算法
│   ├── engine_runtime.js        # 独立运行包配置与引擎路由
│   ├── integration_tools.js     # Ghidra IR 与显式跨引擎 changeset
│   ├── analysis_tools.js        # 数据输入、任务与历史报告的工具组合
│   ├── source/                 # 身份/地址、纯数据分析、隔离 jobs 与 analysis artifacts
│   ├── adapters/               # Ghidra / x64dbg 独立工作进程
│   ├── runtimes/               # 随包 Ghidra/JDK/Python 与 x64dbg/Python/bridge
│   ├── third_party/sources/    # 上游源码、固定gitlinks与逐文件来源/hash清单
│   ├── workflow.js              # 原生命令与技能包生命周期管理器
│   ├── cordis.patch.yml         # 宿主加载补丁配置
│   └── HARNESS_PLUGIN.md        # 插件技术规范文档
├── 🧠 原生逆向技能包 (skills/)
│   ├── ig5-triage/SKILL.md      # 新样本快速首探 Runbook
│   ├── ig5-deep-dive/SKILL.md   # 单函数深挖 Runbook
│   ├── ig5-patch-and-sign/      # 补丁验证与导出 Runbook
│   ├── ig5-diff/SKILL.md        # 版本差异比对 Runbook
│   ├── ig5-debug-live/SKILL.md  # 动态调试交互 Runbook
│   ├── ig5-crypto/SKILL.md      # 解密与配置提取 Runbook
│   └── ig5-protocol/SKILL.md    # 捕获、分帧与字段证据 Runbook
├── 🐍 后端逆向工作进程 (worker/)
│   ├── ig5_worker.py            # JSON-RPC 核心通信进程（Reverse 引擎封装）
│   ├── advanced_analysis.py     # C++ 虚表/RTTI/微代码/跳转表分析实现
│   ├── execution_analysis.py    # Unicorn 仿真执行核心
│   └── vendor/unicorn/          # 插件内置 Vendored Unicorn 2.1.4 运行时
└── 🧪 自动化测试套件 (scripts/)
    ├── test_new_tools.mjs       # 真实样本基础工具烟测
    ├── test_advanced_runtime.mjs# Unicorn 仿真 / 微代码 / 虚表 / 跳转表回归测试
    ├── test_debug_runtime.mjs   # 原生 Win32 真实进程调试全流程闭环回归
    ├── test_client.mjs          # SVG CFG / 变量切片 / 竞态条件前端自动化测试 (含引擎切换与原生焦点回归)
    ├── test_workflow.mjs        # Core8/Full40、七技能注册/回滚/生命周期测试
    ├── test_crypto_analysis.mjs # 固定向量、认证与压缩/输出预算
    ├── test_protocol_analysis.mjs # 捕获、重组、分帧与字段边界
    └── test_patch_runtime.mjs   # 补丁审批与安全回滚测试
```

---

## 💬 官方交流社区

> 📌 **非盈利开源公益项目，严禁任何主体用于商业售卖、付费倒卖或黑灰产牟利，仅供技术研究交流。**

<p align="center">
  <img src="./assets/community.jpg" width="240" alt="DeepSeek 网安逆向技术交流社区" /><br>
  <sub><b>🌐 官方技术交流社区（腾讯频道号：pd86424753 · 红队安全交流 9 群：338431075）</b></sub>
</p>

---

## 📄 开源协议与非商用特别声明（License）

本项目采用 **[CC BY-NC-SA 4.0（署名-非商业性使用-相同方式共享 4.0 国际许可协议）](LICENSE)** 进行开源，并附加以下严格的法律与商业限制条款：

1. 🚫 **严禁直接商业使用**：禁止任何个人、企业或第三方将本项目自有代码、组件、前端界面及文档用于商业售卖、付费倒卖、付费社群、会员增值服务或黑灰产牟利。随包第三方源码、运行件和依赖继续适用各自上游许可，项目 NC 条款不覆盖它们。
2. 🚫 **严禁二次开发商业化**：任何基于本项目的 Fork、修改、重构、二次开发或作为组件嵌入其他软件时，**必须严格继承 CC BY-NC-SA 4.0 协议并完全开源，绝对禁止将任何二次开发或衍生作品用于商业营利**。二开商用属于严重侵权及违法违规行为。
3. ⚖️ **违规终止与法律追责**：任何违反非商业性条款或将本项目用于违法黑产活动的行为将导致开源授权自动且永久终止，原作者保留依法追究侵权方民事赔偿与法律责任的一切权利。
