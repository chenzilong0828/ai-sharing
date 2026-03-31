<script setup lang="ts">
/**
 * 技能展示区 - 仿 anna.tf #skills 风格
 * 左侧: 个人概览卡
 * 右侧: 技能分类卡片堆叠
 * 背景: 土星场景透出
 */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

// AI 工具技能分类
const skillCategories = [
  {
    icon: '🤖',
    title: 'AI 编程工具',
    skills: [
      { name: 'Cursor', color: '#b026ff' },
      { name: 'GitHub Copilot', color: '#00f0ff' },
      { name: 'Claude', color: '#ff7b54' },
      { name: 'ChatGPT', color: '#39ff14' },
      { name: 'Windsurf', color: '#ffd700' },
    ],
  },
  {
    icon: '🎨',
    title: '前端',
    skills: [
      { name: 'Vue', color: '#42b883' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'TailwindCSS', color: '#06b6d4' },
      { name: 'UniApp', color: '#2b9939' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Prompt Engineering',
    skills: [
      { name: 'System Prompt', color: '#ff2d95' },
      { name: 'RAG', color: '#b026ff' },
      { name: 'LangChain', color: '#00f0ff' },
      { name: 'Few-Shot', color: '#ffd700' },
      { name: 'CoT', color: '#39ff14' },
    ],
  },
  {
    icon: '🛠️',
    title: '开发工具链',
    skills: [
      { name: 'Vite', color: '#bd34fe' },
      { name: 'VS Code', color: '#007acc' },
      { name: 'Git', color: '#f05032' },
      { name: 'Docker', color: '#2496ed' },
      { name: 'Nginx', color: '#009639' },
    ],
  },
  {
    icon: '📊',
    title: '数据 & AI',
    skills: [
      { name: 'MCP 协议', color: '#00f0ff' },
      { name: 'Agentic Coding', color: '#b026ff' },
      { name: 'NL2SQL', color: '#ff2d95' },
      { name: 'Code Review AI', color: '#39ff14' },
    ],
  },
]

// 个人数据
const profileStats = [
  { value: '50+', label: 'AI工具评测' },
  { value: '30+', label: '实战项目' },
  { value: '1000%', label: '效率提升' },
  { value: '18', label: 'AI技能' },
]
</script>

<template>
  <section id="tech" ref="sectionRef" class="relative py-24 px-6 min-h-screen flex items-center">
    <div class="max-w-7xl mx-auto w-full">
      <!-- 两栏布局 -->
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- 左侧: 个人概览卡片 -->
        <div
          class="w-full lg:w-[380px] flex-shrink-0"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
          style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <div class="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/[0.08] p-7">
            <!-- 头像和信息 -->
            <div class="flex items-center gap-4 mb-5">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#b026ff] flex items-center justify-center text-2xl font-bold"
                   style="font-family: 'Orbitron', sans-serif; color: #050508">
                FE
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">AI 编程研究员</h3>
                <p class="text-white/40 text-sm">前端开发者 & AI 探索者</p>
              </div>
            </div>

            <!-- 格言 -->
            <p class="text-white/30 text-sm italic mb-6 leading-relaxed">
              "让 AI 成为你最强大的编程搭档，而不是竞争对手。"
            </p>

            <!-- 数据指标 -->
            <div class="grid grid-cols-4 gap-3">
              <div
                v-for="stat in profileStats"
                :key="stat.label"
                class="text-center"
              >
                <div class="text-xl font-bold text-white" style="font-family: 'Orbitron', sans-serif">
                  {{ stat.value }}
                </div>
                <div class="text-[10px] text-white/30 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧: 技能分类卡片 -->
        <div class="flex-1 space-y-4 w-full">
          <div
            v-for="(category, index) in skillCategories"
            :key="category.title"
            class="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] p-5 transition-all duration-700 hover:border-white/15 hover:bg-black/50"
            :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-6 opacity-0': !isVisible }"
            :style="{ transitionDelay: `${index * 100 + 200}ms` }"
          >
            <!-- 分类标题 -->
            <div class="flex items-center gap-2.5 mb-4">
              <span class="text-lg">{{ category.icon }}</span>
              <h3 class="text-white/70 font-medium text-sm tracking-wide">{{ category.title }}</h3>
            </div>

            <!-- 技能标签 -->
            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="skill in category.skills"
                :key="skill.name"
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm hover:bg-white/[0.08] hover:border-white/15 hover:text-white/80 transition-all duration-300 cursor-default"
              >
                <span
                  class="w-2 h-2 rounded-full flex-shrink-0"
                  :style="{ backgroundColor: skill.color }"
                />
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
