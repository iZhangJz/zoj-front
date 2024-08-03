<!--
  全局通用布局
-->

<template>
  <div id="layout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        ><a-space>
          <icon-github size="16px" />
          <a
            href="https://github.com/iZhangJz"
            target="_blank"
            style="text-decoration: none; color: black"
          >
            GitHub : iZhangJZ
          </a>
        </a-space></a-layout-footer
      >
    </a-layout>
  </div>
</template>

<style scoped>
#layout {
}

#layout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#layout .content {
  margin-bottom: 16px;
  padding: 20px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
