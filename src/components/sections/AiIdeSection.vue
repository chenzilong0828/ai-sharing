<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

interface AiIde {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  themeColor: string
  icon: string
  href?: string
}

const ides: AiIde[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: '业界主流的 AI IDE，基于 VS Code 构建，体验平滑，开箱即用。',
    pros: ['多文件上下文理解能力强 (Composer)', '支持自定义 .cursorrules 规约', '完全兼容 VS Code 插件生态'],
    cons: ['核心功能依赖订阅付费 (Pro)', '强依赖云端推理，对隐私高度敏感项目需注意'],
    themeColor: 'from-blue-500/20 to-blue-900/10 border-blue-500/30',
    icon: `<img src="https://th.bing.com/th/id/ODF.kTG-_hIIG6V3DEu1dDQGdg?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Cursor Logo" class="w-full h-full object-contain drop-shadow-lg" />`,
    href: 'https://docs.cursor.ac.cn/get-started/welcome'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'Codeium 出品的 AI IDE，主打代码快速生成与深层上下文分析。',
    pros: ['Cascade 引擎驱动的实时 Agent 流', '对开发者“心流”状态的捕捉非常精准', '基础补全和搜索性能优异'],
    cons: ['品牌整合期（被 Devin 团队收购）', '插件生态稳定性与 VS Code 仍有细微差异'],
    themeColor: 'from-cyan-500/20 to-teal-900/10 border-cyan-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.6EhekcoQt58d76Y3DAJRFQ?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" alt="Windsurf Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://codeium.com/windsurf'
  },
  {
    id: 'trae',
    name: 'Trae',
    description: '字节跳动推出的 AI 编码工具，在国内网络环境下稳定性好。',
    pros: ['支持 Builder 模式 (Agentic Planning)', '具备设计稿直转代码功能 (SVG/Img)', '国内网络优化，目前完全免费'],
    cons: ['隐私背景引发部分地区用户关注', '产品处于中早期阶段，极细部打磨略欠'],
    themeColor: 'from-indigo-500/20 to-purple-900/10 border-indigo-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.YIp5-bd6aV_n2t3WPPiW7w?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Trae Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://www.trae.ai/'
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    description: '由深度大模型驱动的原生智能体工具 (Agentic Coding)，具备强大的自动化探索能力。',
    pros: ['支持终端、文件读写及浏览器完全闭环', '具备高度的逻辑自洽和多步规划能力', '零摩擦的指令执行体验'],
    cons: ['复杂长链条推理耗时较长', '用户需适应 AI 的高度自主性决策模式'],
    themeColor: 'from-emerald-500/20 to-green-900/10 border-emerald-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.LTJ4UWtPwq1QbgrMxsZ5qA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" alt="Antigravity Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://deepmind.google/technologies/gemini/'
  },
  {
    id: 'void',
    name: 'Void',
    description: '主打隐私优先的开源编辑器，适合需要本地部署 LLM 的场景。',
    pros: ['通过本地模型 (Ollama) 实现极致隐私', '完全开源，用户可透视并调整 AI 提示词', '支持直连多种 AI 供应商 (BYOK)'],
    cons: ['配置选项复杂，上手门槛较高', '性能受本地硬件限制，无缝度不及商业版'],
    themeColor: 'from-zinc-500/20 to-gray-900/10 border-zinc-500/30',
    icon: '<img src="https://voideditor.com/void/logo_cube_noshadow.png" alt="Void Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://voideditor.com/'
  },
  {
    id: 'warp',
    name: 'Warp',
    description: '结合现代交互和 AI 辅助的智能化终端开发工具。',
    pros: ['块状 (Block) 输出极大优化命令阅读体验', 'AI 命令辅助生成极其灵敏且准确', 'Rust 编写，极端响应速度'],
    cons: ['强制要求登录，部分隐私敏感用户有顾虑', '仅限终端范畴，不可作为 IDE 替代品'],
    themeColor: 'from-orange-500/20 to-red-900/10 border-orange-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.o7PqMmfhkvgGgIhlekG3yQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Warp Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://docs.warp.dev/'
  },
  {
    id: 'kiro',
    name: 'Kiro',
    description: '灵活度很高的探索化 AI 辅助集成环境。',
    pros: ['Spec-Driven 开发，强制“先规划后编码”', '多代理并发协助，覆盖测试与文档'],
    cons: ['学习曲线极陡，要求较强的架构规约意识', '社区生态相比 VS Code 系较弱'],
    themeColor: 'from-pink-500/20 to-rose-900/10 border-pink-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.zDTT7_I5Se-Xx-pddVf_lQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Kiro Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://kiro.dev/docs'
  },
  {
    id: 'opencode',
    name: 'openCode',
    description: '致力于开源与开放生态链路的 AI 打包工具集。',
    pros: ['Go 编写的 CLI/TUI，极致的速度与性能', '模型无关性，通过接口轻松扩展生态', '降低单一核心供应商锁定风险'],
    cons: ['纯终端/TUI 操作，缺乏图形化直观性', '对零配置、追求开箱即用的用户成本较高'],
    themeColor: 'from-fuchsia-500/20 to-purple-900/10 border-fuchsia-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.b79p6WW7zIomJakbm-Jvcw?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="openCode Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://opencode.ai/docs'
  }
]
</script>

<template>
  <section id="ides" ref="sectionRef" class="relative py-32 px-6 min-h-screen z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16" :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-12': !isVisible }" style="transition: all 1s ease 0.1s;">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          00 // Overview 开发工具
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">核心开发工具全览</h2>
        <p class="text-white/40 text-base max-w-2xl mx-auto">
          全面剖析当前主流的 AI 辅助编程生态平台，帮助团队根据实际需要选用最合适的开发环境。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <component 
          :is="ide.href ? 'a' : 'div'"
          :href="ide.href"
          :target="ide.href ? '_blank' : undefined"
          :rel="ide.href ? 'noopener noreferrer' : undefined"
          v-for="(ide, index) in ides" 
          :key="ide.id"
          class="group animated-border-card rounded-2xl flex flex-col h-full bg-[#0a0a0f] border border-white/[0.06] hover:border-transparent transition-all duration-500 relative overflow-hidden"
          :class="['opacity-0 translate-y-12', isVisible ? 'opacity-100 translate-y-0' : '', ide.themeColor, ide.href ? 'cursor-pointer hover:shadow-2xl hover:shadow-[var(--tw-shadow-color)]' : '']"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- 内层 Mask 盖住动画发光层，仅留出 1px 发光缝隙 -->
          <div class="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-[#0a0a0f]/90 backdrop-blur-3xl z-0 transition-colors pointer-events-none"></div>

          <!-- Glow Overlay -->
          <div class="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-0" :class="ide.themeColor"></div>
          
          <div class="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <!-- 图片专属的透明背景去边框容器 -->
              <div class="w-9 h-9 flex items-center justify-center text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500" v-html="ide.icon"></div>
              <h3 class="text-2xl font-bold text-white tracking-tight" style="font-family: 'Rajdhani', sans-serif">{{ ide.name }}</h3>
            </div>
            <span class="text-[10px] font-mono border border-white/20 text-white/50 px-2 flex justify-center items-center py-1 rounded-full group-hover:text-white group-hover:border-white/50 transition-colors">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          
          <div class="p-6 flex-1 flex flex-col relative z-10">
            <p class="text-white/60 text-sm leading-relaxed mb-8 flex-1">
              {{ ide.description }}
            </p>

            <div class="space-y-6">
              <!-- Pros -->
              <div>
                <h4 class="text-xs font-mono text-emerald-400 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  核心优势 (Pros)
                </h4>
                <ul class="space-y-2">
                  <li v-for="pro in ide.pros" :key="pro" class="text-white/80 text-xs flex items-start pl-2">
                    <span class="mr-2 mt-1 text-emerald-500/50 block">•</span>
                    <span class="leading-relaxed">{{ pro }}</span>
                  </li>
                </ul>
              </div>

              <!-- Cons -->
              <div>
                <h4 class="text-xs font-mono text-rose-400 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  局限性 (Cons)
                </h4>
                <ul class="space-y-2">
                  <li v-for="con in ide.cons" :key="con" class="text-white/60 text-xs flex items-start pl-2">
                    <span class="mr-2 mt-1 text-rose-500/50 block">•</span>
                    <span class="leading-relaxed">{{ con }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes border-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.animated-border-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250%;
  height: 250%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 60%,
    #ec4899 75%, /* pink */
    #a855f7 85%, /* purple */
    #3b82f6 95%, /* blue */
    #10b981 100% /* emerald */
  );
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  z-index: 0;
}

.animated-border-card:hover::before {
  opacity: 1;
  animation: border-spin 4s linear infinite;
}
</style>
