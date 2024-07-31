<!--
  用户通用布局
-->

<template>
  <div id="userLayout">
    <a-layout style="height: 100vh; display: flex; justify-content: center">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" />
          <div>Vue3 万能模版</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a-space>
          <icon-github size="16px" />
          <a
            href="https://github.com/iZhangJz"
            target="_blank"
            style="text-decoration: none; color: black"
          >
            GitHub : iZhangJZ
          </a>
        </a-space>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0 0 / 100% 100%;
}

.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  padding: 16px;
}

.content {
  margin-top: 68px;
  margin-bottom: 28px;
  padding: 24px;
}

.header {
  margin-bottom: 16px;
  padding-top: 22px;
  font-size: 22px;
}

.logo {
  height: 68px;
  vertical-align: top;
}
</style>
