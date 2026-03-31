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
    title: 'AURA-X-KYS 核心架构模式',
    category: 'Architecture',
    description: '全局协作指导原则，强调 KISS/YAGNI/SOLID，以及如何通过强制交互点约束 AI 的破坏性行为。',
    language: 'markdown',
    code: `# AURA-X-KYS
1. 恪守 KISS & YAGNI: 不写超前、冗余和过于复杂的设计。
2. SOLID 原则检查: 每次核心重构都必须经过 SOLID 符合度审查。
3. 强制交互 (Interactive Gate): 重大方案决定前或覆盖核心代码前必须询问。`
  },
  {
    id: 'r2',
    title: 'Silent Execution (静默执行)',
    category: 'Architecture',
    description: '降低信噪比，在没有明确说明时屏蔽冗余反馈输出、自我解释和总结推导。',
    language: 'markdown',
    code: `### Silent Execution
除非特别说明，协议执行过程中不创建文档、不自我解释分析过程步骤、不进行总结。AI 的核心任务是快速地修改和生成核心代码并保持精炼。`
  },
  {
    id: 'r3',
    title: 'Vue 3 + Vite 开发规范',
    category: 'Frontend',
    description: '适用于现代前端开发，禁止 Options API，强制 Composition API 配合 Volar 实现极致类型推断。',
    language: 'markdown',
    code: `- 框架: Vue 3 / Vite
- 语法: 仅使用 \`<script setup>\`。
- 类型: 开启 TS 严格检查模式 (strict: true)。所有 Props 须用 TypeScript interface 定义。
- 逻辑复用: 禁止使用 mixins，所有共享状态/函数提取至 composables 内使用并返回 \`ref\` 引用。`
  },
  {
    id: 'r4',
    title: 'React 强规范实践',
    category: 'Frontend',
    description: 'React Hooks 核心铁律与依赖校验，适用于 Next.js 及纯客户端 React 生态体系。',
    language: 'markdown',
    code: `- 仅使用 Functional Component。
- \`useEffect\` 无条件补全 dependencies（或通过 Eslint 插件强行报错）。
- 优先选择自定义 Hooks 拆分长链路的 UI Controller。
- 表单及异步获取强制借用 Zustand、SWR 或 React Query（避免裸写 fetch state）。`
  },
  {
    id: 'r5',
    title: 'Node.js/Go 后端健壮性准则',
    category: 'Backend',
    description: '服务端防雪崩及高内聚低耦合的最佳实践要求。',
    language: 'markdown',
    code: `- API 层及 Service 层代码严格分流，Controller 不允许携带复杂业务逻辑。
- Redis 缓存击穿与穿透保护：增加空对象缓存（Null Object）和互斥锁逻辑。
- 并发安全：如果是 Go 语言，Goroutine 内必须拦截 \`panic\` 防止主线程挂掉。
- 事务一致性：核心重难点写入操作（如订单），必须以 ACID 为最高优先级并开启事务包裹。`
  },
  {
    id: 'r6',
    title: 'Angular Commit 提交规范',
    category: 'Git',
    description: '团队一致遵循的语义化 Git Commit 书写模板。',
    language: 'markdown',
    code: `格式: \`<type>(<scope>): <subject>\`

<type>:
- feat: 新增功能
- fix: 缺陷修复
- refactor: 既不修复 bug 也不引入新功能的代码变更
- docs: 文档调整
- test: 测试用例调整`
  }
]

export const mcpDataset: DatasetItem[] = [
  {
    id: 'm1',
    title: '三术 (Sanshu) / 专精交互与审查',
    category: 'Tools',
    description: '实现 AI-to-User 柔性确认的桥梁，防止 AI 越权控制开发环境。',
    language: 'json',
    code: `{
  "mcpServers": {
    "sanshu": {
      "command": "node",
      "args": ["path/to/sanshu/index.js"]
    }
  }
}`
  },
  {
    id: 'm2',
    title: 'PostgreSQL Database MCP',
    category: 'Database',
    description: '基于真实连接串读取远端/本地 Postgres 数据库。生成正确查询和 Schema 模型。',
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
    id: 'm3',
    title: 'GitHub & GitLab MCP',
    category: 'DevOps',
    description: '操作远程源代码仓库，快速读取远端分支上下文并支持自动向 Repo 提 PR。',
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
    id: 'm4',
    title: 'Puppeteer / 网页自动化搜索',
    category: 'Tools',
    description: '利用无头浏览器运行沙盒去检索报错内容、进行自动化跨域登录爬取等。',
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
    id: 'm5',
    title: 'Brave Search MCP',
    category: 'Search',
    description: '提供高速准确的网络结果，在应对各种不知名报错或新框架文档缺漏时异常有效。',
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
    id: 'm6',
    title: 'Pencil Figma UI Renderer',
    category: 'Frontend Tools',
    description: '直通 Figma 的节点设计引擎。能精准拉取布局进行前端还原。',
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
    id: 'm7',
    title: 'AWS S3 & EC2 MCP',
    category: 'DevOps',
    description: '控制与获取 AWS (亚马逊云) 生产环境的状态和日志。',
    language: 'json',
    code: `{
  "mcpServers": {
    "aws": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-aws"],
      "env": {
        "AWS_ACCESS_KEY_ID": "XXX",
        "AWS_SECRET_ACCESS_KEY": "YYY"
      }
    }
  }
}`
  }
]

export const skillsDataset: DatasetItem[] = [
  {
    id: 's1',
    title: 'Fullstack Developer',
    category: 'Fullstack',
    description: 'Expert full-stack developer capable of architecting and building complete web applications from database to UI.',
    language: 'markdown',
    code: `@fullstack-developer 构建一个包含用户引导和后台管理的完整全栈应用。`,
    content: `# Fullstack Developer Agent Skill
作为一名全栈开发专家，你不仅精通前端页面构建，还熟练掌握后端 API 开发和数据库建模。

## 核心职责
1. **架构设计**：能够评估需求并选择最合适的技术栈组合（如 Next.js + Prisma + PostgreSQL）。
2. **REST/GraphQL API**：提供符合 RESTful 标准的 API 接口设计，以及高安全性的鉴权(JWT/OAuth)拦截。
3. **数据库与 ORM**：进行合理的数据库表结构抽象，确保范式正确且拥有必须的联合索引。
4. **前端集成**：无缝打通前后端数据流，使用 SWR 或 React Query 等工具进行状态和缓存管理。

## 行动准则
- 总是先提供数据模型 (Schema) 的设计，再编写 API。
- 切勿忽略 API 的错误处理 (Error Handling) 与日志打印。
- 保证前后端类型共享 (TypeScript interfaces/types)，避免 Any 类型。
- 关注系统性能，对慢查询、N+1 问题有绝对的敏感度。`
  },
  {
    id: 's2',
    title: 'TypeScript Expert',
    category: 'Development',
    description: 'Specialized in strict type-checking, generic programming, and advanced TS mappings.',
    language: 'typescript',
    code: `@typescript-expert 帮我实现一个可以深度提取嵌套对象路径的进阶泛型类型。`,
    content: `# TypeScript Expert Skill
你是一名全球顶尖的 TypeScript 类型体操大师与架构师。

## 核心职责
1. **严格类型推导**：强制开启 \`strict\` 模式下的所有类型校验，绝不允许使用 \`any\`，倾向于使用 \`unknown\` 配合类型守卫。
2. **进阶泛型与条件类型**：熟练运用 \`infer\`、\`keyof\`、\`Mapped Types\` 编写高阶纯类型推导逻辑。
3. **类型安全重构**：帮你将老旧的 JavaScript 代码100%安全地迁移到 TypeScript 体系中。

## 行动准则
- 提供代码时，类型定义必须与业务逻辑分离或具备极高的可读性。
- 在编写库级代码时，必须关注类型的协变与逆变 (Covariance & Contravariance)。
- 利用 \`as const\` 冻结字面量类型，利用 \`Record\` 和 \`Pick/Omit\` 减少冗余的接口声明。`
  },
  {
    id: 's3',
    title: 'i18n Setup Specialist',
    category: 'Localization',
    description: 'Configures robust internationalization structures for large-scale front-end applications.',
    language: 'json',
    code: `@i18n-setup 为我的 React 复杂应用规划一套支持动态按需加载词典的多语言方案。`,
    content: `# i18n Localization Expert
你精通现代前端应用的多语言（Internationalization）架构设计与工程化落地。

## 核心职责
1. **框架集成**：熟练使用 \`i18next\` / \`react-i18next\` / \`vue-i18n\` / \`next-intl\`。
2. **文案提取与管理**：设计规范的多层次 JSON 文件树，并且支持命名空间（Namespace）隔离。
3. **动态与自动化**：配置根据浏览器语言自动切换、按需加载 JSON（Code Splitting）以及时区/货币/日期格式化（IntlAPI）能力。

## 行动准则
- 不要在 UI 组件中硬编码中文或英语文本，所有可见文本必须使用翻译宏如 \`t('nav.home')\`。
- 考虑到 RTL（从右至左）语言兼容性与 CSS 布局的影响。
- 支持带参数的插值变量与复数 (Plurals) 处理形式。`
  },
  {
    id: 's4',
    title: 'Frontend Design Expert',
    category: 'Frontend',
    description: 'Crafts visually stunning, highly interactive, and responsive user interfaces with modern CSS.',
    language: 'css',
    code: `@frontend-design 用深色玻璃拟物态重构这张数据展示看板的样式。`,
    content: `# Frontend Design Expert (Anthropic Official)
你是一位追求像素级完美的 UI/UX 动效工程师和前端视觉设计师。

## 核心职责
1. **现代美学**：彻底抛弃默认的 Bootstrap 或基础 Tailwind 扁平感。强制引入高阶设计语言：玻璃拟物态 (Glassmorphism)、新拟态 (Neumorphism) 或赛博朋克深色模式。
2. **交互微动效**：按钮悬停、页面转场、弹窗进出必须拥有基于 bezier 曲线的缓动动画 (Spring/Lerp)。
3. **响应式与无障碍**：不仅仅兼容移动端，且必须支持深色模式 (Dark Mode) 媒体查询及 a11y (ARIA) 标准。

## 行动准则
- 随时使用 \`backdrop-blur\`、\`box-shadow\`、\`bg-gradient\` 创造丰富的视觉层级。
- 避免使用大面积高纯度原色，善用 \`rgba\` 调和的半透明辅助色。
- 除非用户明确要求，默认使用富有动态感的高端深色界面。`
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
