<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import HeroSection from './components/sections/HeroSection.vue'
import TimelineSection from './components/sections/TimelineSection.vue'
import AiIdeSection from './components/sections/AiIdeSection.vue'
import IntroSection from './components/sections/IntroSection.vue'
import PracticeSection from './components/sections/PracticeSection.vue'
import RulesSection from './components/sections/RulesSection.vue'
import McpSection from './components/sections/McpSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import HarnessSection from './components/sections/HarnessSection.vue'
import FooterSection from './components/sections/FooterSection.vue'
import DemoSection from './components/sections/DemoSection.vue'
import NavigationBar from './components/NavigationBar.vue'
import SaturnScene from './components/effects/SaturnScene.vue'

const isLoaded = ref(false)
const currentIndex = ref(0)
const totalSlides = 11
const isPptMode = ref(false) // 默认开启滚动条模式
const scrollProgress = ref(0) // 用于背景平滑过渡

// 为滚动模式提供 IntersectionObserver
const sectionsRef = ref<HTMLElement[]>([])
const setSectionRef = (el: any) => {
  if (el && !sectionsRef.value.includes(el)) {
    sectionsRef.value.push(el)
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  document.documentElement.classList.add('dark')
  window.addEventListener('keydown', handleKeydown)
  
  // 初始化 IntersectionObserver
  observer = new IntersectionObserver((entries) => {
    if (isPptMode.value) return 
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = sectionsRef.value.indexOf(entry.target as HTMLElement)
        if (index !== -1) {
          currentIndex.value = index
        }
      }
    })
  }, { threshold: 0.5 })

  // 滚动监听用于背景
  window.addEventListener('scroll', () => {
    if (!isPptMode.value) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      scrollProgress.value = winScroll / height
    }
  }, { passive: true })

  nextTick(() => {
    sectionsRef.value.forEach(section => observer?.observe(section))
  })

  setTimeout(() => {
    isLoaded.value = true
    // 根据初始模式设置 body 溢出
    document.body.style.overflow = isPptMode.value ? 'hidden' : 'auto'
  }, 300)
})

watch(currentIndex, (newVal) => {
  if (isPptMode.value) {
    nextTick(() => {
      const slides = document.querySelectorAll('main > div')
      if (slides[newVal]) {
        slides[newVal].scrollTop = 0
      }
    })
  }
})

// 当切换回 PPT 模式时，确保位置同步
watch(isPptMode, (val) => {
  if (val) {
    // 切回 PPT 模式后，可能需要强制修正一些状态
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
  if (!isPptMode.value) return // 非 PPT 模式下使用原生滚动

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault()
    if (currentIndex.value < totalSlides - 1) currentIndex.value++
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault()
    if (currentIndex.value > 0) currentIndex.value--
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  observer?.disconnect()
})
</script>

<template>
  <div
    class="w-full relative overflow-x-hidden"
    :class="[
      isPptMode ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto',
      { 'opacity-0': !isLoaded, 'opacity-100': isLoaded }
    ]"
    style="transition: opacity 1s ease-in-out; background: #050508"
  >
    <!-- Three.js 土星全局背景 -->
    <SaturnScene :scroll-ratio="isPptMode ? currentIndex / (totalSlides - 1) : scrollProgress" />

    <!-- 导航栏 -->
    <NavigationBar v-model="currentIndex" v-model:isPptMode="isPptMode" />

    <!-- 页面主体内容 -->
    <main 
      class="relative z-10 w-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
      :class="isPptMode ? 'h-full' : ''"
      :style="isPptMode ? { transform: `translateY(-${currentIndex * 100}vh)` } : {}"
    >
      <!-- 各屏内容 -->
      <div :ref="setSectionRef" id="hero" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><HeroSection /></div>
      <div :ref="setSectionRef" id="timeline" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><TimelineSection /></div>
      <div :ref="setSectionRef" id="ides" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><AiIdeSection /></div>
      <div :ref="setSectionRef" id="intro" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><IntroSection /></div>
      <div :ref="setSectionRef" id="practices" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><PracticeSection /></div>
      <div :ref="setSectionRef" id="rules" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><RulesSection /></div>
      <div :ref="setSectionRef" id="mcp" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><McpSection /></div>
      <div :ref="setSectionRef" id="skills" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><SkillsSection /></div>
      <div :ref="setSectionRef" id="harness" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><HarnessSection /></div>
      <div :ref="setSectionRef" id="demo" class="w-full hide-scrollbar" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><DemoSection /></div>
      <div :ref="setSectionRef" id="footer" class="w-full hide-scrollbar flex items-center justify-center" :class="isPptMode ? 'h-screen overflow-y-auto' : 'min-h-screen'"><FooterSection class="w-full" /></div>
    </main>

    <!-- 右侧指示器 (PPT 模式下更有用) -->
    <div class="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      <button 
        v-for="i in totalSlides" :key="i"
        @click="currentIndex = i - 1"
        class="w-2 rounded-full transition-all duration-500 ease-out"
        :class="currentIndex === i - 1 ? 'h-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'h-2 bg-white/30 hover:bg-white/60'"
        :aria-label="'Switch to slide ' + i"
      ></button>
    </div>
  </div>
</template>

<style>
/* 隐藏包裹区域的原生滚动条，保持PPT纯净感 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
