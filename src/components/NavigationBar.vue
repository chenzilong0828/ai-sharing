<script setup lang="ts">
/**
 * 导航栏 - 仿 anna.tf 极简风格
 */
import { ref, onMounted } from 'vue'

const props = defineProps<{
  modelValue: number
  isPptMode: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'update:isPptMode': [value: boolean]
}>()

const isScrolled = ref(false)

const sections = [
  { id: 'hero', label: '首页', index: 0 },
  { id: 'timeline', label: '进化历程', index: 1 },
  { id: 'ides', label: 'IDE 矩阵', index: 2 },
  { id: 'intro', label: '原理解析', index: 3 },
  { id: 'practices', label: '实践指南', index: 4 },
  { id: 'rules', label: '核心规范', index: 5 },
  { id: 'mcp', label: 'MCP 组件', index: 6 },
  { id: 'skills', label: '团队技能', index: 7 },
  { id: 'harness', label: '约束工程', index: 8 },
]

const scrollTo = (section: any) => {
  if (props.isPptMode) {
    emit('update:modelValue', section.index)
  } else {
    const el = document.getElementById(section.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// 在非 PPT 模式下，滚动监听仍然有效，但我们会优先通过 App.vue 的 IntersectionObserver 同步 currentIndex
onMounted(() => {
  const handleScrollThrottled = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScrollThrottled, { passive: true })
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled
      ? 'bg-black/40 backdrop-blur-xl border-b border-white/[0.06]'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-1.5">
        <span class="text-white font-bold text-lg tracking-tight">AI</span>
        <span class="text-white/30 font-light text-lg">编程</span>
      </div>

      <!-- 导航链接 -->
      <div class="hidden md:flex items-center gap-6">
        <button
          v-for="section in sections"
          :key="section.id"
          class="text-sm transition-all duration-300 relative px-2 py-1"
          :class="props.modelValue === section.index
            ? 'text-white font-bold'
            : 'text-white/40 hover:text-white/70'"
          @click="scrollTo(section)"
        >
          {{ section.label }}
          <span
            v-if="props.modelValue === section.index"
            class="absolute -bottom-1 left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </button>
      </div>

      <!-- 右侧 PPT 模式开关 -->
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-mono uppercase tracking-widest text-white/30 truncate hidden sm:block">PPT Mode</span>
        <button 
          @click="emit('update:isPptMode', !props.isPptMode)"
          class="relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none"
          :class="props.isPptMode ? 'bg-cyan-500/40 border border-cyan-500/50' : 'bg-white/10 border border-white/10'"
        >
          <div 
            class="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform duration-300 shadow-sm"
            :class="props.isPptMode ? 'translate-x-5' : 'translate-x-0'"
          ></div>
        </button>
      </div>
    </div>
  </nav>
</template>
