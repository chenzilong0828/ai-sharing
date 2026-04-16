<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
}, { threshold: 0.1 })

const timeline = [
  {
    stage: '规则与小模型补全',
    time: '2022年之前',
    tools: 'Kite、早期 Tabnine、VS IntelliCode',
    type: 'IDE内置功能 / 轻量级插件',
    features: ['基于统计或轻型级深度学习模型，只能进行预测接下来的几个单词或一行代码，相当于高级版的“输入法联想”。'],
    limits: '缺乏逻辑推理能力，无法理解复杂的业务上下文。',
    breakthrough: '',
    color: 'from-slate-500/20 to-transparent',
    dotContext: 'bg-slate-400',
    borderGlow: 'group-hover:border-slate-500/30'
  },
  {
    stage: '网页问答时代：“复制粘贴编程”',
    time: '2022年底-2023初',
    tools: 'ChatGPT (GPT-3.5/4)、Claude、文心一言',
    type: 'Web UI 对话框',
    features: [
      'LLM 展现出惊人的代码生成和 Debug 能力。',
      '在网页端描述需求 → AI生成代码 → 复制到IDE → 报错 → 复制报错回网页 → 再复制回IDE。'
    ],
    limits: '“上下文割裂”与“频繁切换应用”。必须手动将相关的变量、函数名“喂”给AI。',
    breakthrough: '',
    color: 'from-cyan-500/20 to-transparent',
    dotContext: 'bg-cyan-400',
    borderGlow: 'group-hover:border-cyan-500/30'
  },
  {
    stage: '插件时代：AI 走进编辑器',
    time: '2023年',
    tools: 'GitHub Copilot、Codeium、通义灵码',
    type: '侧边栏 Chat + 内联 Ghost Text',
    features: [
      '大厂抢占先机，将大模型能力直接塞进代码编辑器。',
      'AI 终于可以“看到”你当前正在编辑的文件，支持按 Tab 键接受大段代码建议。'
    ],
    breakthrough: '减少了切出 IDE 的频率，工作流连贯性大幅提升。',
    limits: '以单个文件为核心，缺乏对整个工程项目（Codebase）的全局理解能力。',
    color: 'from-indigo-500/20 to-transparent',
    dotContext: 'bg-indigo-400',
    borderGlow: 'group-hover:border-indigo-500/30'
  },
  {
    stage: 'AI 原生 IDE 时代：全局上下文协同',
    time: '2023年底-2024年初',
    tools: 'Cursor、Windsurf、Trae',
    type: '深度融合的 AI 原生编码器',
    features: [
      '全局理解 (Codebase Context)：高性能全局索引 (RAG)，精准回答跨文件架构逻辑。',
      'Diff 视图应用：生成后直接在代码中呈现差异对比，只需点击 Accept。',
      '多文件协同：Composer 推导，一句话需求直接跨多个不同文件实现完整功能修改。'
    ],
    breakthrough: '实现了从“单文件补全”到“全项目对话”的跨越。',
    limits: '主要依赖人类主动发起指令（Human-in-the-loop）。',
    color: 'from-emerald-500/20 to-transparent',
    dotContext: 'bg-emerald-400',
    borderGlow: 'group-hover:border-emerald-500/30'
  },
  {
    stage: 'Agent 时代：“自主研发工程师”',
    time: '2024年初至今',
    tools: 'Claude Code、Aider、Bolt.new',
    type: '终端 CLI + 智能任务调度生态',
    features: [
      'AI 从“助手 (Copilot)”进化为“代理 (Agent)”，实现自主规划与执行。',
      '工具连接协议 (MCP)：支持 AI 自由访问本地数据库、浏览器及第三方 API。',
      '完全闭环机制：高层目标 → 自己拆解任务 → 修改 → 运行测试 → 诊断修复 → 交付验收。'
    ],
    breakthrough: '跨越人类干预阈值，工作流从“AI辅助”转向“AI驱动”。',
    limits: '对于极其复杂的长链条决策仍需人类进行最终质量把关。',
    color: 'from-fuchsia-500/20 to-transparent',
    dotContext: 'bg-fuchsia-400',
    borderGlow: 'group-hover:border-fuchsia-500/40'
  }
]
</script>

<template>
  <section id="timeline" ref="sectionRef" class="relative py-32 px-4 md:px-8 min-h-screen z-10 font-sans">
    <div class="max-w-6xl mx-auto">
      <!-- 头部标题 -->
      <div 
        class="mb-24 transition-all duration-1000 max-w-2xl"
        :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
      >
        <span class="inline-block py-1 pr-4 mb-4 text-white/50 tracking-[0.2em] text-xs uppercase border-b border-white/20">
          History of AI Coding
        </span>
        <h2 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6" style="font-family: 'Rajdhani', sans-serif">
          演进：从辅助到自主
        </h2>
        <p class="text-white/60 text-lg leading-relaxed">
          AI编程发展时间跨度极短，但演进速度宛如“一日千里”。<br/>
          主线清晰可见：<span class="text-white">从“外挂式问答”到“沉浸式融合”，最终演化为“自主型代理（Agent）”。</span>
        </p>
      </div>

      <!-- 时间轴主体（极致左对齐单栏布局方案，适配性强且阅读顺畅） -->
      <div class="relative pl-4 md:pl-0">
        <!-- 绝对发光立柱 (时间线轴心) -->
        <div class="absolute left-[15px] md:left-[140px] top-4 bottom-12 w-[2px] bg-white/5 rounded-full overflow-hidden">
            <div class="w-full absolute top-0 bottom-0 bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/40 to-cyan-500/0 moving-line"></div>
        </div>

        <div class="space-y-12">
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            class="relative flex flex-col md:flex-row items-start group transition-all duration-1000 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- 左侧：时间标识 (Desktop可见，对齐在中线左侧) -->
            <div class="hidden md:block w-[120px] pt-7 pr-8 text-right shrink-0">
              <span class="text-lg font-bold text-white/80 font-mono tracking-tighter">{{ item.time }}</span>
            </div>

            <!-- 中间节点：点亮锚点 (严格居中对齐 2px 中轴线) -->
            <div class="absolute left-[-4px] md:left-[121px] top-8 w-10 h-10 flex items-center justify-center">
              <div 
                class="w-3 h-3 rounded-full relative z-10 transition-all duration-300 group-hover:scale-150 shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                :class="item.dotContext"
              ></div>
              <!-- 爆裂脉冲 -->
              <div class="absolute inset-0 rounded-full animate-ping opacity-20" :class="item.dotContext"></div>
            </div>

            <!-- 移动端适配的时间显示 -->
            <div class="md:hidden pl-[30px] mb-3 pt-6 w-full">
              <span class="text-sm font-bold text-white/50 font-mono tracking-wider border border-white/10 px-3 py-1 bg-white/5 rounded-full">{{ item.time }}</span>
            </div>

            <!-- 右侧：简洁内容卡片 -->
            <div class="pl-[30px] md:pl-10 w-full relative">
              <div 
                class="relative bg-[#07090e]/80 backdrop-blur-2xl border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                :class="item.borderGlow"
              >
                <!-- 卡片内部悬停发光底色 -->
                <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-xl transition-all duration-500 pointer-events-none" :class="item.color"></div>
                
                <div class="relative z-10 flex flex-col gap-4">
                  <!-- 标题头 -->
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 class="text-xl font-bold text-white tracking-tight">{{ item.stage }}</h3>
                    <span class="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded w-fit">{{ item.type }}</span>
                  </div>

                  <!-- 代表工具 -->
                  <div class="text-sm">
                    <span class="text-white/40 mr-2 text-xs border border-white/10 bg-black/20 px-1.5 py-0.5 rounded">工具</span>
                    <span class="text-white/80">{{ item.tools }}</span>
                  </div>

                  <!-- 特征描述 -->
                  <ul class="space-y-2 mt-1">
                    <li v-for="(feature, i) in item.features" :key="i" class="flex gap-2 text-white/70 text-sm leading-relaxed">
                      <span class="text-white/20 mt-0.5">✦</span>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>

                  <!-- 突破与局限 -->
                  <div class="flex flex-col gap-2 mt-2 text-sm" v-if="item.breakthrough || item.limits">
                    <div v-if="item.breakthrough" class="flex gap-2 text-emerald-400/80 bg-emerald-500/5 p-2 rounded">
                      <span class="font-bold">✓</span> 
                      <span>{{ item.breakthrough }}</span>
                    </div>
                    <div v-if="item.limits" class="flex gap-2 text-amber-500/80 bg-amber-500/5 p-2 rounded">
                      <span class="font-bold">⚠</span> 
                      <span>{{ item.limits }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.moving-line {
  background-size: 100% 200%;
  animation: move-down 3s linear infinite;
}

@keyframes move-down {
  0% { background-position: 0% -100%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { background-position: 0% 100%; opacity: 0; }
}
</style>
