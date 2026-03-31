<script setup lang="ts">
/**
 * 英雄区 - 仿 anna.tf 风格
 * 简洁大标题 + 打字机副标题 + 社交图标
 * 土星场景在 App 层作为全局背景
 */
import { ref, onMounted, onUnmounted } from 'vue'

// 打字机效果
const displayText = ref('')
const fullTexts = [
  '构建高质 AI 编程工作流',
  'AURA-X-KYS 架构规范',
  '团队协作 MCP 接入',
  '最新 Skills 共享平台',
  '开箱即用，提升团队能效',
]
let textIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimer: ReturnType<typeof setTimeout> | null = null

const startTyping = () => {
  const currentText = fullTexts[textIndex]

  if (!isDeleting) {
    displayText.value = currentText.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentText.length) {
      isDeleting = true
      typeTimer = setTimeout(startTyping, 2500)
      return
    }
  } else {
    displayText.value = currentText.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % fullTexts.length
    }
  }

  typeTimer = setTimeout(startTyping, isDeleting ? 30 : 80)
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  if (typeTimer) clearTimeout(typeTimer)
})

const scrollToNext = () => {
  document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center">
    <!-- 内容区域 -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <!-- 顶部: 小字 -->
      <p class="text-white/40 text-sm md:text-base tracking-[0.25em] mb-6 font-light">
        你好，我是
      </p>

      <!-- 主标题 - 超大字体，仿 anna.tf 风格 -->
      <h1 class="text-6xl md:text-[7rem] lg:text-[8.5rem] font-bold text-white leading-[0.9] mb-8 tracking-tight"
          style="font-family: 'Inter', 'Rajdhani', sans-serif; font-weight: 800">
        AI 数据集
      </h1>

      <!-- 副标题: 职位/角色 -->
      <p class="text-white/50 text-lg md:text-xl tracking-[0.15em] mb-10 font-light">
        团队共享 · 最新配置 · 一键接入
      </p>

      <!-- 打字机效果 - 在副标题下方 -->
      <div class="h-8 mb-12 flex items-center justify-center">
        <span class="font-['JetBrains_Mono'] text-base md:text-lg text-white/30">
          {{ displayText }}<span class="animate-pulse text-white/50">|</span>
        </span>
      </div>

      <!-- 社交图标行 - 仿 anna.tf 的圆形图标 -->
      <div class="flex items-center justify-center gap-5">
        <a
          v-for="link in [
            { icon: '📧', label: 'Email', href: '#' },
            { icon: '🐙', label: 'GitHub', href: '#' },
            { icon: '💬', label: 'Blog', href: '#' },
            { icon: '📝', label: 'Notes', href: '#' },
          ]"
          :key="link.label"
          :href="link.href"
          class="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          :title="link.label"
        >
          {{ link.icon }}
        </a>
      </div>
    </div>

    <!-- 底部滚动提示 -->
    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-70 transition-opacity"
      @click="scrollToNext"
    >
      <span class="text-[11px] text-white tracking-[0.3em]">向下滚动</span>
      <div class="w-[1px] h-6 bg-white/40 animate-pulse" />
    </div>
  </section>
</template>
