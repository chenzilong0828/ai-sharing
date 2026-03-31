<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  language?: string
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <div class="relative group mt-4 rounded-xl overflow-hidden bg-black/60 border border-white/10">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
      <span class="text-xs text-white/40 font-mono">{{ language || 'text' }}</span>
      <button 
        @click="copyToClipboard"
        class="text-xs px-3 py-1.5 rounded-md transition-all duration-300 font-medium tracking-wide flex items-center gap-1.5"
        :class="copied ? 'bg-[#39ff14]/20 text-[#39ff14]' : 'bg-white/5 text-white/60 hover:bg-white/15 hover:text-white'"
      >
        <span v-if="copied">✓</span>
        {{ copied ? '已复制 Copied!' : '复制 Copy' }}
      </button>
    </div>
    <!-- Code -->
    <div class="p-4 overflow-x-auto">
      <pre class="font-mono text-sm leading-relaxed text-white/80 whitespace-pre-wrap">{{ code }}</pre>
    </div>
  </div>
</template>
