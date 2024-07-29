<!--
  全局通用布局
-->

<template>
  <div id="layout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
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
  background: linear-gradient(to right, #eee, #fff);
  margin-bottom: 16px;
}

#layout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
