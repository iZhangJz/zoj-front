<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";

/**
 * 全局项目初始化
 */
const doInit = () => {
  console.log("Welcome to my project");
};

onMounted(() => {
  doInit();
});
</script>

<style></style>
