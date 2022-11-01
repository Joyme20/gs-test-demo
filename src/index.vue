<template>
  <div class="modelEdit">
    <!-- <component :is="componentName" /> -->
    <!-- <test-project></test-project> -->
    <div class="header">
      <!-- <img
          src="@/assets/images/projectLogo.png"
          height="25"
          width="auto"
      /> -->
      <span class="model-name">测试</span>
      <!-- <el-divider direction="vertical" /> -->
      <span class="model-name">{{ modelName }}</span>

      <!-- <el-button @click="addHoleClick">test</el-button> -->
    </div>
    <div style="display: flex; height: 100%">
      <div class="demo-list">
        <div
          class="demo-item"
          v-for="(component, name) in components"
          :key="name"
          @click="demoClick(component)"
        >
          <div>{{ name }}</div>
          <!-- <component :is="com"></component> -->
        </div>
      </div>

      <!-- <viewer-wrapper elementId="viewer" style="flex: 1" /> -->
      <component :is="currentComponent" style="flex: 1"></component>

      <!-- <viewer-wrapper elementId="viewer2" style="flex: 1" /> -->
      <!-- <viewerWrapper elementId="viewer2" style="flex: 1" v-if="isShow" /> -->
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped>
.modelEdit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.demo-list {
  width: 150px;
}
.demo-item {
  cursor: pointer;
}
</style>
