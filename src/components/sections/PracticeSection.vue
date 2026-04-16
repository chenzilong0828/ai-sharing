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
    title: '传统研发模式',
    role: '代码编写者 (Coder)',
    desc: '精确控制每一行代码逻辑，深度处理各种开发细节。',
    flow: '阅读需求 → 编写代码 → 编译与测试',
    active: false
  },
  {
    title: 'AI 辅助开发模式',
    role: '架构设计与审查者 (Reviewer)',
    desc: '从高层梳理业务流向与系统规约，拆解任务并引导 AI 协助实现代码框架，随后投入人工核查环节。',
    flow: '拆解需求 → AI 协助生成初稿 → 人工调优调试',
    active: true
  }
]

const practices = [
  { id: '01', title: '配置系统规范', desc: '在项目初始文件中说明技术框架与团队约定，明确代码风格与结构。' },
  { id: '02', title: '先结构后生成', desc: '采用梳理模型和主逻辑、确认表结构和接口链路，后续再投入编码补全。' },
  { id: '03', title: '使用文档存留', desc: '讨论分析中产生的最佳实践与接口文档，随时作为参考文件提供给 AI。' },
  { id: '04', title: '注重人工审查', desc: '生成代码的初稿合并前需仔细检视变动，从边界条件的安全性出发确认合并。' },
  { id: '05', title: '拆解任务粒度', desc: '复杂请求逐步拆离小块开发，按逻辑的流向阶段连贯开发（如页面->请求->展示）。' },
  { id: '06', title: '灵活回溯状态', desc: '碰到方向有偏差时，不要在其基础上越堆越多错漏，利用回退机制返回正确的上一步点。' },
  { id: '07', title: '保持分支整洁', desc: '频繁利用 Git 暂存稳定态内容，避免后期生成的复杂代码覆盖当前正确进度。' },
  { id: '08', title: '测试例作为补充', desc: '引导编写相应的测试或自测用例作为后续验收，防范改动引起的连环隐患。' },
  { id: '09', title: '补充新文档集', desc: '将第三方模块的官方手册和示例投喂以扩展工作区的文档认知，削减知识滞后的幻觉。' },
  { id: '10', title: '模型结合应用', desc: '依据当前场景和擅长点，为对应的流程选择合理的基础模型处理。' }
]

const goldenRules = [
  'AI输出应始终被视为初稿和基础代码段。',
  '实际代码合并仍需要作为提交者的最终研判和承担责任。',
  '工具侧重于承担反复繁琐的过程与模板搭建，避免创造力和系统设计的缺失。',
  '保持多角度审查心态以防范未遇见的特殊情况和性能衰减。'
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
          团队应用协同指南
        </h2>
        <p class="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          拥抱 AI 的核心变化是流程意识：开发者可以将更大比例的时间分配到<strong>梳理模块结构设计与人工审查保障</strong>工作之上。
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
          <span class="w-6 h-px bg-white/20"></span> 落地的 10 个辅助建议
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
          <span class="w-6 h-px bg-white/20"></span> 协同编码守则
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
