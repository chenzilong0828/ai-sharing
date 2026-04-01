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

      <!-- MCP 社区资源推荐 -->
      <div
        class="mt-24 border-t border-white/10 pt-16"
        :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
        style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;"
      >
        <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
          MCP 平台推荐
        </h3>
        <p class="text-white/40 mb-10 text-base">发现并接入更多优质 MCP Server，探索 AI 能力边界：</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <!-- Smithery -->
          <a href="https://smithery.ai/" target="_blank" rel="noopener noreferrer"
            class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-emerald-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col h-full"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-emerald-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>01</span>
                <svg class="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors inline-block decoration-emerald-500/40 group-hover:underline underline-offset-4">
                Smithery
              </h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                全球最大的 MCP Server 市场，收录数千个开源与商业 MCP 组件，支持一键安装与配置，覆盖开发、数据、搜索等各类场景。
              </p>
            </div>
          </a>

          <!-- ModelScope MCP -->
          <a href="https://modelscope.cn/mcp" target="_blank" rel="noopener noreferrer"
            class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-emerald-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col h-full"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-emerald-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>02</span>
                <svg class="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors inline-block decoration-emerald-500/40 group-hover:underline underline-offset-4">
                ModelScope MCP
              </h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                阿里魔搭社区的 MCP 专区，汇聚国内外主流 MCP 工具，提供中文文档与示例，是国内团队接入 MCP 生态的首选入口。
              </p>
            </div>
          </a>

          <!-- MCP Market -->
          <a href="https://mcpmarket.cn/" target="_blank" rel="noopener noreferrer"
            class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-emerald-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col h-full"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-emerald-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>03</span>
                <svg class="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors inline-block decoration-emerald-500/40 group-hover:underline underline-offset-4">
                MCP Market
              </h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                国内专注于 MCP 生态的中文社区，收录精选 MCP Server 并提供详细的中文接入教程，适合快速上手与团队推广使用。
              </p>
            </div>
          </a>

        </div>
      </div>
    </div>
  </section>
</template>
