<script setup lang="ts">
/**
 * 全屏粒子场背景效果
 * 使用 Canvas 2D 绘制运动粒子，带鼠标交互
 */
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = window.innerWidth
  let height = window.innerHeight
  canvas.width = width
  canvas.height = height

  const colors = ['#00f0ff', '#b026ff', '#ff2d95', '#39ff14']
  const particles: Particle[] = []
  const particleCount = Math.min(80, Math.floor((width * height) / 20000))

  // 初始化粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  let mouseX = -1000
  let mouseY = -1000

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  window.addEventListener('mousemove', handleMouseMove)

  const animate = () => {
    ctx.clearRect(0, 0, width, height)

    particles.forEach((p, i) => {
      // 鼠标排斥效果
      const dx = p.x - mouseX
      const dy = p.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const force = (150 - dist) / 150
        p.vx += (dx / dist) * force * 0.3
        p.vy += (dy / dist) * force * 0.3
      }

      // 阻尼
      p.vx *= 0.99
      p.vy *= 0.99

      p.x += p.vx
      p.y += p.vy

      // 边界反弹
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      // 绘制粒子
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity
      ctx.fill()

      // 粒子连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx2 = p.x - p2.x
        const dy2 = p.y - p2.y
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
        if (dist2 < 120) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = p.color
          ctx.globalAlpha = (1 - dist2 / 120) * 0.15
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    })

    ctx.globalAlpha = 1
    animationId = requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  window.addEventListener('resize', handleResize)

  // 保存清理引用
  ;(canvas as any).__cleanup = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  const canvas = canvasRef.value
  if (canvas && (canvas as any).__cleanup) {
    ;(canvas as any).__cleanup()
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 z-0 pointer-events-none"
    aria-hidden="true"
  />
</template>
