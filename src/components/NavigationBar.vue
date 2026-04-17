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
    class="fixed z-50 transition-all duration-700 ease-in-out"
    :class="[
      isScrolled
        ? 'top-0 left-0 right-0 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
        : 'top-0 left-0 right-0 bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
      <!-- Logo: Liquid Industrial Aesthetics -->
      <div 
        class="flex items-center gap-4 cursor-pointer group select-none active:scale-95 transition-all duration-300"
        @click="scrollTo(sections[0])"
      >
        <!-- 标志容器: 动态轨道/磨砂核心 -->
        <div class="relative w-11 h-11 flex items-center justify-center">
          <!-- 动态旋转环 (层叠感) -->
          <div class="absolute inset-0 border-[0.5px] border-white/5 rounded-full group-hover:border-white/20 group-hover:rotate-45 transition-all duration-1000"></div>
          <div class="absolute inset-1.5 border-[0.5px] border-cyan-500/10 rounded-full group-hover:rotate-[-45deg] transition-all duration-1000"></div>
          
          <!-- 磨砂玻璃核心 -->
          <div class="relative w-8 h-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl flex items-center justify-center group-hover:bg-cyan-500/[0.04] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-500 overflow-hidden">
            <!-- 汉特云官方图标 -->
            <img 
              src="/image.png" 
              class="w-5 h-5 object-contain filter drop-shadow-[0_0_3px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-all duration-500"
              alt="HTW"
            />
            <!-- 扫光动画 -->
            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>

        <!-- 文字排版: 极简主义力量感 -->
        <div class="flex flex-col">
          <div class="flex items-center gap-2 overflow-hidden">
            <span class="text-lg font-black text-white tracking-[0.2em] leading-none group-hover:tracking-[0.25em] transition-all duration-500 uppercase">汉特云</span>
            <div class="h-px w-0 group-hover:w-8 bg-cyan-400/60 transition-all duration-700"></div>
          </div>
          <div class="relative mt-1.5 flex items-center gap-2 overflow-hidden">
            <span class="text-[9px] font-bold text-white/30 tracking-[0.4em] uppercase group-hover:text-white/60 transition-colors">技术分享中心</span>
            <span class="hidden sm:block text-[7px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500 italic">v2.0</span>
          </div>
        </div>
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
