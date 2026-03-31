<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const paradigmShifts = [
  {
    title: '传统信息化开发',
    role: 'Code Writer',
    desc: '精确控制每一行代码，深度理解实现细节。',
    flow: '我写代码 → 编译 → 测试',
    active: false
  },
  {
    title: 'AI原生开发 (VibeCoding)',
    role: 'Code Reviewer + Architect',
    desc: '高层次控制架构和逻辑，理解如何引导AI和验证结果。',
    flow: '我描述需求 → AI生成 → 我审查',
    active: true
  }
]

const practices = [
  { id: '01', title: '系统提示词', desc: '规范的守护者。在 .cursorrules 中约束风格、技术栈和异常处理。' },
  { id: '02', title: '方案先行', desc: 'Ask/Plan 模式。先讨论理清表结构、接口链路，方案确认后再 Generate。' },
  { id: '03', title: '笔记驱动', desc: 'AI 的外部大脑。将讨论结果固化为 docs.md 随时 @ 引用，对抗失忆。' },
  { id: '04', title: '严格审查', desc: 'Accept 前必看。杜绝思维惰性，统一审查 diff，把控安全与逻辑。' },
  { id: '05', title: '垂直切分', desc: '小步快跑。按功能链路 (Controller->Service->Mapper) 拆解，保证连贯。' },
  { id: '06', title: '抽卡思维', desc: '错了就回退。不要在错乱代码上叠补丁，回退代码并调整 Prompt 重新生成。' },
  { id: '07', title: '频繁存档', desc: 'Git 即时存档。AI 生成质量不错立刻 commit，留存安全伞，保证随时能倒带。' },
  { id: '08', title: '测试驱动', desc: '自动验证。要求开发完接口立即生成单测并执行，机器防线对抗错漏。' },
  { id: '09', title: '文档先行', desc: '对抗幻觉。面对新库时，使用 MCP 抓取文档或强制 AI 阅读官方手册。' },
  { id: '10', title: '模型切分', desc: '术业有专攻。排错查源切 GPT-4o / GPT-5，写复杂 UI 和框架切 Claude 3.5。' }
]

const goldenRules = [
  'AI生成的代码仅为初稿，绝非最终成品',
  '人类永远是系统架构的设计者与安全质量的把关人',
  '让AI处理重复繁琐的执行，让人类专注于创造性与系统思维',
  '时刻保持怀疑精神，批判并验证每一个关键的核心逻辑'
]
</script>

<template>
  <section id="practices" ref="sectionRef" class="relative py-24 px-6 min-h-screen z-10">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          00 // Methodology
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" style="font-family: 'Rajdhani', sans-serif">
          VibeCoding 团队实践指南
        </h2>
        <p class="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          AI 编程不是“跟着感觉走”，而是 <strong>“严格流程下的高效协作”</strong>。从编码者到架构审查者的蜕变之道。
        </p>
      </div>

      <!-- 第一层：范式转换 -->
      <div class="mb-20" :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-10 opacity-0': !isVisible }" style="transition: all 1s ease-out">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-6 h-px bg-white/20"></span> 核心角色转换
        </h3>
        <div class="relative w-full rounded-[2.5rem] p-[1px] bg-gradient-to-r from-white/10 via-amber-500/50 to-amber-500 shadow-[0_0_80px_rgba(245,158,11,0.15)] overflow-hidden group">
          <!-- 内部动态底图融合，增加科幻感 -->
          <div class="absolute inset-0 bg-amber-500/10 blur-[80px] group-hover:bg-amber-500/25 transition-all duration-700"></div>
          
          <div class="relative w-full h-full rounded-[2.4rem] bg-[#050505] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-inner">
            <!-- 中间科幻分割枢纽 -->
            <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10">
              <!-- 上下穿梭的扫描光带 -->
              <div class="absolute left-1/2 -translate-x-1/2 w-[2px] h-40 bg-amber-400 blur-[1px] scan-line rounded-full"></div>
              
              <!-- 核心能量胶囊节点 -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <!-- 静态发光底座 -->
                <div class="w-1.5 h-16 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 rounded-full shadow-[0_0_25px_#f59e0b]"></div>
                <!-- 游弋的小光束（表示能量流向右侧即 AI 侧） -->
                <div class="absolute left-2 flex gap-0.5 pointer-events-none">
                  <svg v-for="i in 3" :key="i" class="w-4 h-4 text-amber-400 flow-arrow" :style="{ animationDelay: `${i * 150}ms` }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 数据列 -->
            <div v-for="shift in paradigmShifts" :key="shift.title" 
                 class="py-10 px-8 md:py-14 md:px-16 lg:px-24 relative z-0 flex flex-col justify-center transition-all duration-500"
                 :class="shift.active ? 'bg-gradient-to-r from-transparent to-amber-500/[0.04]' : 'bg-black/40 hover:bg-black/20'">
              <h4 class="text-xl font-bold mb-3" :class="shift.active ? 'text-amber-400 drop-shadow-md' : 'text-white/80'">{{ shift.title }}</h4>
              <div class="text-4xl md:text-5xl font-black tracking-tighter mb-8 transition-all" 
                   :class="shift.active ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]' : 'text-white/40'">
                {{ shift.role }}
              </div>
              <div class="space-y-6">
                <!-- 描述 -->
                <div class="flex items-start gap-4 text-base">
                  <span class="w-2 h-2 rounded-full mt-2 shrink-0 transition-all" :class="shift.active ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'bg-white/40'"></span>
                  <span class="leading-relaxed" :class="shift.active ? 'text-white/90 font-medium' : 'text-white/60'">{{ shift.desc }}</span>
                </div>
                <!-- 流程图 -->
                <div class="flex items-start gap-4 text-base">
                  <span class="w-2 h-2 rounded-full mt-2 shrink-0 transition-all" :class="shift.active ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'bg-white/40'"></span>
                  <span class="font-mono tracking-tight" :class="shift.active ? 'text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20' : 'text-white/60 bg-white/5 px-3 py-1.5 rounded-lg'">{{ shift.flow }}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <!-- 第二层：十大心法 -->
      <div class="mb-20" :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-10 opacity-0': !isVisible }" style="transition: all 1s ease-out 0.2s">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-6 h-px bg-white/20"></span> 落地的 10 个核心实践
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div 
            v-for="prac in practices" 
            :key="prac.id"
            class="group rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-6 hover:bg-black/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-2xl"
          >
            <span class="text-3xl font-black text-white/10 group-hover:text-amber-500/20 transition-colors mb-2">{{ prac.id }}</span>
            <h4 class="text-lg font-bold text-white mb-3 tracking-wide">{{ prac.title }}</h4>
            <p class="text-white/40 text-sm leading-relaxed flex-grow">{{ prac.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 第三层：黄金法则 -->
      <div :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-10 opacity-0': !isVisible }" style="transition: all 1s ease-out 0.4s">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-6 h-px bg-white/20"></span> VibeCoding 黄金法则
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="rule in goldenRules" :key="rule"
               class="flex items-start gap-4 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-amber-500/30 border-l-2 border-l-amber-500 shadow-lg">
            <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg class="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="text-white/80 font-medium leading-relaxed">{{ rule }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.scan-line {
  animation: scan-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes scan-pulse {
  0% { top: -20%; opacity: 0; }
  10% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  90% { opacity: 0; }
  100% { top: 120%; opacity: 0; }
}

.flow-arrow {
  animation: flow 1.5s infinite;
}
@keyframes flow {
  0% { transform: translateX(-5px); opacity: 0; }
  50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(245,158,11,0.8)); }
  100% { transform: translateX(10px); opacity: 0; }
}
</style>
