<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

// Modal state
const isModalOpen = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const openDoc = async (path: string | undefined, title: string) => {
  if (!path) return
  modalTitle.value = title
  modalContent.value = 'Loading source code...'
  isModalOpen.value = true
  
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Network response was not ok')
    const text = await res.text()
    modalContent.value = text
  } catch (e) {
    modalContent.value = '// Load failed.\n// Please check if the markdown files are in the public/docs folder.'
  }
}

const closeModal = () => {
  isModalOpen.value = false
  modalContent.value = ''
}

const groups = [
  {
    title: '🧠 灵魂注入: SKILL.md',
    subtitle: 'HTW-Table 首席专家身份与基石原则',
    content: '通过解析技能设定文件，确立 AI 的架构信仰。强制要求遵循 AURA-X-KYS 原则（KISS、YAGNI、SOLID），要求“配置即 UI”，彻底解耦视图和逻辑层，并且严格禁止随意生成冗余的表格分页组件代码。',
    clickable: true,
    docPath: '/docs/gen-crud-skill.md'
  },
  {
    title: '⛓️ 执行框架: workflow/gen-curd.md',
    subtitle: '标准化的四步强制纯文本向导',
    content: '不再是一键盲猜生成的灾难。系统通过标准 4 步强制拦截对话：1.确认业务实体 -> 2.绑定接口路径 -> 3.精简功能矩阵 -> 4.选定数据列与文件生成。步步为营，确保收集到的需求没有任何二义性。',
    clickable: true,
    docPath: '/docs/gen-crud-workflow.md'
  },
  {
    title: '🚀 实操协同',
    subtitle: '1 + 1 > 2 的极速编码流',
    content: '用户只需要输入 `/gen-crud` 或表达新建增删改查页面意图，系统即刻化身专家。按照一问一答的友好交互最终一键直达，直接利用 write_to_file 写入最干净、可维护性极高的 <htw-table> 规范模板，杜绝后续重构成本。',
    clickable: false
  }
]
</script>

<template>
  <section ref="sectionRef" class="relative py-32 px-6 z-10 w-full overflow-hidden">
    <!-- 背景流光特效 -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div class="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]" />
      <div class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- 模块标题 -->
      <div
        class="text-center mb-24 transition-all duration-1000 transform"
        :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-12 opacity-0': !isVisible }"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span class="text-xs font-mono text-cyan-400 tracking-wider">PRACTICAL DEMO</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style="font-family: 'Rajdhani', sans-serif">
          实操演示 <span class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">代码自动生成</span>
        </h2>
        <p class="text-white/60 text-lg max-w-2xl mx-auto">
          3 组短视频全面解析：从制定底层规则、触发强制向导到最终极速协同生成。
        </p>
      </div>

      <!-- 3组交错视图 (Zig-zag) -->
      <div class="flex flex-col gap-32">
        <div
          v-for="(group, index) in groups"
          :key="index"
          class="flex flex-col lg:flex-row gap-12 items-center transition-all duration-1000 transform"
          :class="[
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
             index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          ]"
          :style="{ transitionDelay: `${index * 200}ms` }"
        >
          <!-- 视频占位区 -->
          <div class="flex-1 w-full relative">
            <div class="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-900/10 hover:border-cyan-500/30 transition-colors duration-500">
              <!-- 控制栏 -->
              <div class="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div class="ml-auto text-[10px] text-white/30 font-mono">
                  > demo_part_{{ index + 1 }}.mp4
                </div>
              </div>
              
              <!-- 视频区域 -->
              <div class="relative aspect-video bg-[#050508] flex items-center justify-center">
                <!-- <video :src="group.videoSrc" controls class="w-full h-full object-cover"></video> -->
                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                  <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110 group-hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-cyan-100 border-b-[10px] border-b-transparent ml-2"></div>
                  </div>
                  <p class="mt-4 text-xs font-mono text-cyan-400/60 tracking-widest">VIDEO_SOURCE_{{ index + 1 }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 文本解析卡片区 -->
          <div class="flex-1 w-full flex flex-col justify-center">
            <!-- 带有交互行为的卡片 -->
            <div 
              class="relative rounded-2xl bg-white/[0.02] border p-8 transition-all duration-300 group"
              :class="[
                group.clickable ? 'cursor-pointer border-white/[0.08] hover:bg-white/[0.04] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-white/[0.05]'
              ]"
              @click="group.clickable && openDoc(group.docPath, group.title)"
            >
              <h3 class="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                {{ group.title }}
              </h3>
              <p class="text-sm font-mono text-cyan-400 mb-6 tracking-wider">{{ group.subtitle }}</p>
              <p class="text-white/65 text-base leading-relaxed">
                {{ group.content }}
              </p>

              <!-- 仅可点击项才显示提示语 -->
              <div v-if="group.clickable" class="mt-8 flex items-center gap-2 text-cyan-400/80 font-mono text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                <span class="text-lg">➔</span> <span>点击查看完整文件源码</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏 Markdown 源码阅读弹窗 -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- 遮罩层 -->
        <div 
          class="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
          @click="closeModal"
        ></div>
        
        <!-- 弹窗主体 -->
        <div class="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0F] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <!-- 弹窗顶栏 -->
          <div class="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
            <h4 class="text-white/90 font-mono text-sm tracking-wider flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {{ modalTitle }}
            </h4>
            <button 
              @click="closeModal"
              class="text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- 源码阅读区 -->
          <div class="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <pre class="font-mono text-[13px] sm:text-sm leading-relaxed text-cyan-300/90 whitespace-pre-wrap font-light tab-size-2">{{ modalContent }}</pre>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
/* 定义弹窗的微动效 */
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 美化内部滚动条 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
