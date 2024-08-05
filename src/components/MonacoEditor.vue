<!-- 代码编辑器 -->
<template>
  <div id="editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  toRaw,
  withDefaults,
  defineProps,
  onBeforeUnmount,
} from "vue";
import * as monaco from "monaco-editor";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (val: string) => {
    console.log(val);
  },
});

const codeEditorRef = ref();
const editor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  editor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    theme: "vs-dark", // 主题
    automaticLayout: true, // 自动布局
    tabSize: 2, // tab 缩进空格数
    fontSize: 14, // 字体大小
    lineNumbers: "on", // 开启行号
    readOnly: false, // 只读
    colorDecorators: true, // 开启着色
    minimap: {
      enabled: false, // 关闭小地图
    },
  });

  // 监听值变化
  editor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(editor.value).getValue());
  });
});
</script>
