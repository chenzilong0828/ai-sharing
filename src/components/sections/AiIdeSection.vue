<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

interface AiIde {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  themeColor: string
  icon: string
  href?: string
}

const ides: AiIde[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: '全球 AI IDE 标杆与风向标，基于 VS Code 强分叉打造的革命性编码器。',
    pros: ['Composer 心智极其成熟，多文件推理无敌', 'Cursor Tab 补全精准，VS Code 生态无缝继承'],
    cons: ['订阅费用较高 (Pro版)', '强依赖云端，高密级企业可能有隐私顾虑'],
    themeColor: 'from-blue-500/20 to-blue-900/10 border-blue-500/30',
    icon: `<img src="https://th.bing.com/th/id/ODF.kTG-_hIIG6V3DEu1dDQGdg?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Cursor Logo" class="w-full h-full object-contain drop-shadow-lg" />`,
    href: 'https://docs.cursor.ac.cn/get-started/welcome'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'Codeium 出品的超级新星，目前极具竞争力的“最快”上下文深度接驳引擎。',
    pros: ['首创 Cascade 流式全栈理解，上下文穿透极强', '极低幻觉响应速度极快，自带顶流引擎底层驱动'],
    cons: ['快捷组合与交互习惯需重新适应', '插件商店与细节生态仍在追赶状态'],
    themeColor: 'from-cyan-500/20 to-teal-900/10 border-cyan-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.6EhekcoQt58d76Y3DAJRFQ?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" alt="Windsurf Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://codeium.com/windsurf'
  },
  {
    id: 'trae',
    name: 'Trae',
    description: '字节跳动倾情推出的强劲良心大作，国内网络穿透力最强的生产力伴侣。',
    pros: ['完全免费全拉满，不设卡点的爽快体验', '火山引联合大模型加持，原生中文沟通极其懂梗'],
    cons: ['处于快速迭代期，某些极限重构场景略显浮躁', '功能边界与竞品仍有补全空间'],
    themeColor: 'from-indigo-500/20 to-purple-900/10 border-indigo-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.YIp5-bd6aV_n2t3WPPiW7w?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Trae Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://www.trae.ai/'
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    description: 'Google 深层架构驱动的原生高维智能体系统 (Agentic Coding)，降维打击的存在。',
    pros: ['自动接管终端操作与文件树读写，无需干预', '超深度逻辑推理闭环，甚至能自我规划纠错并执行'],
    cons: ['过于强大导致不适（操作人员有被全盘取代的幻觉）', '重型算力消耗，"过拟合智能"有时需要被动干预'],
    themeColor: 'from-emerald-500/20 to-green-900/10 border-emerald-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.LTJ4UWtPwq1QbgrMxsZ5qA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" alt="Antigravity Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://deepmind.google/technologies/gemini/'
  },
  {
    id: 'void',
    name: 'Void',
    description: '极客专属的隐私至上、开源自由编辑器，为本地算力狂热者打造。',
    pros: ['完全开源代码底层，数据绝不上传云端', '完美兼容 Ollama 本地模型与私有接口，白嫖福音'],
    cons: ['UI 细节打磨和开箱即用度极需改善', '没有资金强推的商业级专属服务器护航'],
    themeColor: 'from-zinc-500/20 to-gray-900/10 border-zinc-500/30',
    icon: '<img src="https://voideditor.com/void/logo_cube_noshadow.png" alt="Void Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://voideditor.com/'
  },
  {
    id: 'warp',
    name: 'Warp',
    description: '使用 Rust 构筑并辅以 GPU 渲染硬件加速的二十一世纪 AI Terminal 工作流。',
    pros: ['区块化 (Block) 的输入输出层级体验极佳', 'AI 命令精准生成引擎，出错一键溯源修正重构'],
    cons: ['定位为终端工具，并不足以承担完整项目代码主导', '仍有账号注册墙限制'],
    themeColor: 'from-orange-500/20 to-red-900/10 border-orange-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.o7PqMmfhkvgGgIhlekG3yQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Warp Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://docs.warp.dev/'
  },
  {
    id: 'kiro',
    name: 'Kiro',
    description: '小众但高度开放的探索化派系 AI 层级集成（可插拔模型端结构）。',
    pros: ['结构极度解耦，允许开发者随心切换多端引擎', '轻量级调度资源负担小'],
    cons: ['缺乏中心化的极强生态维护，操作文档较少', '需要一定的折腾精神进行环境微调'],
    themeColor: 'from-pink-500/20 to-rose-900/10 border-pink-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.zDTT7_I5Se-Xx-pddVf_lQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="Kiro Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://kiro.dev/docs'
  },
  {
    id: 'opencode',
    name: 'openCode',
    description: '打破一切大厂模型屏障的去中心化开放矩阵，拥抱纯粹代码世界的工具链组合。',
    pros: ['拒绝单一供应商锁定（Vendor Lock-in）', '架构透明，自由拼接各式开源增强插件'],
    cons: ['配置门槛极高，API Key 管理与链式通讯极其繁杂', '部分能力缺乏官方精细打磨兜底'],
    themeColor: 'from-fuchsia-500/20 to-purple-900/10 border-fuchsia-500/30',
    icon: '<img src="https://th.bing.com/th/id/ODF.b79p6WW7zIomJakbm-Jvcw?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2" alt="openCode Logo" class="w-full h-full object-contain drop-shadow-lg" />',
    href: 'https://opencode.ai/docs'
  }
]
</script>

<template>
  <section id="ides" ref="sectionRef" class="relative py-32 px-6 min-h-screen z-10">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16" :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-12': !isVisible }" style="transition: all 1s ease 0.1s;">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
          <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          00 // Overview 引擎库
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Rajdhani', sans-serif">全球核心 AI IDE 矩阵</h2>
        <p class="text-white/40 text-base max-w-2xl mx-auto">
          脱离干杂数字的虚浮，我们为您全景剖析当今生产力战场中最具统治力的八大兵器。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <component 
          :is="ide.href ? 'a' : 'div'"
          :href="ide.href"
          :target="ide.href ? '_blank' : undefined"
          :rel="ide.href ? 'noopener noreferrer' : undefined"
          v-for="(ide, index) in ides" 
          :key="ide.id"
          class="group animated-border-card rounded-2xl flex flex-col h-full bg-[#0a0a0f] border border-white/[0.06] hover:border-transparent transition-all duration-500 relative overflow-hidden"
          :class="['opacity-0 translate-y-12', isVisible ? 'opacity-100 translate-y-0' : '', ide.themeColor, ide.href ? 'cursor-pointer hover:shadow-2xl hover:shadow-[var(--tw-shadow-color)]' : '']"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- 内层 Mask 盖住动画发光层，仅留出 1px 发光缝隙 -->
          <div class="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-[#0a0a0f]/90 backdrop-blur-3xl z-0 transition-colors pointer-events-none"></div>

          <!-- Glow Overlay -->
          <div class="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-0" :class="ide.themeColor"></div>
          
          <div class="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <!-- 图片专属的透明背景去边框容器 -->
              <div class="w-9 h-9 flex items-center justify-center text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500" v-html="ide.icon"></div>
              <h3 class="text-2xl font-bold text-white tracking-tight" style="font-family: 'Rajdhani', sans-serif">{{ ide.name }}</h3>
            </div>
            <span class="text-[10px] font-mono border border-white/20 text-white/50 px-2 flex justify-center items-center py-1 rounded-full group-hover:text-white group-hover:border-white/50 transition-colors">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          
          <div class="p-6 flex-1 flex flex-col relative z-10">
            <p class="text-white/60 text-sm leading-relaxed mb-8 flex-1">
              {{ ide.description }}
            </p>

            <div class="space-y-6">
              <!-- Pros -->
              <div>
                <h4 class="text-xs font-mono text-emerald-400 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  杀招 (Advantages)
                </h4>
                <ul class="space-y-2">
                  <li v-for="pro in ide.pros" :key="pro" class="text-white/80 text-xs flex items-start pl-2">
                    <span class="mr-2 mt-1 text-emerald-500/50 block">•</span>
                    <span class="leading-relaxed">{{ pro }}</span>
                  </li>
                </ul>
              </div>

              <!-- Cons -->
              <div>
                <h4 class="text-xs font-mono text-rose-400 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  掣肘 (Disadvantages)
                </h4>
                <ul class="space-y-2">
                  <li v-for="con in ide.cons" :key="con" class="text-white/60 text-xs flex items-start pl-2">
                    <span class="mr-2 mt-1 text-rose-500/50 block">•</span>
                    <span class="leading-relaxed">{{ con }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes border-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.animated-border-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250%;
  height: 250%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 60%,
    #ec4899 75%, /* pink */
    #a855f7 85%, /* purple */
    #3b82f6 95%, /* blue */
    #10b981 100% /* emerald */
  );
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  z-index: 0;
}

.animated-border-card:hover::before {
  opacity: 1;
  animation: border-spin 4s linear infinite;
}
</style>
