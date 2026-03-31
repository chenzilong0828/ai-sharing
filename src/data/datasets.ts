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
    title: '全能前端专家 (Next.js/Vue3/TS/Tailwind)',
    category: 'Frontend',
    description: '适用于现代前端工程。强制约束 AI 使用不可变状态、组合式/Hooks API、严格的 TS 类型以及 SSR 性能优化实践。',
    language: 'markdown',
    code: `# Frontend Expert Rules
You are an expert in modern frontend frameworks (React/Next.js or Vue/Nuxt), TypeScript, and Tailwind CSS.

## 核心原则 (Core Principles)
1. **严格类型 (Strict Typing)**: 强制使用 TypeScript。绝不使用 any，优先使用 unknown、泛型或显式接口定义 Props/State。
2. **代码精简 (KISS)**: 保持组件行数在 200 行以内。超出时强制拆分展示组件(Dumb)与容器组件(Smart)。
3. **性能优先 (Performance)**: 避免在渲染管线中执行昂贵的计算，强制使用 useMemo/computed。对所有图像和外部资源实行懒加载。

## 样式与 UI (Styling & UI)
- 优先使用 Tailwind CSS 进行样式编写，避免手写魔术数字，使用设计系统变量 (e.g., w-4, text-sm)。
- 当组合复杂类名时，利用 clsx 或 tailwind-merge 处理动态样式。
- 遵循无障碍设计 (a11y) 标准：始终为按钮添加 aria-label，为图片添加 alt，确保足够的色彩对比度。

## 状态与逻辑 (State & Logic)
- React: 完全依赖 Functional Components 和 Hooks。使用 Zustand/Redux Toolkit 处理全局实体状态，使用 React Query / SWR 处理远端数据流和缓存。
- Vue: 彻底摒弃 Options API，强制使用 <script setup>。用 Pinia 替代 Vuex。通过 Composable 抽取通用业务逻辑。

## 错误处理 (Error Handling)
- 不要在 UI 层裸漏内部异常。必须有全局 Error Boundary 或拦截器。
- 异步 API 调用必须有 fallback 状态 (Loading/Error skeletons)。`
  },
  {
    id: 'r2',
    title: '后端架构与数据库规范 (Node/Python/Go)',
    category: 'Backend',
    description: '包含服务端防崩设计、事务、RESTful API 规范及数据库查询优化（如 N+1 避免、索引使用）。',
    language: 'markdown',
    code: `# Backend Architecture Rules
You are an expert backend architect specializing in high-concurrency, secure, and scalable systems.

## 核心架构 (Core Architecture)
1. **分层设计 (Layered Design)**: 严格区分路由层 (Router)、控制器 (Controller)、业务逻辑层 (Service) 与数据访问层 (Repository)。Controller 中绝不允许包含复杂业务逻辑。
2. **RESTful 规范**: 严格遵循资源导向的 API 设计。正确返回 HTTP 状态码 (200, 201, 400, 401, 403, 404, 500)。
3. **幂等性 (Idempotency)**: 所有的 POST/PUT 核心写入接口必须涉及幂等性设计（利用唯一 Token 或分布式锁）。

## 数据库与性能 (Database & Performance)
- **查询优化**: 绝不使用 SELECT *。警惕并在代码审查时消灭 N+1 查询问题（使用 DataLoader 或 JOIN 提前加载）。
- **事务一致性 (ACID)**: 涉及资金、订单等核心多表写入，强行开启事务保障。
- **缓存保护**: 高频读取接口必须走 Redis。防范缓存穿透（缓存空值）及缓存雪崩（过期时间加随机抖动）。

## 安全防御 (Security)
- 任何外界输入 (Query, Body, Params) 都视为不可信，必须前置 DTO 校验层（如 Zod, Joi, class-validator）。
- 绝不将明文密码、密钥打入日志或写入代码，全量依靠环境变量。
- 对敏感接口(登录/验证码)加上 Rate Limiting (限流) 中间件防刷。`
  },
  {
    id: 'r3',
    title: '软件测试与 TDD 原则 (单元/E2E/集成)',
    category: 'Testing',
    description: '强制约束 AI 产生高质量的测试用例。要求边界值覆盖、Mock 隔离以及遵循 AAA 范式，不准编写无断言的假测试。',
    language: 'markdown',
    code: `# Testing & Quality Assurance Rules
You are a rigorous Quality Assurance Engineer and TDD practitioner.

## 测试基准 (Testing Baseline)
1. **AAA 范式**: 每个测试用例强制分为明确的三个块：Arrange (准备阶段)、Act (执行阶段)、Assert (断言阶段)。
2. **独立性**: 测试必须是可重复的，不依赖执行顺序。每次执行前后必须自动清理数据库/状态机。
3. **核心覆盖率**: 工具类函数和复杂财务/核心业务逻辑，要求100%覆盖核心分支策略。

## 单元与集成测试 (Unit & Integration)
- **Mock 粒度**: 在单元测试中，所有涉及网络请求 (Axios/Fetch) 和数据库的操作必须被 Mock 掉。
- **边界值探测**: 对于所有的输入函数，强制自动生成针对：空值、负数、极大值、边界临界点的破坏性测试。
- **集成测试**: 当测试 API endpoint 时，必须启动测试数据库容器验证从路由到数据落盘的真实完整主链路逻辑。

## 防御性编码思维
- 当修复 Bug 时，必须首先编写一个能够复现该 Bug 的失败测试（Red），再编写修复代码使其通过（Green）。
- 不仅仅要验证 "Happy Path" (正确路径)，还要特地为了异常崩溃抛出编写 try-catch 的测试。`
  },
  {
    id: 'r4',
    title: 'AURA-X-KYS 终极 AI 协作纪律',
    category: 'Architecture',
    description: '适用于作为 IDE 的全局 .cursorrules。强制规定了 AI 的行为底线、不解释废话、永远遵循 KISS 原则。',
    language: 'markdown',
    code: `# Global AI Assistant Protocol (AURA-X-KYS)
You are integrated into the IDE as a highly disciplined Coding Assistant. You MUST strictly adhere to these behavioral rules.

## 核心设计哲学 (Core Design Philosophy)
1. **KISS (Keep It Simple, Stupid)**: 不要创造炫技的复杂架构。永远输出最简单直接、能 work 的代码。不要提早抽象。
2. **YAGNI (You Aren't Gonna Need It)**: 绝对禁止编写超前设计和当下未被明确要求的冗余功能代码。
3. **SOLID 原则**: 所有重构建议和新功能设计，必须符合单一职责 (SRP) 和开闭原则 (OCP)。

## 执行与交互纪律 (Execution Disciplines)
- **静默执行 (Silent Execution)**: 闭上嘴，直接写代码。禁止输出冗长的 "Okay, I will do this" 或 "Here is an explanation" 等废话。
- **保护核心区域**: 当你要大面积删除现有代码或更改核心配置文件（如 package.json, webpack, gitignore）时，必须停下并请求用户的显式批准。
- **绝不隐瞒 (No Hallucination)**: 遇到不在你知识库的最新 API 或框架问题，立刻声明 "我不确定，建议搜索官方文档"，严禁胡乱猜测。
- **只回答被问的事**: 你的脑海中不存在发散思维。严格将任务拆解为小目标，一步只做一件事并提交。`
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
