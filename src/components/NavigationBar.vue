<script setup lang="ts">
/**
 * 导航栏 - 仿 anna.tf 极简风格
 */
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('hero')

const sections = [
  { id: 'hero', label: '首页' },
  { id: 'ides', label: 'IDE 矩阵' },
  { id: 'intro', label: '原理解析' },
  { id: 'practices', label: 'VibeCoding 实践' },
  { id: 'rules', label: '核心规范' },
  { id: 'mcp', label: 'MCP 组件' },
  { id: 'skills', label: '团队技能' },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  for (const section of sections) {
    const el = document.getElementById(section.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 200 && rect.bottom >= 200) {
        activeSection.value = section.id
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
      <div class="hidden md:flex items-center gap-8">
        <button
          v-for="section in sections"
          :key="section.id"
          class="text-sm transition-all duration-300 relative"
          :class="activeSection === section.id
            ? 'text-white'
            : 'text-white/40 hover:text-white/70'"
          @click="scrollTo(section.id)"
        >
          {{ section.label }}
          <span
            v-if="activeSection === section.id"
            class="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/40"
          />
        </button>
      </div>

      <!-- 右侧空白占位 -->
      <div class="w-16" />
    </div>
  </nav>
</template>
