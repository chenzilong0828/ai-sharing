<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface HarnessModule {
  id: string
  title: string
  subtitle: string
  frontendParallel: string
  description: string
  techDetail: string
  color: string
}

const modules: HarnessModule[] = [
  {
    id: 'control-plane',
    title: '控制平面',
    subtitle: 'Control Plane',
    frontendParallel: '我们不能靠聊天给 AI 定规矩。我们要像配置 eslint 和 tsconfig 一样，为 AI 配置它在 Vue 项目中的 Harness 控制平面（如 .claudemd 或项目全局指令）。',
    description: 'Prompt 不再是单纯的“人设”（“你是一个资深的 Vue 专家，请帮我写代码…”）。Prompt 是系统的控制平面，它就像操作系统的内核参数，必须分层、有优先级、且能控制长期记忆。',
    techDetail: 'Base 层锁定架构红线（如禁止原生 DOM 操作）；Project 层规范组件范式（如强制 script setup 和 Pinia）。Harness 要求我们把“如何写代码的规则”硬编码到系统中，让模型在受限的协议下运行。',
    color: 'indigo'
  },
  {
    id: 'memory-gc',
    title: '内存与 GC',
    subtitle: 'Memory & GC',
    frontendParallel: '索引分离原则：像原著中 MEMORY.md 只是索引一样，前端项目中不要把几千行的 utils.ts 喂给 AI，而是喂给它 types/index.d.ts（类型声明接口）。接口就是索引。',
    description: '上下文一多，系统就会产生低级幻觉。Harness 的核心设计是 Compact（压缩与现场重建） 和 入口索引分离。Compact 的真正目的是重建工作语义树。',
    techDetail: '当聊了很久 Vue 报错修不好时，我们要主动“清理内存”，提取当前的语义底座（目标组件、当前状态、下步计划），开启新会话以人工触发 Compact。',
    color: 'blue'
  },
  {
    id: 'constitution',
    title: '权限与中断',
    subtitle: 'Behavior Constitution',
    frontendParallel: '三态权限设计：Allow / Deny / Ask。在前端工程中，读取 .vue 文件是 Allow；修改公共组件库是 Ask（必须人类 Code Review）；执行 npm install、修改 Vite 构建脚本、操作 Git 提交，必须是严格受控的。',
    description: '懂用户意图不等于有权执行。工具（Tool）不是模型能力的自然延伸，而是需要被严格调度的外部接口。尤其是 Bash，它是“风险放大器”。',
    techDetail: '中断 (Abort) 语义：系统必须记录这个中断状态（Synthetic Result），而不是丢弃。只有因果链完整，AI 才知道“刚才的操作是被强行掐断的”，而不是“已经成功了”。',
    color: 'amber'
  },
  {
    id: 'resilience',
    title: '错误路径与熔断',
    subtitle: 'Resilience',
    frontendParallel: '续写策略（延续任务）与熔断器 (Circuit Breaker)',
    description: '错误不是偶发异常，而是主线路径。当 AI 输出几百行 Vue 代码突然断掉，不要让它“重新总结一遍思路”，直接发指令让它“从半句接着写”。这叫做保住执行叙事的一致性。',
    techDetail: '熔断器 (Circuit Breaker)：当 AI 连续 3 次尝试修复一个 Vue Router 的死循环 Bug 都失败时，不能再让它试了。同一个 ESLint 报错 AI 搞不定，立即停止它，由人类接管。',
    color: 'rose'
  },
  {
    id: 'validation',
    title: '多代理与验证分离',
    subtitle: 'Multi-Agent Verification',
    frontendParallel: '隔离污染：当派发 Agent 去研究一个第三方 Vue 插件文档时，它的乱七八糟的试错上下文必须与主工程（主线程）隔离，防止污染主聊天环境。',
    description: '多代理的本质是给不确定性分区。验证必须独立成阶段，绝不能让系统自己给自己打分。在我们的前端 Harness 中，验证代理不是另一个大模型，而是我们的 CI/CD 与前端基建。',
    techDetail: '物理隔离的验证器 (Checker)：AI 修改完代码，绝不能问它“你确定没问题了吗？”——把基建作为验证节点，报错日志直接灌回给 AI，用冰冷的机器对抗大模型的幻觉。',
    color: 'purple'
  }
]

const activeModule = ref(modules[0])
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
    }
  }, { threshold: 0.1 })
  
  const el = document.getElementById('harness-section')
  if (el) observer.observe(el)
})
</script>

<template>
  <section id="harness-section" class="py-24 relative overflow-hidden bg-[#05050a]">
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div :class="['transition-all duration-1000 transform', isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0']">
        <div class="flex items-center gap-4 mb-2">
          <span class="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-mono tracking-widest uppercase">Kernel Architecture</span>
          <div class="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
        </div>
        <h2 class="text-3xl md:text-5xl font-black text-white mb-6">
          前端视角的 Harness Engineering —— 为 AI 编程引擎构建“工程底盘”
        </h2>
        <div class="text-lg text-white/60 max-w-4xl leading-relaxed mb-16 space-y-4">
          <p class="font-bold text-white/80">🎙️ 0. 引言：为什么我们需要 Harness (安全带/约束)？</p>
          <p>
            现象： 前端圈现在都在吹 Agent（智能体），仿佛只要模型会写 Vue，它就能接管前端工程。但现实是，模型一碰到复杂的依赖、状态管理和打包配置，就会把代码搞成一团乱麻。
          </p>
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p class="text-white italic">
              原书核心论点 (金句)： “一个系统是否可靠，不在于它会不会说，而在于它出了岔子以后，谁来收拾残局。”
            </p>
          </div>
          <p>
            破题： 模型本质上是不稳定的概率分布（它只会预测下一个 Token）。Harness Engineering 探讨的是：不要指望模型变靠谱，而是用工程架构（控制面、上下文治理、权限流、验证分离）把它强行约束成一个靠谱的系统。
          </p>

          <!-- PDF Resources -->
          <div class="flex flex-wrap gap-4 pt-4">
            <a 
              href="/docs/book1-claude-code.pdf" 
              target="_blank"
              class="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
            >
              <div class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <div class="text-xs text-white/40 font-mono uppercase tracking-widest leading-none mb-1">Resource 01</div>
                <div class="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Claude Code 指南.pdf</div>
              </div>
            </a>
            <a 
              href="/docs/book2-comparing.pdf" 
              target="_blank"
              class="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
            >
              <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <div class="text-xs text-white/40 font-mono uppercase tracking-widest leading-none mb-1">Resource 02</div>
                <div class="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Comparing Agents 模型对比.pdf</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Module Selector -->
        <div class="lg:col-span-4 space-y-4">
          <div 
            v-for="mod in modules" 
            :key="mod.id"
            @mouseenter="activeModule = mod"
            :class="[
              'group p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden',
              activeModule.id === mod.id 
                ? `bg-${mod.color}-500/10 border-${mod.color}-500/50 shadow-lg shadow-${mod.color}-500/5` 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            ]"
          >
            <div class="flex items-center gap-4">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                activeModule.id === mod.id ? `bg-${mod.color}-500 text-white` : 'bg-white/10 text-white/40 group-hover:bg-white/20'
              ]">
                <span class="font-mono text-xs font-bold">{{ mod.title.charAt(0) }}</span>
              </div>
              <div class="flex-1">
                <h3 :class="['text-lg font-bold transition-colors', activeModule.id === mod.id ? 'text-white' : 'text-white/60 group-hover:text-white/80']">
                  {{ mod.title }}
                </h3>
                <div class="text-[10px] font-mono tracking-wider opacity-40 uppercase">{{ mod.subtitle }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Display -->
        <div class="lg:col-span-8">
          <div class="sticky top-24 h-full min-h-[500px] p-10 rounded-3xl bg-black/60 backdrop-blur-3xl border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group transition-all duration-500">
            <!-- Dynamic Background Glow -->
            <div 
              class="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] transition-all duration-1000 opacity-20"
              :class="`bg-${activeModule.color}-500`"
            ></div>

            <div>
              <div class="flex items-center gap-3 mb-8">
                <div class="px-3 py-1 rounded-md bg-white/10 text-[10px] font-mono text-white/50 tracking-tighter uppercase">Conceptual Mapping</div>
                <div class="text-white font-bold text-sm tracking-wide">{{ activeModule.frontendParallel }}</div>
              </div>

              <h4 class="text-3xl font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                {{ activeModule.title }}
              </h4>
              
              <div class="prose prose-invert max-w-none">
                <p class="text-white/70 text-lg leading-relaxed mb-8">
                  {{ activeModule.description }}
                </p>
                
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm">
                  <div class="flex items-center gap-2 mb-3 text-white/40">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    <span class="text-[10px] font-bold uppercase tracking-widest">Harness Principle</span>
                  </div>
                  <div class="text-white/90 leading-relaxed italic">
                    {{ activeModule.techDetail }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-12 flex items-center justify-between">
              <div class="flex items-center gap-1">
                <div v-for="i in 5" :key="i" class="w-1 h-1 rounded-full bg-white/20"></div>
                <div class="w-12 h-1 rounded-full ml-2" :class="`bg-${activeModule.color}-500`"></div>
              </div>
              <div class="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Harness Policy // Engineering v3.2</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hardcore Summary -->
      <div class="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent border border-white/10 relative overflow-hidden text-white/80">
        <div class="absolute top-0 right-0 p-8">
          <svg class="w-16 h-16 text-white/5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9v8l10-12h-9l9-8z"/></svg>
        </div>
        
        <h3 class="text-2xl font-bold text-white mb-6">🎯 总结：Harness Engineering 给团队的启示 (Takeaways)</h3>
        <p class="mb-8 text-white/60">这套《Harness Engineering》看似在讲怎么开发一个底层 AI 助手，实际上也是在教我们作为人类工程师，该如何与 AI 建立工程级的协作关系。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex gap-4">
            <div class="text-indigo-500 font-mono font-bold text-lg">01.</div>
            <p class="text-sm leading-relaxed"><strong class="text-white block mb-1">不要把 AI 当同事，把它当不稳定部件</strong> 同事有责任感，模型没有。承认其不可靠是所有工程设计的前提。</p>
          </div>
          <div class="flex gap-4">
            <div class="text-cyan-500 font-mono font-bold text-lg">02.</div>
            <p class="text-sm leading-relaxed"><strong class="text-white block mb-1">制度大于技巧</strong> 个人靠顺手写提示词，团队必须靠工程化（.claudemd 规则底线）落地。</p>
          </div>
          <div class="flex gap-4">
            <div class="text-rose-500 font-mono font-bold text-lg">03.</div>
            <p class="text-sm leading-relaxed"><strong class="text-white block mb-1">隔离与验证</strong> 代码让 AI 写，但裁判必须是我们的前端编译器。</p>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-white/5 space-y-6">
          <div class="text-xl font-bold text-white italic max-w-4xl leading-relaxed">
            Harness Engineering 的终极哲学就是：承认模型的不可靠，通过控制平面、预算治理和严酷的验证流水线，榨取它的价值，同时兜住它的底线！
          </div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="text-white/40 text-sm font-medium italic">
              "一个真正成熟的 AI 编程系统，不在于它写代码时有多像人类，而在于它出 Bug 时，表现得有多像一台冰冷、严密、可控的机器。"
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
                <div class="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-black">AI</div>
              </div>
              <div>
                <div class="text-white font-bold text-sm">Harness Engineering Guide</div>
                <div class="text-white/40 text-xs">Runtime & Constraints Policy v3.2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tailwind dynamic class reference to prevent purging if necessary */
.bg-indigo-500, .bg-cyan-500, .bg-blue-500, .bg-emerald-500, .bg-rose-500, .bg-amber-500, .bg-purple-500 { content: ''; }
.border-indigo-500\/50, .border-cyan-500\/50, .border-blue-500\/50, .border-emerald-500\/50, .border-rose-500\/50, .border-amber-500\/50, .border-purple-500\/50 { content: ''; }
.shadow-indigo-500\/5, .shadow-cyan-500\/5, .shadow-blue-500\/5, .shadow-emerald-500\/5, .shadow-rose-500\/5, .shadow-amber-500\/5, .shadow-purple-500\/5 { content: ''; }
</style>
