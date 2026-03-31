<script setup lang="ts">
/**
 * 页脚区 - 极简暗色风格
 */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const conclusions = [
  { icon: '🎯', text: 'AI 不会替代程序员，但会替代不会用 AI 的程序员' },
  { icon: '🔑', text: 'Prompt Engineering 是新时代开发者的核心竞争力' },
  { icon: '🌊', text: '从工具使用到工作流变革，AI 正在重塑软件开发的每个环节' },
  { icon: '💪', text: '拥抱变化，持续学习，让 AI 成为你最强大的编程搭档' },
]
</script>

<template>
  <footer ref="sectionRef" class="relative py-32 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-14">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8" style="font-family: 'Rajdhani', sans-serif">
          核心洞见
        </h2>

        <div class="space-y-3">
          <div
            v-for="(item, index) in conclusions"
            :key="item.text"
            class="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] p-5 flex items-center gap-4 text-left transition-all duration-700 hover:border-white/15"
            :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <span class="text-2xl flex-shrink-0">{{ item.icon }}</span>
            <p class="text-white/60 text-base">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- 底部分割线 -->
      <div class="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      <!-- 底部信息 -->
      <div class="text-center space-y-3">
        <p class="text-white/20 text-sm">向下滚动</p>
        <div class="w-[1px] h-5 bg-white/20 mx-auto" />
        <p class="text-white/15 text-xs font-['JetBrains_Mono']">
          © 2026 AI Programming Research · Built with Vue 3 + Three.js + TailwindCSS v4
        </p>
      </div>
    </div>
  </footer>
</template>
