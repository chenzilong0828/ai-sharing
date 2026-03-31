<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const concepts = [
  {
    title: 'Rules (核心规范)',
    icon: '01',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    dot: 'bg-blue-500',
    description: '指导 AI 行为的基础准则与开发哲学。',
    details: 'Rules 相当于 AI 的大脑思维限制与开发哲学。无论它是回答问题还是生成代码，都必须优先遵守这里设定的原则（例如 KISS、SOLID、Vue3 强类型规范等）。它可以防止 AI 生成冗余代码或犯低级错误，从而保证团队产出风格高度一致。'
  },
  {
    title: 'MCP (组件与上下文)',
    icon: '02',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-500',
    description: '赋予 AI 操作外部世界的接口协议与环境上下文。',
    details: 'Model Context Protocol 是一项打破 AI 平台壁垒的革命性标准。通过接入 MCP Servers，原本只懂纸上谈兵的 AI 能够安全地读取您的 GitHub Repo、查询核心数据库、操作 Slack 或者进行本地无头浏览器访问。它们构成了 AI 探索与改造全栈项目的“眼”与“手”。'
  },
  {
    title: 'Skills (原子技能)',
    icon: '03',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    dot: 'bg-pink-500',
    description: '即插即用、应对特定开发场景的高级指令封装。',
    details: 'Skills 是我们针对前端设计、后端慢查询优化、安全性排查等具体任务调优的高频 Prompt 集合（犹如 AI 的肌肉记忆）。团队无需重复研究复杂的指令公式，直接 @ 对应技能标签即可精确召唤出某领域的 AI 专家来处理对应的繁杂事务。'
  }
]
</script>

<template>
  <section id="intro" ref="sectionRef" class="relative py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6" style="font-family: 'Rajdhani', sans-serif">
          全栈 AI 数据集原理
        </h2>
        <p class="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          我们为业务量身定做的全栈 AI 工作流基于三大支柱组成。了解它们，即可将您的 <strong>Cursor / AI IDE</strong> 打造成无所不能的超级研发中台。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in concepts" 
          :key="item.title"
          class="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/[0.08] p-8 transition-all duration-700 hover:border-white/20 hover:-translate-y-2 group flex flex-col h-full"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 w-max" :class="[item.bg, item.color]">
            <span class="w-2 h-2 rounded-full animate-pulse" :class="item.dot"></span>
            {{ item.icon }} // {{ item.title.split(' ')[0] }}
          </div>
          
          <h3 class="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
            {{ item.title }}
          </h3>
          
          <p class="text-white/70 font-medium mb-4 text-base">
            {{ item.description }}
          </p>

          <div class="w-full h-px bg-gradient-to-r from-white/10 to-transparent my-4"></div>
          
          <p class="text-white/40 text-sm leading-relaxed flex-grow">
            {{ item.details }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
