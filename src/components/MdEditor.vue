<!--
  Markdown 富文本编辑器组件 在需要的地方引入即可
  @Editor: 用户编辑
  @Viewer: 渲染页面
   -->
<template>
  <Editor
    :style="`z-index: ${zindex}`"
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math-ssr";
import { Editor } from "@bytemd/vue-next";
import "katex/dist/katex.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";
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
interface EditorProps {
  zindex?: number; // 设置图层优先级
  value: string;
  handleChange: (val: string) => void;
  mode?: string;
}

/**
 * 定义属性默认值
 */
const props = withDefaults(defineProps<EditorProps>(), {
  zindex: () => 1,
  value: () => "",
  mode: () => "split",
  handleChange: (val: string) => {
    console.log(val);
  },
});
</script>

<style scoped>
:global(.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child) {
  display: none;
}
</style>
