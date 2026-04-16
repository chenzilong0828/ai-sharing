<script setup lang="ts">
/**
 * 3D 土星场景 - V4 终极优化
 *
 * 修复：
 * 1. 粒子融入环面（不再独立图层）
 * 2. 鼠标移动大幅增强（位置+旋转双重响应）
 * 3. 宇宙浩瀚感：多层星空 + 宇宙尘雾 + 深空渐变
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let animationId: number | null = null
let saturnGroup: THREE.Group | null = null
let moons: Array<{ mesh: THREE.Mesh; orbit: number; speed: number; distance: number; inclination: number }> = []

// 鼠标追踪
let targetRotX = 0
let targetRotY = 0
let currentRotX = 0
let currentRotY = 0
// 位置偏移追踪
let targetPosX = 0
let targetPosY = 0
let currentPosX = 0
let currentPosY = 0

// 滚动转场追踪 (Scroll Timeline)
let globalScrollRatio = 0
let targetBasePosX = 12
let targetBasePosY = -5
let targetBasePosZ = 0
let targetBaseRotX = 0.4
let targetBaseRotZ = -0.1

let currentBasePosX = 12
let currentBasePosY = -5
let currentBasePosZ = 0
let currentBaseRotX = 0.4
let currentBaseRotZ = -0.1

const props = defineProps({
  scrollRatio: {
    type: Number,
    default: 0
  }
})

watch(() => props.scrollRatio, (newVal) => {
  globalScrollRatio = Math.max(0, Math.min(1, newVal))
}, { immediate: true })

// ===== FBM 噪声 =====
function pseudoRandom(x: number, y: number): number {
  const dot = x * 12.9898 + y * 78.233
  return ((Math.sin(dot) * 43758.5453123) % 1 + 1) % 1
}
function noise2D(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const a = pseudoRandom(ix, iy), b = pseudoRandom(ix + 1, iy)
  const c = pseudoRandom(ix, iy + 1), d = pseudoRandom(ix + 1, iy + 1)
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x: number, y: number, octaves = 6): number {
  let value = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    value += amp * noise2D(x * freq, y * freq)
    amp *= 0.5; freq *= 2
  }
  return value
}

// ===== 柔和圆形粒子纹理 =====
function createSoftCircle(): THREE.CanvasTexture {
  const s = 64, canvas = document.createElement('canvas')
  canvas.width = s; canvas.height = s
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.7)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.2)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const t = new THREE.CanvasTexture(canvas)
  t.needsUpdate = true
  return t
}

// ===== 土星表面纹理（高对比度横向色带 + FBM 风化条纹，模仿 anna.tf） =====
function createSaturnTexture(): THREE.CanvasTexture {
  const w = 2048, h = 1024
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')!

  // anna.tf 风格：高对比度色带（橄榄/奶油/暗棕交替）
  const stops = [
    [0.00, 60, 55, 42],      // 北极 - 深暗
    [0.05, 95, 88, 65],      // 极地暗带
    [0.10, 155, 142, 105],   // 温带过渡
    [0.14, 120, 110, 80],    // 暗色带 1
    [0.18, 185, 170, 128],   // 亮带
    [0.22, 130, 118, 85],    // 暗色带 2
    [0.26, 200, 185, 140],   // 宽亮带
    [0.32, 160, 148, 108],   // 中暗带
    [0.38, 210, 198, 155],   // 赤道亮带
    [0.42, 140, 128, 92],    // 暗色条纹
    [0.46, 220, 210, 170],   // 赤道最亮
    [0.50, 195, 182, 138],   // 中过渡
    [0.54, 225, 215, 175],   // 亮带
    [0.58, 145, 132, 98],    // 暗色带 3
    [0.62, 205, 192, 148],   // 亮带
    [0.68, 125, 115, 82],    // 宽暗带
    [0.74, 190, 175, 132],   // 温带亮
    [0.80, 152, 140, 102],   // 过渡
    [0.86, 110, 100, 72],    // 深暗带
    [0.92, 85, 78, 58],      // 极地暗
    [1.00, 55, 50, 38],      // 南极 - 最暗
  ]

  // 逐行绘制底色
  for (let y = 0; y < h; y++) {
    const t = y / h
    let c1 = stops[0], c2 = stops[1]
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i][0] && t <= stops[i + 1][0]) { c1 = stops[i]; c2 = stops[i + 1]; break }
    }
    const lt = (t - c1[0]) / (c2[0] - c1[0])
    ctx.fillStyle = `rgb(${c1[1] + (c2[1] - c1[1]) * lt}, ${c1[2] + (c2[2] - c1[2]) * lt}, ${c1[3] + (c2[3] - c1[3]) * lt})`
    ctx.fillRect(0, y, w, 1)
  }

  // FBM 风化条纹（横向拉伸更强，纵向频率更密）
  const img = ctx.getImageData(0, 0, w, h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = fbm(x * 0.002, y * 0.035, 6)
      const v = (n - 0.5) * 55
      const idx = (y * w + x) * 4
      img.data[idx] = Math.max(0, Math.min(255, img.data[idx] + v))
      img.data[idx + 1] = Math.max(0, Math.min(255, img.data[idx + 1] + v * 0.85))
      img.data[idx + 2] = Math.max(0, Math.min(255, img.data[idx + 2] + v * 0.6))
    }
  }
  ctx.putImageData(img, 0, 0)

  // 横向风带细线（更多、更明显）
  for (let i = 0; i < 500; i++) {
    const y = Math.random() * h
    const lineH = Math.random() * 2 + 0.3
    const isDark = Math.random() > 0.5
    if (isDark) {
      ctx.fillStyle = `rgba(${50 + Math.random() * 60}, ${45 + Math.random() * 50}, ${30 + Math.random() * 40}, ${Math.random() * 0.18 + 0.04})`
    } else {
      ctx.fillStyle = `rgba(${180 + Math.random() * 60}, ${170 + Math.random() * 55}, ${130 + Math.random() * 45}, ${Math.random() * 0.15 + 0.03})`
    }
    ctx.fillRect(0, y, w, lineH)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.anisotropy = 4
  return tex
}

// ===== 光环纹理（更亮、更接近 anna.tf 的奶白色调） =====
function createRingTexture(): THREE.CanvasTexture {
  const w = 4096, h = 16
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, w, h)

  const bands = [
    [0, 0.03, 0],
    [0.03, 0.08, 0.15],
    [0.08, 0.15, 0.35],
    [0.15, 0.46, 0.8],      // B环 - 最密
    [0.46, 0.51, 0.02],     // 卡西尼缝
    [0.51, 0.72, 0.65],     // A环
    [0.72, 0.75, 0.02],     // 恩克缝
    [0.75, 0.84, 0.35],
    [0.84, 0.92, 0.1],
    [0.92, 1, 0],
  ]

  for (const [s, e, a] of bands) {
    for (let x = s * w; x < e * w; x++) {
      const lt = (x - s * w) / ((e - s) * w)
      let edge = 1
      if (lt < 0.06) edge = lt / 0.06
      if (lt > 0.94) edge = (1 - lt) / 0.06
      // 更亮的奶白色调
      const bright = 215 + Math.random() * 35
      ctx.fillStyle = `rgba(${bright}, ${bright - 5}, ${bright - 18}, ${a * (0.75 + Math.random() * 0.25) * edge})`
      ctx.fillRect(x, 0, 1, h)
    }
  }

  return new THREE.CanvasTexture(canvas)
}

// ===== Fresnel 大气辉光 =====
function createAtmosphere(radius: number): THREE.Mesh {
  const geo = new THREE.SphereGeometry(radius, 64, 32)
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        float fresnel = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
        fresnel = clamp(fresnel, 0.0, 1.0);
        gl_FragColor = vec4(1.0, 0.92, 0.72, fresnel * 0.35);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
  })
  return new THREE.Mesh(geo, mat)
}

// ===== 环内碎石粒子（25000颗，高密度，高可见度，anna.tf 同款） =====
function createRingParticles(parent: THREE.Group, sprite: THREE.CanvasTexture) {
  const count = 25000
  const innerR = 24, outerR = 52
  const cassiniIn = 32.5, cassiniOut = 33.5
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    let r: number
    do { r = innerR + Math.random() * (outerR - innerR) } while (r > cassiniIn && r < cassiniOut)

    const angle = Math.random() * Math.PI * 2
    // 紧贴环面（极小 Y 偏移）
    const yOff = (Math.random() - 0.5) * 0.12

    positions[i * 3] = Math.cos(angle) * r
    positions[i * 3 + 1] = yOff
    positions[i * 3 + 2] = Math.sin(angle) * r

    // 颜色：偏奶白/暖金（整体更亮，接近 anna.tf 效果）
    const t = (r - innerR) / (outerR - innerR)
    const baseBright = 0.55 + Math.random() * 0.35
    if (t < 0.35) {
      // 内环 - 暖金偏暗
      colors[i * 3] = baseBright * 0.85
      colors[i * 3 + 1] = baseBright * 0.78
      colors[i * 3 + 2] = baseBright * 0.6
    } else if (t < 0.7) {
      // 中环 - 最亮奶白
      colors[i * 3] = baseBright
      colors[i * 3 + 1] = baseBright * 0.95
      colors[i * 3 + 2] = baseBright * 0.82
    } else {
      // 外环 - 灰白
      colors[i * 3] = baseBright * 0.7
      colors[i * 3 + 1] = baseBright * 0.68
      colors[i * 3 + 2] = baseBright * 0.62
    }

    // 随机大小变化（部分大颗粒模拟陨石碎块）
    sizes[i] = Math.random() < 0.05
      ? 0.6 + Math.random() * 0.8  // 5% 大碎块
      : 0.15 + Math.random() * 0.3  // 普通碎石
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // 主粒子层：密集碎石
  const mat = new THREE.PointsMaterial({
    size: 0.35,
    map: sprite,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  })
  const pts = new THREE.Points(geo, mat)
  parent.add(pts)

  // 第二层：更大的稀疏碎块（增加层次感）
  const count2 = 3000
  const pos2 = new Float32Array(count2 * 3)
  const col2 = new Float32Array(count2 * 3)
  for (let i = 0; i < count2; i++) {
    let r: number
    do { r = innerR + Math.random() * (outerR - innerR) } while (r > cassiniIn && r < cassiniOut)
    const angle = Math.random() * Math.PI * 2
    pos2[i * 3] = Math.cos(angle) * r
    pos2[i * 3 + 1] = (Math.random() - 0.5) * 0.2
    pos2[i * 3 + 2] = Math.sin(angle) * r
    const b = 0.6 + Math.random() * 0.35
    col2[i * 3] = b; col2[i * 3 + 1] = b * 0.92; col2[i * 3 + 2] = b * 0.75
  }
  const geo2 = new THREE.BufferGeometry()
  geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3))
  geo2.setAttribute('color', new THREE.BufferAttribute(col2, 3))
  const mat2 = new THREE.PointsMaterial({
    size: 0.7,
    map: sprite,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  })
  parent.add(new THREE.Points(geo2, mat2))

  return pts
}

// ===== 卫星 =====
function createMoon(
  radius: number, color: number, emissive: number,
  orbitDist: number, speed: number, incl: number,
  parent: THREE.Group
) {
  const geo = new THREE.SphereGeometry(radius, 32, 16)
  const mat = new THREE.MeshPhongMaterial({
    color, specular: 0x444444, shininess: 15,
    emissive, emissiveIntensity: 0.12,
  })
  const mesh = new THREE.Mesh(geo, mat)
  parent.add(mesh)
  moons.push({ mesh, orbit: Math.random() * Math.PI * 2, speed, distance: orbitDist, inclination: incl })
}

// ===== 多层宇宙星空 =====
function createCosmicBackground(s: THREE.Scene) {
  const sprite = createSoftCircle()

  // 第一层：远景密集小星（5000颗）
  const count1 = 5000
  const pos1 = new Float32Array(count1 * 3)
  for (let i = 0; i < count1; i++) {
    const r = 150 + Math.random() * 350
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos1[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos1[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos1[i * 3 + 2] = r * Math.cos(phi)
  }
  const geo1 = new THREE.BufferGeometry()
  geo1.setAttribute('position', new THREE.BufferAttribute(pos1, 3))
  const mat1 = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.12, transparent: true,
    opacity: 0.6, sizeAttenuation: true, depthWrite: false,
  })
  s.add(new THREE.Points(geo1, mat1))

  // 第二层：中景亮星（1500颗，稍大）
  const count2 = 1500
  const pos2 = new Float32Array(count2 * 3)
  const col2 = new Float32Array(count2 * 3)
  for (let i = 0; i < count2; i++) {
    const r = 100 + Math.random() * 250
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos2[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos2[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos2[i * 3 + 2] = r * Math.cos(phi)
    // 星星颜色变化：白/蓝/暖黄
    const colorType = Math.random()
    if (colorType < 0.5) {
      col2[i * 3] = 1; col2[i * 3 + 1] = 1; col2[i * 3 + 2] = 1
    } else if (colorType < 0.75) {
      col2[i * 3] = 0.7; col2[i * 3 + 1] = 0.8; col2[i * 3 + 2] = 1
    } else {
      col2[i * 3] = 1; col2[i * 3 + 1] = 0.9; col2[i * 3 + 2] = 0.7
    }
  }
  const geo2 = new THREE.BufferGeometry()
  geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3))
  geo2.setAttribute('color', new THREE.BufferAttribute(col2, 3))
  const mat2 = new THREE.PointsMaterial({
    size: 0.3, transparent: true, opacity: 0.85,
    vertexColors: true, sizeAttenuation: true, depthWrite: false,
  })
  const stars2 = new THREE.Points(geo2, mat2)
  s.add(stars2)

  // 第三层：发光恒星精灵（10颗大亮星）
  const brightStars = [
    { pos: [-60, 35, -120], scale: 3, opacity: 0.6 },
    { pos: [70, 50, -150], scale: 4, opacity: 0.5 },
    { pos: [-90, -30, -100], scale: 2.5, opacity: 0.7 },
    { pos: [50, -40, -130], scale: 3.5, opacity: 0.4 },
    { pos: [100, 25, -80], scale: 2, opacity: 0.55 },
    { pos: [-40, 60, -110], scale: 3, opacity: 0.45 },
    { pos: [30, 70, -160], scale: 2.5, opacity: 0.5 },
    { pos: [-80, -55, -90], scale: 1.8, opacity: 0.6 },
    { pos: [120, -20, -140], scale: 2.2, opacity: 0.35 },
    { pos: [-110, 10, -170], scale: 3, opacity: 0.4 },
  ]

  for (const star of brightStars) {
    const spriteMat = new THREE.SpriteMaterial({
      map: sprite, color: 0xfff8ee, transparent: true,
      opacity: star.opacity, blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const sp = new THREE.Sprite(spriteMat)
    sp.position.set(star.pos[0], star.pos[1], star.pos[2])
    sp.scale.set(star.scale, star.scale, 1)
    s.add(sp)
  }

  // 第四层：宇宙尘雾（几个大型透明球体模拟星云）
  const nebulaColors = [
    { color: 0x1a1030, pos: [-80, 40, -200], scale: 80, opacity: 0.03 },
    { color: 0x0d1a2a, pos: [100, -30, -250], scale: 120, opacity: 0.025 },
    { color: 0x1a0d15, pos: [0, 60, -180], scale: 100, opacity: 0.02 },
  ]

  for (const neb of nebulaColors) {
    const g = new THREE.SphereGeometry(neb.scale, 16, 8)
    const m = new THREE.MeshBasicMaterial({
      color: neb.color, transparent: true, opacity: neb.opacity,
      side: THREE.BackSide, depthWrite: false,
    })
    const mesh = new THREE.Mesh(g, m)
    mesh.position.set(neb.pos[0], neb.pos[1], neb.pos[2])
    s.add(mesh)
  }

  return stars2
}

// ===== 初始化 =====
function initScene() {
  const container = containerRef.value
  if (!container) return

  const w = window.innerWidth
  const h = window.innerHeight

  scene = new THREE.Scene()
  // 深邃太空背景色（略带深蓝，不是纯黑）
  scene.background = new THREE.Color(0x020208)
  // 不启用 fog，保持宇宙无限感

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 800)
  camera.position.set(0, 12, 75)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.appendChild(renderer.domElement)

  // ====== 土星组 ======
  saturnGroup = new THREE.Group()
  saturnGroup.rotation.x = 0.4
  saturnGroup.rotation.z = -0.1
  saturnGroup.position.set(12, -5, 0)
  scene.add(saturnGroup)

  // ====== 土星球体 ======
  const saturnGeo = new THREE.SphereGeometry(20, 128, 128)
  const saturnMat = new THREE.MeshPhongMaterial({
    map: createSaturnTexture(),
    specular: new THREE.Color(0xffffee),
    shininess: 30,
    emissive: new THREE.Color(0x1a1408),
    emissiveIntensity: 0.08,
  })
  saturnGroup.add(new THREE.Mesh(saturnGeo, saturnMat))

  // ====== 大气 Fresnel ======
  saturnGroup.add(createAtmosphere(20.5))

  // ====== 固体环面 ======
  const ringGeo = new THREE.RingGeometry(24, 52, 256)
  const tmp = new THREE.Vector3()
  const rPos = ringGeo.attributes.position
  const rUv = ringGeo.attributes.uv
  for (let i = 0; i < rPos.count; i++) {
    tmp.fromBufferAttribute(rPos, i)
    rUv.setXY(i, (tmp.length() - 24) / 28, 0.5)
  }
  const ringMat = new THREE.MeshPhongMaterial({
    map: createRingTexture(),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    specular: new THREE.Color(0x555544),
    shininess: 5,
  })
  const ringMesh = new THREE.Mesh(ringGeo, ringMat)
  ringMesh.rotation.x = -Math.PI / 2
  saturnGroup.add(ringMesh)

  // ====== 环粒子（和环面同坐标系） ======
  const sprTex = createSoftCircle()
  createRingParticles(saturnGroup, sprTex)

  // ====== 卫星 ======
  createMoon(0.8, 0xeeeeff, 0x111122, 58, 0.4, 0.02, saturnGroup)
  createMoon(1.2, 0xaaaaaa, 0x0a0a0a, 68, 0.25, -0.05, saturnGroup)
  createMoon(3.5, 0xffaa55, 0x331800, 82, 0.15, 0.08, saturnGroup)

  // ====== 光照 ======
  scene.add(new THREE.DirectionalLight(0xfff5dd, 2.8).translateX(60).translateY(40).translateZ(50))
  const specL = new THREE.PointLight(0xffffff, 3000, 200, 2)
  specL.position.set(50, 30, 60)
  scene.add(specL)
  scene.add(new THREE.DirectionalLight(0x2244aa, 0.4).translateX(-40).translateY(-10).translateZ(-30))
  scene.add(new THREE.DirectionalLight(0x445566, 0.3).translateX(-30).translateY(20).translateZ(10))
  scene.add(new THREE.AmbientLight(0x111118, 0.5))

  // ====== 宇宙背景 ======
  const starField = createCosmicBackground(scene)

  // ====== 动画 ======
  const clock = new THREE.Clock()

  const calculateScrollTargets = () => {
    // Scene 0: Hero (右下)
    if (globalScrollRatio < 0.1) {
      const t = globalScrollRatio / 0.1
      targetBasePosX = 12 + t * (4)         // 12 -> 16 (移向更边缘)
      targetBasePosY = -5 + t * (-5)
      targetBasePosZ = 0 + t * (-20)
      targetBaseRotX = 0.4 + t * 0.1
      targetBaseRotZ = -0.1
    } 
    // Scene 1: Practice / Intro (迅速推远至左上方极深空)
    else if (globalScrollRatio < 0.45) {
      const t = (globalScrollRatio - 0.1) / 0.35
      targetBasePosX = 16 + t * (-90)       // 16 -> -74 (极左)
      targetBasePosY = -10 + t * (50)       // -10 -> +40 (极高)
      targetBasePosZ = -20 + t * (-120)     // 退离很远 (极小)
      targetBaseRotX = 0.5 + t * 0.8        // 翻转光环
      targetBaseRotZ = -0.1 + t * 0.4
    }
    // Scene 2: Rules / MCP (右下，作为托盘)
    else if (globalScrollRatio < 0.75) {
      const t = (globalScrollRatio - 0.45) / 0.3
      targetBasePosX = -74 + t * (110)      // -74 -> 36
      targetBasePosY = 40 + t * (-70)       // 40 -> -30
      targetBasePosZ = -140 + t * (100)     // 拉近
      targetBaseRotX = 1.3 + t * (-0.8)
      targetBaseRotZ = 0.3 + t * (-0.5)
    }
    // Scene 3: Skills / Footer (正下方巨大地平线)
    else {
      const t = Math.min((globalScrollRatio - 0.75) / 0.25, 1.0)
      targetBasePosX = 36 + t * (-36)       // 36 -> 0
      targetBasePosY = -30 + t * (-10)      // -30 -> -40
      targetBasePosZ = -40 + t * (25)       // 最近
      targetBaseRotX = 0.5 + t * (-0.3)
      targetBaseRotZ = -0.2 + t * 0.2
    }
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()

    calculateScrollTargets()

    // 基础缓动插值 (Lerp Base Transforms)
    currentBasePosX += (targetBasePosX - currentBasePosX) * 0.05
    currentBasePosY += (targetBasePosY - currentBasePosY) * 0.05
    currentBasePosZ += (targetBasePosZ - currentBasePosZ) * 0.05
    currentBaseRotX += (targetBaseRotX - currentBaseRotX) * 0.05
    currentBaseRotZ += (targetBaseRotZ - currentBaseRotZ) * 0.05

    // 平滑鼠标跟随（旋转）
    currentRotX += (targetRotX - currentRotX) * 0.03
    currentRotY += (targetRotY - currentRotY) * 0.03

    // 平滑鼠标跟随（位置偏移）
    currentPosX += (targetPosX - currentPosX) * 0.025
    currentPosY += (targetPosY - currentPosY) * 0.025

    if (saturnGroup) {
      // 旋转响应 = 基础滚动旋转 + 鼠标随动 + 重力自转
      saturnGroup.rotation.x = currentBaseRotX + currentRotX * 0.6
      saturnGroup.rotation.y += 0.0005
      saturnGroup.rotation.y += currentRotY * 0.003
      saturnGroup.rotation.z = currentBaseRotZ

      // 位置响应 = 基础滚动位移 + 鼠标视差位移 + 呼吸浮动
      saturnGroup.position.x = currentBasePosX + currentPosX * 8
      saturnGroup.position.y = currentBasePosY + currentPosY * 5 + Math.sin(elapsed * 0.25) * 0.6
      saturnGroup.position.z = currentBasePosZ
    }

    // 卫星轨道
    for (const m of moons) {
      m.orbit += m.speed * 0.008
      m.mesh.position.set(
        Math.cos(m.orbit) * m.distance,
        Math.sin(m.orbit * 0.7) * m.distance * m.inclination,
        Math.sin(m.orbit) * m.distance,
      )
      m.mesh.rotation.y += 0.01
    }

    if (starField) starField.rotation.y += 0.00003

    renderer?.render(scene!, camera!)
  }

  animate()
}

// === 事件 ===
const handleMouseMove = (e: MouseEvent) => {
  const nx = e.clientX / window.innerWidth - 0.5   // -0.5 ~ 0.5
  const ny = e.clientY / window.innerHeight - 0.5

  // 旋转目标
  targetRotX = ny
  targetRotY = nx

  // 位置偏移目标（模仿 anna.tf 的整体位移感）
  targetPosX = nx
  targetPosY = -ny
}

const handleResize = () => {
  if (!renderer || !camera) return
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

onMounted(() => {
  initScene()
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  if (animationId) cancelAnimationFrame(animationId)
  moons = []

  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
    renderer = null
  }

  if (scene) {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        const ms = Array.isArray(obj.material) ? obj.material : [obj.material]
        ms.forEach((m) => { if (m.map) m.map.dispose(); m.dispose() })
      }
      if (obj instanceof THREE.Points) {
        obj.geometry.dispose()
        const pm = obj.material as THREE.PointsMaterial
        pm.map?.dispose(); pm.dispose()
      }
      if (obj instanceof THREE.Sprite) {
        const sm = obj.material as THREE.SpriteMaterial
        sm.map?.dispose(); sm.dispose()
      }
    })
    scene = null
  }
})
</script>

<template>
  <div ref="containerRef" class="fixed inset-0 z-0" aria-hidden="true" style="pointer-events: none" />
</template>
