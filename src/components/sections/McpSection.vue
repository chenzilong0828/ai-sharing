<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CodeSnippet from '../common/CodeSnippet.vue'
import { mcpDataset } from '../../data/datasets'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const selectedCategory = ref('All')
const categories = computed(() => {
  const cats = new Set(mcpDataset.map(m => m.category))
  return ['All', ...Array.from(cats)]
})

const filteredMcps = computed(() => {
  if (selectedCategory.value === 'All') return mcpDataset
  return mcpDataset.filter(m => m.category === selectedCategory.value)
})
</script>

<template>
  <section id="mcp" ref="sectionRef" class="relative py-24 px-6 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          02 // MCP Servers
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">全栈 MCP 组件 (MCP)</h2>
        <p class="text-white/40 text-base">为任意 AI  IDE 注入跨界能力：接管数据库、访问 AWS，或操作 GitHub</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 border"
          :class="selectedCategory === cat 
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
            : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white/90'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="(mcp, index) in filteredMcps" 
          :key="mcp.id"
          class="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] p-8 transition-all duration-700 hover:border-white/20 hover:-translate-y-1"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center gap-3 mb-4">
            <h3 class="text-xl font-bold text-white tracking-tight">{{ mcp.title }}</h3>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 text-white/50 bg-white/5">
              {{ mcp.category }}
            </span>
          </div>
          <p class="text-white/50 text-sm mb-6 leading-relaxed">{{ mcp.description }}</p>
          <CodeSnippet :code="mcp.code" :language="mcp.language" />
        </div>
        
        <div v-if="filteredMcps.length === 0" class="col-span-1 md:col-span-2 text-center py-10 text-white/40">
          未找到对应 MCP 组件
        </div>
      </div>
    </div>
  </section>
</template>
