<script setup lang="ts">
/**
 * 页脚区 - 极简暗色风格
 */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true
})

const conclusions = [
  { 
    icon: '🏗️', 
    text: '工程化的协同范式：从“写代码”升维至“调度 AI”。核心竞争力在于对领域知识的建模、复杂任务的原子化拆解，以及从高层架构视角对 AI 产出进行精确引导与严苛审核。' 
  },
  { 
    icon: '🛡️', 
    text: 'Harness：构建确定的协作底盘：承认大模型的概率性与不稳定性。不依赖“运气”获取代码，而是通过控制平面（.claudemd）、上下文治理与验证流水线，锚定系统的可靠性边界。' 
  },
  { 
    icon: '⚖️', 
    text: '机器对抗幻觉：工具不是能力的延伸，而是受控的接口。利用 MCP 协议、CI/CD 与静态分析工具构建“机器裁判”，用冰冷的工程逻辑对抗大模型的逻辑幻觉。' 
  },
  { 
    icon: '🌌', 
    text: 'AI 原生研发的终极哲学：技术更迭虽快，但工程底座恒久。核心目标是将 AI 潜能转化为标准化的团队生产力，在承认不可靠的前提下，通过制度与工具链实现交付的确定性。' 
  },
]
</script>

<template>
  <footer ref="sectionRef" class="relative py-32 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-14">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8" style="font-family: 'Rajdhani', sans-serif">
          结语：迈向 AI 原生
        </h2>

        <div class="space-y-3">
          <div
            v-for="(item, index) in conclusions"
            :key="item.text"
            class="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.06] p-5 flex items-center gap-4 text-left transition-all duration-700 hover:border-white/15"
            :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <span class="text-2xl flex-shrink-0">{{ item.icon }}</span>
            <p class="text-white/60 text-base">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- 底部分割线 -->
      <div class="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      <!-- 底部信息 -->
      <div class="text-center space-y-3">
        <p class="text-white/15 text-xs font-['JetBrains_Mono']">
          纺织工珍妮的眼泪，只是时代的注脚。
        </p>
      </div>
    </div>
  </footer>
</template>
