<!--
  Markdown 富文本编辑器组件 在需要的地方引入即可
  @Editor: 用户编辑
  @Viewer: 渲染页面
   -->
<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math-ssr";
import "katex/dist/katex.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

const plugins = [
  gfm(),
  highlight(),
  math(),
  // TODO Add more plugins here 可以根据需要添加插件
];

/**
 * 定义编辑器组件的属性
 */
interface ViewerProps {
  value: string;
}

/**
 * 定义属性默认值
 */
const props = withDefaults(defineProps<ViewerProps>(), {
  value: () => "",
});
</script>

<style scoped>
:global(.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child) {
  display: none;
}
</style>
