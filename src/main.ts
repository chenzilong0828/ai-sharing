import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 初始化暗色模式
document.documentElement.classList.add('dark')

createApp(App).mount('#app')
