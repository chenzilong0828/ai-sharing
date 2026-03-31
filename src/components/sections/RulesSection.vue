<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CodeSnippet from '../common/CodeSnippet.vue'
import { rulesDataset } from '../../data/datasets'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const selectedCategory = ref('All')
const categories = computed(() => {
  const cats = new Set(rulesDataset.map(r => r.category))
  return ['All', ...Array.from(cats)]
})

const filteredRules = computed(() => {
  if (selectedCategory.value === 'All') return rulesDataset
  return rulesDataset.filter(r => r.category === selectedCategory.value)
})
</script>

<template>
  <section id="rules" ref="sectionRef" class="relative py-24 px-6 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          01 // Rules
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">核心规范 (Rules)</h2>
        <p class="text-white/40 text-base">系统级 Prompt 与原则指导，复制至 IDE Config 即可生效</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-3 mb-12" :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }" style="transition: opacity 1s">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 border"
          :class="selectedCategory === cat 
            ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 font-bold shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
            : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white/90'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Add a transition group for smooth filtering later if needed, simple v-for for now -->
        <div 
          v-for="(rule, index) in filteredRules" 
          :key="rule.id"
          class="rounded-2xl flex flex-col h-[480px] bg-black/40 backdrop-blur-xl border border-white/[0.06] p-8 transition-all duration-700 hover:border-white/20 hover:-translate-y-1"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="flex items-start justify-between mb-4 shrink-0">
            <h3 class="text-xl font-bold text-white tracking-tight">{{ rule.title }}</h3>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 text-white/50 bg-white/5 shrink-0 ml-4">
              {{ rule.category }}
            </span>
          </div>
          <div class="flex-1 flex flex-col min-h-0">
            <p class="text-white/50 text-sm mb-6 leading-relaxed shrink-0">{{ rule.description }}</p>
            <CodeSnippet :code="rule.code" :language="rule.language" />
          </div>
        </div>
        
        <div v-if="filteredRules.length === 0" class="col-span-1 md:col-span-2 text-center py-10 text-white/40">
          未找到对应规范
        </div>
      </div>

      <!-- Community Resources Section -->
      <div class="mt-24 border-t border-white/10 pt-16" :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }" style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;">
        <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          社区资源
        </h3>
        <p class="text-white/40 mb-10 text-base">除了官方文档，你还可以访问以下社区资源获取更多 Cursor Rules：</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://cursor.directory/plugins" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-blue-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden flex flex-col h-full">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-blue-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>01</span>
                <svg class="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors inline-block decoration-blue-500/40 group-hover:underline underline-offset-4">Cursor Directory</h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                这是一个由社区驱动的 Cursor Rules 资源库，提供了按编程语言和框架分类的规则集合。用户可以投稿并对规则进行评分，网站会精选展示高质量的规则内容。
              </p>
            </div>
          </a>

          <a href="https://dotcursorrules.com/" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-blue-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden flex flex-col h-full">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-blue-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>02</span>
                <svg class="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors inline-block decoration-blue-500/40 group-hover:underline underline-offset-4">Dot Cursor Rules</h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                这是一个专业维护的 Cursor Rules 仓库，提供了丰富的开发场景规则模板，并定期更新最佳实践，同时配备详细的使用说明和示例文档。
              </p>
            </div>
          </a>

          <a href="https://github.com/supabase/supabase/tree/master/examples/prompts" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-blue-500/40 hover:bg-black/60 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden flex flex-col h-full">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 flex flex-col flex-1">
              <div class="text-blue-500/50 font-mono text-sm mb-4 flex items-center justify-between">
                <span>03</span>
                <svg class="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
              <h4 class="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors inline-block decoration-blue-500/40 group-hover:underline underline-offset-4">Supabase Prompts</h4>
              <p class="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                Supabase 提供了一系列高质量的 AI 提示模板，包括代码审查、SQL 格式化、测试用例生成等场景。这些模板经过实践验证，可以直接应用到 Cursor Rules 中提升开发效率。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
