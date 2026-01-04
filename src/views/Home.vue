<template>
  <div class="home-container">
    <h1 class="title">OmniBuilt Projects</h1>
    <div class="project-list">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-item"
        @click="goToEngine(project)"
      >
        <div class="project-name">{{ project.name }}</div>
        <div class="project-desc">{{ project.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const projects = [
  {
    id: 'scaffold',
    name: 'Scaffold',
    description: '脚手架项目 - IFC + Splat + Point Cloud',
    config: {
      splat: {
        position: [2.96054987, 1.31907451, 1.03753001],
        quaternion: [0.24284361, 0.00313141, 0.96936743, 0.03666006],
        scale: 0.7035695535579944
      }
    },
    assets: {
      ifc: '/data/scaffold/clp.ifc',
      splat: '/data/scaffold/clp.ply',
      pointcloud: '/data/scaffold/metadata.json'
    }
  }
]

function goToEngine(project) {
  // 通过路由 state 传递完整的项目配置
  router.push({
    path: `/engine/${project.id}`,
    state: { project }
  })
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 2rem;
  background: #0e131a;
  color: #f1f5f9;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #f1f5f9;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.project-item {
  padding: 1.5rem;
  background: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.7);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.project-item:hover {
  background: #334155;
  border-color: rgba(14, 165, 233, 0.5);
  transform: translateY(-2px);
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
}

.project-desc {
  font-size: 0.875rem;
  color: #94a3b8;
}
</style>

