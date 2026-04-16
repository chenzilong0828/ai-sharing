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
    title: 'Rules (基础规范)',
    icon: '01',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    dot: 'bg-blue-500',
    description: '“项目的家规”：统一编码风格与架构准则。',
    details: '告诉 AI 咱们写代码的坏毛病不能要，好习惯要保持（比如严格遵循项目目录结构），让它输出的内容一眼看上去就是咱团队自己写的，保障代码质量的下限。'
  },
  {
    title: 'MCP (组件服务集成)',
    icon: '02',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-500',
    description: '“万能插座”：让 AI 实时连接外部信息。',
    details: '模型上下文协议 (MCP) 让 AI 像连接了网线一样，能实时看官方文档、设计稿甚至是查数据库，解决它“只靠脑子里旧知识瞎猜”的问题，让协助更精准。'
  },
  {
    title: 'Skills (原子化技能)',
    icon: '03',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    dot: 'bg-pink-500',
    description: '“锦囊妙计”：沉淀高效开发的复用套路。',
    details: '把复杂的排查、重构等重复活儿整理成一键执行的“锦囊”。不管是新手还是老手，遇到相同场景直接拿来即用，大幅减少由于沟通不清带来的反复微调精力。'
  }
]
</script>

<template>
  <section id="intro" ref="sectionRef" class="relative py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6" style="font-family: 'Rajdhani', sans-serif">
          AI 原生开发：三大基石
        </h2>
        <p class="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          我们将 AI 辅助研发提炼为三大基础支柱。熟悉与理解这些部分，方便组织将其转变为高效的研发辅助配置环境。
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
