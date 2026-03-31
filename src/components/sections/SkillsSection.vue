<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import CodeSnippet from '../common/CodeSnippet.vue'
import { skillsDataset, type DatasetItem } from '../../data/datasets'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const selectedSkill = ref<DatasetItem | null>(null)

const copyContent = async (content?: string) => {
  if (!content) return
  try {
    await navigator.clipboard.writeText(content)
    alert('该 Skill 提示词已成功复制到剪贴板！(Prompt Copied)')
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const selectedCategory = ref('All')
const categories = computed(() => {
  const cats = new Set(skillsDataset.map(s => s.category))
  return ['All', ...Array.from(cats)]
})

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'All') return skillsDataset
  return skillsDataset.filter(s => s.category === selectedCategory.value)
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="relative py-24 px-6 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          03 // Skills
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">核心技能 (Skills)</h2>
        <p class="text-white/40 text-base">涵盖前后端业务逻辑、性能调优、重构排雷等全方位工作流技能</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 border"
          :class="selectedCategory === cat 
            ? 'bg-pink-500/20 border-pink-500/40 text-pink-400 font-bold shadow-[0_0_15px_rgba(236,72,153,0.15)]' 
            : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white/90'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="(skill, index) in filteredSkills" 
          :key="skill.id"
          @click="selectedSkill = skill"
          class="rounded-2xl flex flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/[0.06] p-8 transition-all duration-700 hover:border-pink-500/40 hover:bg-black/60 hover:-translate-y-1 cursor-pointer group shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
          :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div>
            <div class="flex items-center gap-3 mb-4">
              <h3 class="text-xl font-bold text-white tracking-tight">{{ skill.title }}</h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 text-white/50 bg-white/5 mx-2 shrink-0">
                {{ skill.category }}
              </span>
            </div>
            <p class="text-white/50 text-sm mb-6 leading-relaxed">{{ skill.description }}</p>
          </div>
          <CodeSnippet :code="skill.code" :language="skill.language" />
        </div>
        
        <div v-if="filteredSkills.length === 0" class="col-span-1 md:col-span-2 text-center py-10 text-white/40">
          未找到对应 技能 配置
        </div>
      </div>
    </div>

    <!-- Skill Detail Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedSkill" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <!-- Modal Backdrop -->
          <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="selectedSkill = null"></div>
          
          <!-- Modal Content -->
          <div class="relative w-full max-w-4xl max-h-full flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.2)] overflow-hidden">
            <div class="px-8 py-6 border-b border-white/10 flex flex-wrap items-center justify-between bg-white/[0.02] gap-4">
              <div class="flex items-center gap-4">
                <h3 class="text-2xl font-bold text-white tracking-tight">{{ selectedSkill.title }}</h3>
                <span class="px-2.5 py-1 rounded text-xs font-mono border border-pink-500/30 text-pink-400 bg-pink-500/10">{{ selectedSkill.category }}</span>
              </div>
              <button @click="selectedSkill = null" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div class="p-8 overflow-y-auto flex-1 text-white/70">
              <div class="mb-6 text-lg text-white/90 font-medium leading-relaxed border-l-4 border-pink-500 pl-4">
                {{ selectedSkill.description }}
              </div>
              <div class="bg-black/60 border border-white/10 rounded-2xl p-6 shadow-inner relative group">
                <button 
                  @click="copyContent(selectedSkill.content)" 
                  class="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-pink-500/20 text-white/50 hover:text-pink-400 transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy Original Markdown"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </button>
                <pre class="whitespace-pre-wrap font-mono text-sm leading-relaxed text-pink-50 font-medium font-ligatures-normal">{{ selectedSkill.content || '暂无详细内容 / No detailed content available.' }}</pre>
              </div>
            </div>
            
            <div class="px-8 py-5 border-t border-white/10 bg-[#050505] flex justify-end">
              <button @click="copyContent(selectedSkill.content)" class="px-7 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transform hover:-translate-y-0.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                复制指令并应用 (Copy Prompt)
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from .relative,
.fade-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
