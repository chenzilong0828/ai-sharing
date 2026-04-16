<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CodeSnippet from '../common/CodeSnippet.vue'
import { rulesDataset } from '../../data/datasets'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const selectedCategory = ref('All')
const searchQuery = ref('')

const categories = computed(() => {
  const cats = new Set(rulesDataset.map(r => r.category))
  return ['All', ...Array.from(cats)]
})

// Reset scroll or animation state when filter changes
watch([selectedCategory, searchQuery], () => {
  // Can add logic here if needed for resetting animations
})

const filteredRules = computed(() => {
  return rulesDataset.filter(r => {
    const matchesCategory = selectedCategory.value === 'All' || r.category === selectedCategory.value
    const matchesSearch = !searchQuery.value || 
                         r.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         r.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         r.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section id="rules" ref="sectionRef" class="relative py-24 px-6 min-h-screen overflow-hidden">
    <!-- background glow -->
    <div class="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          01 // Rules & Standards
        </div>
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter" style="font-family: 'Rajdhani', sans-serif">
          核心开发规范 <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">(Rules)</span>
        </h2>
        <p class="text-white/40 text-lg max-w-2xl mx-auto">
          系统级 Prompt 指令集，集成最佳实践与架构底线。支持一键复制至 IDE 配置文件，即刻同步 AI 专家思维。
        </p>
      </div>

      <!-- Controls Row -->
      <div class="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between" :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-8': !isVisible }" style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)">
        <!-- Filters -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border"
            :class="selectedCategory === cat 
              ? 'bg-blue-500 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
              : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full md:w-80 group">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索规范标题、描述或代码..."
            class="w-full bg-black/40 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all group-hover:border-white/20"
          />
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div 
          v-for="(rule, index) in filteredRules" 
          :key="rule.id"
          class="group rounded-3xl flex flex-col h-[600px] bg-black/40 backdrop-blur-2xl border border-white/[0.08] p-8 transition-all duration-700 hover:border-blue-500/30 hover:-translate-y-2 relative overflow-hidden"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-16 opacity-0': !isVisible }"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <!-- Corner Light -->
          <div class="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>

          <div class="flex items-start justify-between mb-5 shrink-0">
            <div class="flex flex-col gap-1">
              <span class="text-[10px] uppercase tracking-widest text-blue-500 font-bold">{{ rule.category }}</span>
              <h3 class="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{{ rule.title }}</h3>
            </div>
            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
               <span class="text-xs font-mono">0{{ index + 1 }}</span>
            </div>
          </div>
          
          <div class="flex-1 flex flex-col min-h-0">
            <p class="text-white/40 text-sm mb-6 leading-relaxed shrink-0">{{ rule.description }}</p>
            <CodeSnippet :code="rule.code" :language="rule.language" />
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredRules.length === 0" class="col-span-1 md:col-span-2 py-20 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">未找到匹配的规范</h3>
          <p class="text-white/40">尝试更换关键词或过滤器再试一次</p>
          <button @click="searchQuery = ''; selectedCategory = 'All'" class="mt-6 text-blue-500 hover:underline text-sm underline-offset-4">重置所有搜索条件</button>
        </div>
      </div>

      <!-- Quick Actions / Community -->
      <div class="mt-32 relative" :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }" style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl -z-10"></div>
        
        <div class="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
          <div>
            <h3 class="text-3xl font-bold text-white mb-3">社区资源 & 扩展</h3>
            <p class="text-white/40 max-w-xl">除了内置规范，你还可以从这些顶级社区获取更多灵感，完善你的个人工作流。</p>
          </div>
          <div class="flex items-center gap-2 text-white/20 text-xs font-mono">
            <span>UPDATED 2024.Q4</span>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span>VERIFIED BY AURA-X</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://cursor.directory/" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-blue-500/50 transition-all h-full relative overflow-hidden">
            <div class="text-blue-500 font-mono text-[10px] mb-6 tracking-widest">EXTERNAL // 01</div>
            <h4 class="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Cursor Directory</h4>
            <p class="text-white/40 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
              全球最大的开源 Cursor Rules 索引库。支持按框架过滤，是寻找高质量提示词的首选之地。
            </p>
            <div class="flex items-center gap-2 text-blue-500 group-hover:gap-4 transition-all duration-300">
              <span class="text-xs font-bold uppercase tracking-wider">Explore</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </a>

          <a href="https://dotcursorrules.com/" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-purple-500/50 transition-all h-full relative overflow-hidden">
            <div class="text-purple-500 font-mono text-[10px] mb-6 tracking-widest">EXTERNAL // 02</div>
            <h4 class="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Dot Cursor Rules</h4>
            <p class="text-white/40 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
              专注于企业级开发模板。提供更为严谨、结构化的规则集，适合大型团队统一协作标准。
            </p>
            <div class="flex items-center gap-2 text-purple-500 group-hover:gap-4 transition-all duration-300">
              <span class="text-xs font-bold uppercase tracking-wider">Explore</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </a>

          <a href="https://github.com/supabase/supabase/tree/master/examples/prompts" target="_blank" rel="noopener noreferrer" class="group block p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/[0.06] hover:border-emerald-500/50 transition-all h-full relative overflow-hidden">
            <div class="text-emerald-500 font-mono text-[10px] mb-6 tracking-widest">EXTERNAL // 03</div>
            <h4 class="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">Supabase Prompts</h4>
            <p class="text-white/40 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
              Supabase 官方沉淀的高质量提示词工程。在 SQL、数据库架构设计领域具有极佳的参考价值。
            </p>
            <div class="flex items-center gap-2 text-emerald-500 group-hover:gap-4 transition-all duration-300">
              <span class="text-xs font-bold uppercase tracking-wider">Explore</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth transitions for grid items if needed */
.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s ease;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

