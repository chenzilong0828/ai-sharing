<script setup lang="ts">
/**
 * 项目成果展示区 - 暗色透明卡片风格
 */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const projects = [
  {
    title: 'AI 驱动的组件生成器',
    description: '用自然语言描述需求，自动生成 Vue 3 组件代码。集成 Claude API，支持实时预览和迭代优化。',
    tech: ['Vue 3', 'Claude API', 'Monaco Editor'],
    icon: '🎨',
    metrics: { lines: '5,000+', time: '2周', efficiency: '15x' },
    code: `// AI 一句话生成组件\nconst component = await ai.generate({\n  prompt: "创建一个带搜索的数据表格",\n  framework: "vue3",\n  style: "tailwind"\n})`,
  },
  {
    title: 'Prompt 工程最佳实践',
    description: '系统总结了 50+ 种高效 Prompt 模式，建立内部 Prompt 模板库，显著提升团队 AI 协作效率。',
    tech: ['Prompt Engineering', 'RAG', 'LangChain'],
    icon: '💡',
    metrics: { lines: '200+模板', time: '1个月', efficiency: '3x' },
    code: `// 结构化 Prompt 模板\nconst prompt = buildPrompt({\n  role: "senior frontend developer",\n  context: projectContext,\n  task: "重构为 Composition API",\n  constraints: ["TypeScript", "SOLID"]\n})`,
  },
  {
    title: 'AI Code Review 流水线',
    description: '将 AI 集成到 CI/CD 流程中，自动进行代码审查、安全扫描、性能建议，MR 审核效率提升 80%。',
    tech: ['GitLab CI', 'GPT-4', 'ESLint'],
    icon: '🔍',
    metrics: { lines: '3,000+', time: '3周', efficiency: '10x' },
    code: `// GitLab CI 集成 AI Review\nstages:\n  - ai-review\n\nai_code_review:\n  script:\n    - ai-reviewer analyze\n    - ai-reviewer security-scan`,
  },
  {
    title: '智能调试助手',
    description: '开发 VS Code 插件，集成 AI 能力实现智能错误诊断、自动修复建议、根因分析。',
    tech: ['VS Code API', 'TypeScript', 'Claude'],
    icon: '🛠️',
    metrics: { lines: '8,000+', time: '1个月', efficiency: '5x' },
    code: `// 智能错误诊断\nconst diagnosis = await debugHelper({\n  error: catchedError,\n  stackTrace: error.stack,\n  context: getFileContext()\n})\n// AI: "该错误由异步竞态导致..."`,
  },
  {
    title: 'AI 辅助测试生成',
    description: '基于源代码自动生成单元测试和 E2E 测试用例，测试覆盖率从 40% 提升至 92%。',
    tech: ['Vitest', 'Playwright', 'AI Testing'],
    icon: '🧪',
    metrics: { lines: '10,000+', time: '2周', efficiency: '8x' },
    code: `// AI 自动生成测试用例\nconst tests = await generateTests({\n  sourceFile: "UserService.ts",\n  coverage: "branch",\n  style: "vitest",\n  includeEdgeCases: true\n})`,
  },
  {
    title: '自然语言数据库查询',
    description: '实现自然语言转 SQL 引擎，让非技术人员也能通过自然语言查询业务数据。',
    tech: ['NL2SQL', 'GPT-4', 'PostgreSQL'],
    icon: '🗄️',
    metrics: { lines: '6,000+', time: '3周', efficiency: '20x' },
    code: `// 自然语言查询\nconst result = await nl2sql({\n  query: "上个月销售额最高的前10个产品",\n  database: "production",\n  validate: true\n})`,
  },
]

const flippedCards = ref<Set<number>>(new Set())
const toggleCard = (index: number) => {
  if (flippedCards.value.has(index)) {
    flippedCards.value.delete(index)
  } else {
    flippedCards.value.add(index)
  }
}
</script>

<template>
  <section id="showcase" ref="sectionRef" class="relative py-32 px-6">
    <!-- 区域标题 -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">
        实战项目成果
      </h2>
      <p class="text-white/30 text-base max-w-xl mx-auto">
        每个项目都经过实际落地验证，点击卡片查看代码示例
      </p>
    </div>

    <!-- 项目卡片 -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="(project, index) in projects"
        :key="project.title"
        class="perspective-1000 h-[360px]"
        :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
        :style="{ transitionDelay: `${index * 100}ms`, transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }"
      >
        <div
          class="relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer"
          :class="{ 'rotate-y-180': flippedCards.has(index) }"
          @click="toggleCard(index)"
        >
          <!-- 正面 -->
          <div class="absolute inset-0 backface-hidden">
            <div class="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] p-6 h-full flex flex-col hover:border-white/15 hover:bg-black/50 transition-all duration-300">
              <div class="flex items-center justify-between mb-4">
                <span class="text-3xl">{{ project.icon }}</span>
                <span class="text-[10px] text-white/20 font-['JetBrains_Mono']">CLICK TO FLIP →</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">{{ project.title }}</h3>
              <p class="text-white/40 text-sm mb-4 flex-1 leading-relaxed">{{ project.description }}</p>
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="text-center">
                  <div class="text-sm font-bold text-[#00f0ff]" style="font-family: 'Orbitron', sans-serif">{{ project.metrics.lines }}</div>
                  <div class="text-[9px] text-white/25">代码量</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-[#b026ff]" style="font-family: 'Orbitron', sans-serif">{{ project.metrics.time }}</div>
                  <div class="text-[9px] text-white/25">开发周期</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-[#39ff14]" style="font-family: 'Orbitron', sans-serif">{{ project.metrics.efficiency }}</div>
                  <div class="text-[9px] text-white/25">效率提升</div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.tech" :key="tech" class="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 font-['JetBrains_Mono']">{{ tech }}</span>
              </div>
            </div>
          </div>
          <!-- 背面 -->
          <div class="absolute inset-0 rotate-y-180 backface-hidden">
            <div class="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/[0.06] p-6 h-full flex flex-col">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span class="ml-2 text-[10px] text-white/20 font-['JetBrains_Mono']">{{ project.title }}.ts</span>
                <span class="ml-auto text-[10px] text-white/20">← BACK</span>
              </div>
              <pre class="flex-1 text-xs font-['JetBrains_Mono'] text-white/50 leading-relaxed overflow-auto"><code>{{ project.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
</style>
