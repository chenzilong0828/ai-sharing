export type DatasetCategory = string

export interface DatasetItem {
  id: string
  title: string
  category: DatasetCategory
  description: string
  language: string
  code: string
  content?: string
}

export const rulesDataset: DatasetItem[] = [
  {
    id: 'r1',
    title: 'AURA-X-KYS 核心哲学 (Global AI Protocol)',
    category: 'Architecture',
    description: '集成在 IDE 的终极控制协议。深度融合 KISS、YAGNI 与 SOLID，确立 AI 协作的物理底线与逻辑边界。',
    language: 'markdown',
    code: `# AURA-X-KYS Global AI Protocol (V2.0)
You are a highly disciplined AI Engineer. You MUST strictly adhere to this protocol.

## 1. 核心设计哲学 (The Trinity)
- **KISS (Keep It Simple)**: 拒绝技术炫技。优先输出可读性最高、分层最清晰的代码。当存在两种实现时，选择逻辑链路最短的那一个。
- **YAGNI (You Aren't Gonna Need It)**: 禁止任何形式的防御性预留或过度工程。只实现当前任务明确要求的原子功能。
- **SOLID**: 所有重构必须基于单一职责 (SRP)。函数应像乐高积木一样可自由组合。

## 2. 执行纪律 (Operational Mandates)
- **静默执行 (Silent Execution)**: 禁止输出任何非必要的解释、确认语或“好的/没问题”。直接返回代码交付物。
- **原子步进 (Atomic Steps)**: 将复杂任务拆解。每一步只修改 1-2 个逻辑点。禁止一次性提交横跨 5 个文件的非原子修改。
- **零幻觉原则**: 遇到不确定的 API 或框架版本，必须立即声明并请求使用 context7 工具抓取官方文档。

## 3. 禁令清单 (Strict Prohibitions)
- 严禁在无用户授权的情况下大面积删除存量代码。
- 严禁在代码中 Hardcode 任何密钥、密匙或敏感配置。
- 严禁输出超过 150 行的单次工具调用内容 (防止截断导致逻辑腐败)。`
  },
  {
    id: 'r2',
    title: 'Vue 3 & Nuxt 3 深度工程标准',
    category: 'Frontend',
    description: 'Vue 生态的生产级开发规范。聚焦响应式性能、类型安全及 Composable 架构的高度内聚设计。',
    language: 'markdown',
    code: `# Vue 3 & Nuxt 3 Architecture Standards
## 1. 核心约束 (Core Constraints)
- **API Paradigm**: 必须使用 Composition API 与 \`<script setup lang="ts">\`。禁止 Options API。
- **Strict Typing**: 
  - 所有 Props 必须使用 \`defineProps<Props>()\` 结构。
  - 严禁使用 any，优先使用泛型或 \`unknown + Type Guards\`。
- **Reactivity Safety**: 处理响应式数据时，优先使用 \`shallowRef\` 处理大型第三方实例，避免不必要的深度代理性能损耗。

## 2. 架构模式 (Architectural Patterns)
- **Composable First**: 核心业务、API 调用、甚至复杂的 UI 状态逻辑必须抽取为 Composable。
- **Smart vs Dumb**: 页面组件处理数据获取与状态分发，基础组件仅通过 Props 接收数据并通过 Emits 冒泡事件。
- **State Management**: 统一使用 Pinia。禁止在组件内定义跨页面共享的状态。

## 3. 性能与发布 (Performance)
- **Lazy Loading**: 路由组件与重型库 (ECharts, Editor) 必须执行分包。
- **Vite Mastery**: 利用 \`unplugin-auto-import\` 减少重复引入，但必须严格维护 \`auto-imports.d.ts\`。`
  },
  {
    id: 'r3',
    title: 'Tailwind CSS v4 视觉工程指南',
    category: 'Frontend',
    description: '针对 Aura-X 风格的高审美 UI 标准。涵盖设计令牌提取、Modern CSS 特性及 60fps 动效标准。',
    language: 'markdown',
    code: `# Visual Engineering: Tailwind CSS v4
## 1. 样式哲学 (Styling Philosophy)
- **Token Based**: 严禁在组件中手写魔术数字间距 (如 mt-[13px])。必须映射到 Tailwind 的 spacing scale。
- **Atomic Classes**: 保持类名整洁。复合样式超过 5 个类名且重复使用时，考虑提取为 CSS Variable 并在 layer 级别注入。

## 2. 高级 UI 规范 (Advanced UI)
- **Aesthetic Precision**: 
  - Dark Mode 背景色标准: \`bg-[#0a0a0f]\`。
  - 玻璃效果标准: \`backdrop-blur-xl bg-white/5 border-white/[0.08]\`。
- **Animations (60fps)**: 
  - 交互反馈必须包含 \`transition-all\`，时长 \`300ms\`，曲线 \`cubic-bezier(0.4, 0, 0.2, 1)\`。
  - 动态布局切换必须使用 Layout Transitions (如 Framer Motion 或 Vue Transition)。

## 3. 响应式与修复 (Responsive & Fix)
- **Mobile First**: 优先编写基础样式，后缀 \`md:\`, \`lg:\` 处理大屏增强。
- **Conflict Resolution**: 利用 \`tailwind-merge\` 方案解决组件 Props 传入类名与默认类名的覆盖冲突问题。`
  },
  {
    id: 'r4',
    title: 'RESTful API & 契约优先协议',
    category: 'Backend',
    description: '后端 API 设计的高级守则。强调标准化、错误追踪、DTO 严防及原子事务的链路保护。',
    language: 'markdown',
    code: `# Backend API & Contract-First Protocol
## 1. 通讯契约 (The Contract)
- **Semantic URL**: 资源用名词复数 (/orders)，操作谓词由 HTTP Method 承载。禁止动词 URL。
- **Unified Response**: 
  \`\`\`json
  { "code": 0, "data": {}, "message": "success", "trace_id": "uuid" }
  \`\`\`
- **Versioning**: 必须通过 URL (/v1/...) 或 Accept Header 进行版本硬隔离。

## 2. 系统防御 (Defense Depth)
- **Input Validation**: 所有外部输入必须经过 Schema 强校验 (Zod/Joi/Validator)。
- **DTO Layer**: 禁止直接将数据库模型下发至前端。必须通过 Transformer 剥离敏感字段 (Password, Internal IDs)。
- **Rate Limiting**: 核心业务写入接口必须实现基于 Redis 的令牌桶并发控制。

## 3. 异常处理 (Error Handling)
- 严禁向前端裸露底层数据库报错或堆栈信息。
- 每一个 5xx 错误必须生成唯一的事件 ID 并持久化至日志系统中以便回溯。`
  },
  {
    id: 'r5',
    title: 'SQL & 数据库深度实践标准',
    category: 'Backend',
    description: '数据层的性能红线与安全壁垒。专注于索引优化、事务范围控制及防范 N+1 陷阱。',
    language: 'markdown',
    code: `# Database Intelligence & Optimization
## 1. 查询性能 (Query Performance)
- **Anti-N+1**: 严禁在循环体内执行 SQL。必须使用 Eager Loading (Join) 或批量获取模式。
- **Index Guard**: 
  - 高频搜索/排序字段必须创建 B-tree 索引。
  - 严禁在索引列上进行函数运算，防止索引失效。
- **Selective Retrieval**: 禁止 \`SELECT *\`。仅召回当前业务逻辑绝对必要的字段。

## 2. 事务与并发 (Concurrency)
- **Small Transactions**: 事务范围需极致压缩。严禁在事务生命周期内调用任何第三方 HTTP 服务。
- **Optimistic Locking**: 涉及余额、库存更新，强制使用版本号 (Version Column) 实现乐观锁控制。

## 3. 安全防范 (Data Security)
- **Parameterized Queries**: 绝不使用字符串拼接 SQL。
- **Data Integrity**: 核心配置表必须实现逻辑删除 (Deleted_at) 而非物理删除，保留审计链路。`
  },
  {
    id: 'r6',
    title: 'Clean Code: 大厂重构思维导图',
    category: 'Architecture',
    description: '将软件工程名著转换为可执行的 Prompt。包含函数、模块、注释及重构步骤的具体量化标准。',
    language: 'markdown',
    code: `# Clean Code & Refactoring Mindset
## 1. 命名与自解释 (Naming Strategy)
- **Boolean**: 变量名应带 \`is\`, \`has\`, \`should\` 前缀。
- **Meaning over Length**: 优先选择描述准确的长命名，而非模糊的短缩写。

## 2. 代码结构量化 (Quantitative Metrics)
- **The Power of 30**: 单个函数逻辑行数不建议超过 30 行。超出则强制职责拆分。
- **Indentation Depth**: 嵌套层次严禁超过 3 层。通过 Guard Clauses (提前返回) 将逻辑扁平化。
- **SRP (Single Responsibility)**: 一个模块只承载一个“变更原因”。

## 3. 重构纪律 (Refactoring Workflow)
- **Red-Green-Refactor**: 重构前必须建立自动化回归测试。
- **Atomic Commits**: 禁止在同一个提交中进行“功能开发”与“代码重构”。
- **DRY (Don't Repeat Yourself)**: 发现三次相同的代码片段，合并为公共工具或抽象类。`
  },
  {
    id: 'r7',
    title: '全栈安全防御: 零信任开发守则',
    category: 'Backend',
    description: '从代码编写阶段阻断 80% 的安全漏洞。覆盖 OWASP 主要风险点的防御性编码约束。',
    language: 'markdown',
    code: `# Security First: Zero Trust Development
## 1. 身份与访问 (IAM)
- **Default Deny**: 所有端点默认受限。必须通过装饰器 (e.g., @Public) 才能显式公开。
- **Horizontal Auth**: 每个资源访问请求必须验证 \`Owner_ID == Current_User_ID\`，严防 IDOR 越权攻击。

## 2. 注入与跨站防御 (Injection)
- **XSS Sanitization**: 在模板渲染前，必须对所有非信任 content 进行 HTML 转义。
- **CSRF Protection**: 所有的 Mutation 请求 (POST/PUT/DELETE) 必须包含 CSRF Token 校验。

## 3. 敏感数据治理 (Data Privacy)
- **Secrets Management**: 禁止在 git 仓库中存储任何 \`.env\` 文件。必须使用 Secret Store 分发。
- **Log Masking**: 日志输出前必须过滤 手机号、身份证、邮箱 及 密码 Hash。`
  },
  {
    id: 'r8',
    title: '现代测试工程: TDD 与 AAA 范式',
    category: 'Testing',
    description: '驱动高质量交付的测试准则。从单元测试、集成测试到端到端测试的完整链路规范。',
    language: 'markdown',
    code: `# Modern Testing Excellence
## 1. 核心范式 (The AAA Pattern)
- **Arrange**: 设置初始状态与 Mock 环境。
- **Act**: 调用目标函数或触发用户交互。
- **Assert**: 断言结果与副作用 (Side Effects) 是否符合预期。

## 2. 测试分类与职责 (Testing Taxonomy)
- **Unit Tests**: 隔离所有 IO。100% 覆盖纯算法与业务规则分支。
- **Integration Tests**: 模拟真实的 DB/API 交互。验证组件间的契约是否匹配。
- **E2E Tests**: 走核心业务 Happy Path。关注用户最终交付价值的完整性。

## 3. 测试健壮性 (Robustness)
- **Deterministic**: 测试结果应不依赖环境、时间或执行顺序。
- **Edge Case Discovery**: 强制为每个接口编写针对 \`null\`, \`huge strings\`, \`negative numbers\` 的边界破坏测试。`
  },
  {
    id: 'r9',
    title: 'Git 工作流与 CI/CD 自动化金科玉律',
    category: 'DevOps',
    description: '确立研发协作的高速公路。Conventional Commits、发布周期及自动化质量网关。',
    language: 'markdown',
    code: `# DevOps & Gitflow Standards
## 1. 协作流规范 (Collaboration)
- **Atomic Commits**: 每个 Commit 只解决一个 JIRA/Issue。
- **Message Convention**: 严格执行 \`type(scope): description\` 格式。
- **Pruning**: 即使是短期 Feature 分支，在合并后也必须立即删除，保持仓库整洁。

## 2. 自动化质量网关 (Quality Gates)
- **Pre-commit**: 强制执行 Linting 与 Prettier。
- **CI Pipeline**: 
  - 构建失败禁合并。
  - 单元测试通过率低于 100% 禁合并。
  - 静态漏洞扫描 (SAST) 指标不达标禁合并。

## 3. 版本与发布 (Releases)
- **SemVer**: 严格遵守语义化版本控制 (Major.Minor.Patch)。
- **Changelog**: 必须基于 Commit History 自动生成版本更新日志。`
  },
  {
    id: 'r10',
    title: '知识管理: 文档即代码 (Docs as Code)',
    category: 'Documentation',
    description: '确保项目长青的文档标准。JSDoc、KI (Knowledge Items) 与架构决策日志的编写范式。',
    language: 'markdown',
    code: `# Documentation & Knowledge Management
## 1. 代码内文档 (Living Docs)
- **JSDoc Mandatory**: 所有导出的类型、函数及类必须具备 JSDoc。包含字段释义、副作用说明及用法示例。
- **Contextual Comments**: 注释应描述“为什么这么做 (WHY)”而非“做了什么 (WHAT)”。

## 2. 架构决策记录 (ADR)
- 重大的技术选型、架构变更、以及对 YAGNI 原则的某种“违背”，必须记录 ADR。
- 格式: 背景 -> 决策 -> 后果 (Status: Proposed / Accepted / Deprecated)。

## 3. 知识资产沉淀 (Knowledge Items)
- **Bug KIs**: 记录具有代表性的 Bug 及其解法，防止团队成员复现。
- **Pattern KIs**: 对项目中沉淀的通用解决模式（如：特定的查询优化方案、复杂动效实现）进行归档，方便 AI 后续调用。`
  }
]



export const mcpDataset: DatasetItem[] = [
  {
    id: 'm1',
    title: 'Context7 (前沿框架文档库)',
    category: 'Documentation',
    description: '自动搜索并内联读取 Next.js、Vue、React 等最新官方文档，彻底消灭 AI 陈旧知识库导致的 API 幻觉。',
    language: 'json',
    code: `{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}`
  },
  {
    id: 'm2',
    title: 'Figma UI 视觉提取与测绘 (Pencil)',
    category: 'Frontend Tools',
    description: '让 AI 直通 Figma 的节点设计引擎。能精准拉取 Auto Layout 布局、颜色令牌进行前端 1:1 像素级还原。',
    language: 'json',
    code: `{
  "mcpServers": {
    "pencil": {
      "command": "npx",
      "args": ["@pencil/mcp-server"]
    }
  }
}`
  },
  {
    id: 'm3',
    title: 'PostgreSQL Database MCP',
    category: 'Backend / DB',
    description: '基于真实连接串读取远端/本地 Postgres 数据库。让 AI 理解库表结构，自动生成正确的 SQL 及其 ORM 模型代码。',
    language: 'json',
    code: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost/db"]
    }
  }
}`
  },
  {
    id: 'm4',
    title: 'GitHub / GitLab 提效套件',
    category: 'DevOps',
    description: '允许 AI 操作您的代码仓库：快速读取云端分支上下文、审查代码或自动发起和合并 Pull Requests。',
    language: 'json',
    code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}`
  },
  {
    id: 'm5',
    title: 'Puppeteer / 网页自动化与 E2E',
    category: 'Tools',
    description: '赋能 AI 操作真正的无头浏览器沙盒环境。用于截图审查、爬取动态网页内容与自动执行端到端测试。',
    language: 'json',
    code: `{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}`
  },
  {
    id: 'm6',
    title: 'Brave Search 高速联网搜索',
    category: 'Search',
    description: '为 AI 提供高速准确的网络搜索能力，在应对各种稀有报错日志或第三方包新版本特性时极度有效。',
    language: 'json',
    code: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}`
  },
  {
    id: 'm7',
    title: 'SQLite 轻量级数据库 MCP',
    category: 'Backend / DB',
    description: '让 AI 直读本地 SQLite 文件数据库。非常适合辅助开发桌面端应用或本地微端项目的数据逻辑。',
    language: 'json',
    code: `{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "path/to/database.db"]
    }
  }
}`
  },
  {
    id: 'm8',
    title: 'OpenAPI / Swagger 文档直连 MCP',
    category: 'Backend / Architecture',
    description: 'Java 后端高频利器。直接加载 Spring Boot 的 Swagger/OpenAPI JSON 规范，让 AI 零误差为您全自动生成对应的前端请求代码与 TS 类型映射。',
    language: 'json',
    code: `{
  "mcpServers": {
    "openapi": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-openapi", "http://localhost:8080/v3/api-docs"]
    }
  }
}`
  }
]

export const skillsDataset: DatasetItem[] = [
  {
    id: 's1',
    title: 'api-design',
    category: 'Backend / API',
    description: 'API工程师技能 - API设计规范、版本控制、错误处理、并发安全、性能优化、文档。当你新建/修改任何API端点、路由、控制器、HTTP请求处理、响应格式、中间件时必须使用此技能。即使用户只是说"加个接口"或"改下返回值"，也应触发。',
    language: 'markdown',
    code: `@api-design 完成这个 RESTful 接口的代码实现，确保符合 DTO 规范和幂等性。`,
    content: `---
name: api-design
description: API工程师技能 - API设计规范、版本控制、错误处理、并发安全、性能优化、文档。当你新建/修改任何API端点、路由、控制器、HTTP请求处理、响应格式、中间件时必须使用此技能。即使用户只是说"加个接口"或"改下返回值"，也应触发。
---

# API工程师技能 (API Engineer Skill)

## 快速规则（日常开发时自动加载，只需读到这里）

> **[API核心清单]** ① 资源用名词复数+≤2层嵌套，❌动词URL ② 统一{code,data,message}响应，列表必须分页(默认20最大100) ③ 新端点默认需认证，CRUD必须验资源所有权
> **[幂等三条]** POST用Idempotency-Key防重复，PUT/DELETE天然幂等，支付类必须服务端去重
> **[安全三禁]** ❌直接返回DB模型(用DTO) ❌返回密码hash/内部ID ❌500返回堆栈

写/改API端点时，强制遵守：
1. **URL规范**：资源用名词复数(/users)，嵌套≤2层，❌禁止动词URL(/getUser)（动词URL破坏REST语义，导致端点爆炸且无法统一缓存/权限策略）
2. **HTTP方法**：GET读(无副作用) POST创建 PUT替换 PATCH更新 DELETE删除，❌禁止POST做所有操作（丢失HTTP语义=无法利用缓存/幂等性/安全性约定，客户端无法预判行为）
3. **认证授权**：新端点默认需认证，CRUD必须验证资源所有权(防IDOR)，批量操作逐个验权
4. **响应格式**：统一\`{code, data, message}\`，列表带分页(默认20最大100)，空列表返回\`[]\`非\`null\`
5. **错误处理**：400参数错误(含字段详情) / 401未认证 / 403无权限 / 404不存在 / 422业务拒绝 / 500+唯一ID
6. **幂等安全**：POST创建必须有幂等键(Idempotency-Key)，支付类必须服务端去重
7. **性能**：列表必须分页，批量操作有上限，N+1查询→批量查询，大导出→异步+下载链接
8. **安全**：❌禁止直接返回DB模型(用DTO)（DB模型新增字段会意外暴露敏感数据） ❌禁止返回密码hash/内部ID（攻击者可离线破解或枚举内部资源） ❌禁止500返回堆栈（堆栈暴露框架版本/文件路径/SQL结构）

新增端点前：Grep确认无重复端点 → 确认命名风格一致 → 确认已加认证中间件

---

## 完整审查流程（手动 /api-design 或专项审查时执行）

### Phase 1: API现状扫描

1. 扫描所有API端点（Grep路由定义/Controller/Handler）：
   - 列出所有路由：HTTP方法 + 路径 + Handler函数 + 中间件
   - 识别端点完成度：已实现 / TODO占位 / 废弃未删除
   - 用MCP工具(desc_table/read_query)检查API关联的数据模型

2. 检查API一致性：
   - URL命名风格是否统一（kebab-case? camelCase? snake_case?）
   - 响应格式是否统一（所有端点是否用相同的响应结构）
   - 认证方式是否统一（JWT? Session? API Key? 混用?）
   - 错误格式是否统一（错误码体系是否一致）

### Phase 2: RESTful设计规范审查

3. **URL设计**：
   - 资源用名词复数：\`/users\`不是\`/getUser\`或\`/user\`
   - 嵌套关系：\`/users/{id}/orders\`（不超过2层嵌套）
   - 查询过滤：\`/users?status=active&sort=-created_at\`
   - ❌ 禁止：动词URL(\`/getUsers\`/\`/deleteUser\`)、深层嵌套(>2层)、无意义ID暴露（动词破坏统一性，深嵌套增加耦合度，暴露内部ID助力枚举攻击）

4. **HTTP方法**：
   - GET：读取，无副作用，可缓存
   - POST：创建新资源
   - PUT：完整替换资源
   - PATCH：部分更新资源
   - DELETE：删除资源
   - ❌ 禁止：用POST做所有操作、GET请求有副作用（POST做所有=丢失HTTP语义约定；GET有副作用=爬虫/预加载会触发数据变更）

5. **状态码规范**：

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 200 | 成功 | GET/PUT/PATCH/DELETE成功 |
| 201 | 已创建 | POST创建成功 |
| 204 | 无内容 | DELETE成功且无返回体 |
| 400 | 请求错误 | 参数验证失败、格式错误 |
| 401 | 未认证 | 未登录、Token过期 |
| 403 | 无权限 | 已认证但无权访问该资源 |
| 404 | 不存在 | 资源不存在 |
| 409 | 冲突 | 资源已存在、版本冲突 |
| 422 | 无法处理 | 参数合法但业务逻辑不允许 |
| 429 | 请求过多 | 速率限制 |
| 500 | 服务器错误 | 未预期的内部错误 |

   - ❌ 禁止：所有错误都返回200+自定义code、所有错误都返回500（200+自定义code让客户端无法用HTTP状态码统一处理错误；全500丢失了错误类型信息）

### Phase 3: 请求与响应规范

6. **请求规范**：
   - 必须验证所有输入参数（类型/范围/长度/格式）
   - 验证失败返回具体字段和原因（不只说"参数错误"）
   - 分页参数：\`page\`+\`page_size\`或\`cursor\`+\`limit\`，有最大值限制
   - 排序参数：白名单校验可排序字段，防止任意字段排序导致慢查询
   - 文件上传：类型白名单+大小限制+文件名消毒

7. **响应格式**（全局统一）：

\`\`\`json
// 成功
{
  "code": 0,
  "data": { ... },
  "message": "success"
}

// 列表（带分页）
{
  "code": 0,
  "data": {
    "items": [ ... ],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}

// 错误
{
  "code": 40001,
  "message": "用户友好的错误描述",
  "details": [
    { "field": "email", "reason": "格式不正确" }
  ]
}
\`\`\`

   - ❌ 禁止：返回原始数据库错误/堆栈/内部路径（暴露数据库结构/框架版本/文件路径给攻击者）
   - ❌ 禁止：返回不需要的字段如密码hash/内部ID/调试信息（扩大攻击面，hash可离线破解，内部ID可枚举）
   - ✅ 用DTO/序列化器控制返回字段，而非直接返回数据库模型

8. **空值与默认值**：
   - 列表为空返回\`[]\`不是\`null\`
   - 可选字段缺失时有默认值，不是\`undefined\`
   - 数字字段缺失返回\`0\`不是\`null\`（除非null有语义意义）

### Phase 4: 认证与授权

9. **认证规范**：
   - 新端点**默认需认证**，公开端点用\`@public\`显式标记
   - Token必须：验签+检查过期+检查吊销（不能只解码不验证）
   - 刷新Token机制：Access Token短期(15-30min) + Refresh Token长期(7-30天)
   - Token存储：HttpOnly Cookie(Web) / Keychain(iOS) / KeyStore(Android)
   - ❌ 禁止：Token在URL参数中传递（会被日志/Referer/浏览器历史记录泄露）、LocalStorage存Token（XSS可直接读取）、永不过期的Token（泄露后永久有效无法止血）

10. **授权规范**：
    - 每个CRUD操作必须验证资源所有权（防IDOR）
    - \`GET /users/{id}/orders\` → 必须验证当前用户有权查看该用户的订单
    - 批量操作必须逐个验证权限（不是只验证第一个）
    - 管理员操作必须有独立的权限检查（不只靠角色字段）
    - 权限检查在业务逻辑之前执行

### Phase 5: 错误处理与重试

11. **错误处理分层**：

| 层级 | 处理方式 | 示例 |
|------|----------|------|
| 参数验证层 | 返回400+具体字段错误 | 邮箱格式错误 |
| 业务逻辑层 | 返回422+业务原因 | 余额不足 |
| 权限层 | 返回401/403 | 未登录/无权限 |
| 基础设施层 | 返回503+重试提示 | 数据库连接失败 |
| 未知错误层 | 返回500+错误ID | 便于日志追踪 |

    - 每个500错误必须生成唯一ID，日志中可追踪
    - 生产环境500不返回堆栈，只返回错误ID
    - 第三方服务失败：返回503而非500，告知客户端可重试

12. **幂等性设计**：
    - POST创建：用幂等键(Idempotency-Key)防重复创建
    - PUT/DELETE：天然幂等（重复执行结果相同）
    - 支付/转账类：必须有幂等键+服务端去重
    - ❌ 禁止：POST创建无去重机制（网络重试=重复数据）

### Phase 6: 并发与性能

13. **并发安全**：
    - 乐观锁：更新时带版本号（\`UPDATE ... WHERE version = ?\`），冲突返回409
    - 限流：全局限流+按用户限流+按端点限流
    - 防重放：请求带时间戳+签名，过期请求拒绝
    - 长耗时操作：异步化（返回202 Accepted + 轮询/WebSocket通知）

14. **性能规范**：
    - 列表API必须分页（默认20条，最大100条）
    - 批量操作有上限（一次最多操作N个资源）
    - N+1查询检测：Grep循环中的数据库调用
    - 响应时间目标：P95 < 200ms（读）/ P95 < 500ms（写）
    - 大数据导出：流式返回或异步+下载链接，不在内存中拼接

15. **缓存策略**：
    - 读多写少的数据：Cache-Control / ETag / Redis缓存
    - 缓存失效策略：TTL + 主动失效（写入时清除相关缓存）
    - ❌ 禁止：缓存带认证的个人数据到公共CDN（个人数据被CDN缓存后，其他用户可能拿到别人的数据）

### Phase 7: 版本控制与兼容

16. **版本策略**：
    - URL路径版本：\`/v1/users\`、\`/v2/users\`
    - 旧版本维护期：至少维护2个版本，新版本稳定后废弃旧版
    - 废弃API：返回Deprecation头 + 文档标记 + 日志记录使用量

17. **向后兼容规则**：
    - ✅ 允许：新增可选字段、新增端点、放宽验证
    - ❌ 破坏性变更：删除字段、修改字段类型、改变语义、加严验证
    - 破坏性变更必须升版本号

### Phase 8: API文档与测试

18. **文档规范**：
    - 每个端点必须有：描述、请求参数、响应示例、错误码列表
    - 使用OpenAPI/Swagger自动生成文档（代码即文档）
    - 文档必须包含认证说明和速率限制说明

19. **测试覆盖**：
    - 每个端点至少覆盖：正常请求、参数缺失、参数非法、未认证、无权限、资源不存在
    - 边界测试：空列表、超长字符串、特殊字符、并发请求
    - 安全测试：SQL注入参数、XSS参数、超大请求体

### Phase 9: 输出报告

\`\`\`
## API审查报告

### 端点清单
| 方法 | 路径 | Handler | 认证 | 状态 |

### 设计规范违规
| # | 端点 | 问题类型 | 描述 | 修复建议 | 严重度 |

### 安全问题
| # | 端点/文件:行号 | 问题 | 攻击场景 | 修复建议 | 严重度 |

### 性能风险
| # | 端点 | 问题 | 影响 | 优化方案 | 优先级 |

### 一致性问题
| 类别 | 当前状态 | 建议统一方案 |

### 缺失项
| 类别 | 缺失内容 | 建议 | 优先级 |
\`\`\`

## API开发规则（写API代码时强制遵守）

### 新增端点前必须执行
1. Grep确认没有已存在的同功能端点
2. 确认URL命名与现有端点风格一致
3. 确认响应格式与全局统一格式一致
4. 确认已添加认证中间件（除非显式标记@public）

### 修改端点前必须执行
1. Grep所有调用方（前端/移动端/第三方）确认影响范围
2. 确认修改是否向后兼容，不兼容必须升版本号
3. 确认错误处理覆盖所有分支

### 写API代码强制规则
- ❌ 禁止直接返回数据库模型——用DTO控制返回字段（DB模型含密码hash/内部字段，泄露后可被攻击）
- ❌ 禁止GET请求有副作用（缓存/爬虫/预加载会意外触发修改，违反HTTP语义）
- ❌ 禁止POST创建无幂等机制（网络重试/用户双击=重复创建资源）
- ❌ 禁止列表API无分页（数据量增长后单次返回百万行，OOM或超时）
- ❌ 禁止无WHERE的UPDATE/DELETE暴露为API（一次调用可清空整张表）
- ✅ 所有输入必须验证（类型+范围+长度+格式）
- ✅ 所有CRUD必须验证资源所有权
- ✅ 500错误必须有唯一ID用于追踪

## 约束
- 所有发现必须有 端点路径 或 文件:行号 引用
- 安全问题必须附带攻击场景说明
- 性能建议必须基于实际查询模式
- API设计建议遵循最小权限原则`
  },
  {
    id: 's2',
    title: 'db-design',
    category: 'Backend / Database',
    description: '数据库工程师技能 - Schema设计、索引优化、并发安全、数据库审计。当你涉及数据库表/字段/索引/SQL/迁移/MCP数据库操作、建表改表、写查询时必须使用此技能。即使用户只是说"加个字段"或"查下数据"，也应触发。',
    language: 'markdown',
    code: `@db-design 优化这个 SQL 查询并分析潜在的 N+1 问题。`,
    content: `# 数据库工程师技能 (Database Engineer Skill)

## 快速规则（日常开发时自动加载，只需读到这里）

> **[DB核心清单]** ① 新增前list_table+desc_table查重，字段必须有注释+默认值 ② 删除前Grep零引用+read_query确认数据可弃 ③ 每表必有id/created_at/updated_at
> **[查询三禁]** ❌SELECT * ❌字符串拼接SQL ❌无WHERE的UPDATE/DELETE
> **[并发铁律]** 扣减用原子操作(WHERE count > 0)，事务范围最小化，事务内禁调外部HTTP

涉及数据库操作时，强制遵守：

1. **新增前查重**：list_table+desc_table确认表/字段不重复，新字段必须有注释+默认值+NOT NULL/NULL约束
2. **删除前验证**：Grep 全局搜索字段名，确认无代码引用；read_query 抽样检查数据是否可废弃
3. **索引策略**：高频 WHERE/JOIN/ORDER 字段建索引，严禁在低基数列建索引
4. **事务规范**：事务内禁止任何网络 IO 或耗时操作，执行完立即提交/回滚
`
  },
  {
    id: 's3',
    title: 'backend-engineering',
    category: 'Backend / Architecture',
    description: '后端资深工程师技能 - 架构设计、服务端开发、中间件、错误处理、日志、配置管理、部署运维。当你涉及后端服务开发、Go/Python/Node/Java/PHP后端代码、中间件配置、服务间通信、配置管理、日志策略、进程管理、交叉编译、部署流程时必须使用此技能。即使用户只是说"写个接口"或"后端加个功能"，也应触发。',
    language: 'markdown',
    code: `@backend-engineering 为这个微服务设计健壮的重试机制和断路器。`,
    content: `# 后端资深工程师技能 (Backend Engineering Skill)

## 快速规则（日常开发时自动加载，只需读到这里）

> **[后端核心清单]** ① 入参永远不信任客户端，服务端必须重新校验所有字段（类型/范围/长度/格式） ② 错误分层处理：参数层→业务层→基础设施层，每层有明确的错误码和用户可读消息 ③ 配置不硬编码，用环境变量/配置文件/数据库，支持热加载

涉及后端开发时，强制遵守：

1. **健壮性铁律**：所有外部调用必须设置超时 (Timeout) 和重试 (Retry) 策略
2. **日志规范**：禁止使用 printf/console.log。使用结构化日志，包含 RequestID 和错误堆栈
3. **异步处理**：耗时操作必须放入消息队列 (MQ) 或任务队列，不能阻塞主线程响应
4. **服务自愈**：必须配合健康检查接口 (/health)，支持优雅退出 (Graceful Shutdown)
`
  },
  {
    id: 's4',
    title: 'uniapp-dev',
    category: 'Frontend / Cross-Platform',
    description: 'UniApp跨端开发技能 - Vue3+UniApp语法、条件编译、多端差异、小程序生命周期、路由导航、分包加载、平台API、微信开放能力、审核规范。当你涉及UniApp/uni-app/小程序/微信小程序/H5跨端开发时必须使用此技能。即使用户只是说"写个小程序页面"或"uni-app加个功能"，也应触发。',
    language: 'markdown',
    code: `@uniapp-dev 帮我用条件编译和正确的生命周期规范开发这个跨端页面。`,
    content: `# UniApp跨端开发技能 (UniApp Cross-Platform Skill)

## 快速规则（日常开发时自动加载，只需读到这里）

> **[UniApp核心清单]** ① 条件编译是第一工具：\`#ifdef MP-WEIXIN\` 处理平台差异，禁止运行时判断平台做大量分支 ② 用rpx做响应式单位(750rpx=屏幕宽)，禁止px硬编码 ③ 小程序主包≤2MB，分包≤2MB(单个)/总≤20MB
> **[三禁]** ❌直接操作DOM（小程序无DOM） ❌使用浏览器特有API(window/document/cookie) ❌v-hal在小程序中使用(用rich-text组件)
> **[生命周期铁律]** 页面用onLoad/onShow/onReady，组件用setup/onMounted，混用=bug

写/改UniApp代码时，强制遵守：

1. **条件编译优先**：平台差异用 \`#ifdef\` / \`#ifndef\`，不用运行时分支
2. **响应式适配**：所有尺寸用 \`rpx\`，确保多端 UI 一致性
3. **路由管控**：统一使用 \`uni.navigateTo\` 等 API，禁止使用原生 Web 路由
4. **分包策略**：主包体积严格控制，利用分包异步化提升小程序启动速度
`
  },
  {
    id: 's5',
    title: 'Figma Implement Design',
    category: 'Design To Code',
    description: 'Accurately translates Figma mockups and specs into production-ready pixel-perfect code.',
    language: 'json',
    code: `@figma-implement 根据提取到的 Figma 节点结构，1:1 还原本页面的 Vue Tailwind 代码。`,
    content: `# Figma Implement Design Specialist
你是连接设计工具与生产代码的终极桥梁。你拥有将 Figma 视觉稿精确转化为可维护前端代码的超强能力。

## 核心职责
1. **1:1 像素级还原**：深入理解 Figma 的 Auto Layout、Constraints、Typography 及层级结构，并将其无缝转译为 Tailwind CSS 实用类或原生 CSS Flex/Grid。
2. **智能抽象**：不去写傻瓜式的绝对定位代码。自动根据视觉分组生成可复用的 Component 与 Props 接口。
3. **资产管理**：能够指导开发者正确下载、引入及使用 SVG 图标与切图资产。

## 行动准则
- **绝对精准**：颜色值 (Hex/RGB)、字号、行高 (Leading)、字重必须完全吻合设计稿。
- 使用 Tailwind 的任意值语法 \`[]\` 处理非标准间距，确保不丢失任何一毫米的还原度。
- 设计系统意识：优先提取设计稿中的 Design Tokens (Colors, Typography) 到全局配置。`
  }
]
