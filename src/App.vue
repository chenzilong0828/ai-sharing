<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from './components/sections/HeroSection.vue'
import TimelineSection from './components/sections/TimelineSection.vue'
import AiIdeSection from './components/sections/AiIdeSection.vue'
import IntroSection from './components/sections/IntroSection.vue'
import PracticeSection from './components/sections/PracticeSection.vue'
import RulesSection from './components/sections/RulesSection.vue'
import McpSection from './components/sections/McpSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import FooterSection from './components/sections/FooterSection.vue'
import DemoSection from './components/sections/DemoSection.vue'
import NavigationBar from './components/NavigationBar.vue'
import SaturnScene from './components/effects/SaturnScene.vue'

const isLoaded = ref(false)

onMounted(() => {
  document.documentElement.classList.add('dark')
  setTimeout(() => {
    isLoaded.value = true
  }, 300)
})
</script>

<template>
  <div
    class="min-h-screen relative overflow-hidden"
    :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
    style="transition: opacity 1s ease-in-out; background: #050508"
  >
    <!-- Three.js 土星全局背景 -->
    <SaturnScene />

    <!-- 导航栏 -->
    <NavigationBar />

    <!-- 页面主体内容（覆盖在土星之上） -->
    <main class="relative z-10">
      <!-- 第一屏: 简洁开场 -->
      <HeroSection />

      <!-- 第二屏: 进化纪元 -->
      <TimelineSection />

      <!-- 全球核心 AI IDE 矩阵概览 -->
      <AiIdeSection />

      <!-- 数据集概念科普 -->
      <IntroSection />

      <!-- VibeCoding 团队实践指南 -->
      <PracticeSection />

      <!-- 规范区 -->
      <RulesSection />

      <!-- MCP 组件区 -->
      <McpSection />

      <!-- Skills 技能区 -->
      <SkillsSection />

      <!-- 实操演示区 -->
      <DemoSection />

      <!-- 页脚 -->
      <FooterSection />
    </main>
  </div>
</template>
