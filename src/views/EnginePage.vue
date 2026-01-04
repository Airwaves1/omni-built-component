<template>
  <div class="engine-page">
    <div class="header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2 class="page-title">{{ projectName }}</h2>
    </div>
    <div class="engine-wrapper">
      <EngineComponent 
        ref="engineRef" 
        :config="engineConfig" 
        :show-top-menu="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EngineComponent from '../omni-engine/components/EngineComponent.vue'
import { AssetsManager } from '../omni-engine/core/AssetsManager'

const router = useRouter()
const route = useRoute()
const engineRef = ref()

const projectId = computed(() => route.params.id)

// 从路由 state 获取项目配置
const project = computed(() => {
  if (window.history.state && window.history.state.project) {
    return window.history.state.project
  }
  return null
})

const projectName = computed(() => {
  return project.value ? project.value.name : 'Unknown Project'
})

const engineConfig = computed(() => {
  return project.value ? project.value.config : {}
})

const projectAssets = computed(() => {
  return project.value ? project.value.assets : null
})

onMounted(async () => {
  if (!project.value) {
    console.warn('[EnginePage] Project not found, redirecting to home')
    router.push('/')
    return
  }

  await AssetsManager.getInstance().init('/utils/ifc/', '/utils/ifc/worker.mjs')

  if (engineRef.value && projectAssets.value) {
    engineRef.value.loadAssets(projectId.value, projectAssets.value)
  }
})

onBeforeUnmount(async () => {
  // 清理引擎组件资源（会触发所有 ViewPanel 的清理）
  if (engineRef.value && engineRef.value.dispose) {
    await engineRef.value.dispose()
  }
  
  // 确保资源被清理
  if (projectId.value) {
    const assetsManager = AssetsManager.getInstance()
    // 检查资源是否还存在，如果存在则清理
    if (assetsManager.getAsset(projectId.value)) {
      assetsManager.removeAsset(projectId.value)
    }
  }
})

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.engine-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 3rem;
  background: rgba(15, 23, 42, 0.9);
  border-bottom: 1px solid rgba(51, 65, 85, 0.7);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  z-index: 999;
  flex-shrink: 0;
  position: relative;
}

.engine-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.back-btn {
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.7);
  color: #cbd5e1;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(51, 65, 85, 0.7);
  color: #f1f5f9;
}

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}
</style>

