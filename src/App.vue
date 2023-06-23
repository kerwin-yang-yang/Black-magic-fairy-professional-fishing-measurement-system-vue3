<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
<style>
.table-container {
  width: 100%;
  overflow: auto;
  /* 设置最大高度，让表格主体出现纵向滚动条 */
  /* max-height: 400px; */
}

table {
  /* 宽度 100% */
  /* width: 100%; */
  /* 添加表格边框，以便更好地观察效果 */
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #0e0e0e;
}


thead th {
  /* 固定表头位置 */
  position: sticky;
  top: 0;
  /* 背景颜色与字体样式等 */
  /* background-color: #0a0a0a; */
  /* color: #e9ebf0; */
  font-weight: bold;
  /* 添加不透明度 */

  color: #fff;
  background-color: #182234;

}

/* 去除滚动条样式 */
.table-container::-webkit-scrollbar {
  width: 0;
  /* 去除垂直滚动条（水平滚动条同理） */
  height: 0;
  /* 去除水平滚动条（垂直滚动条同理） */
  background-color: transparent;
  /* 设置滚动条背景颜色为透明 */
}

tbody td {
  /* 表格边框样式 */
  border: 1px solid #edf2f7;

}

/* .fixed1 {
    position: sticky;
    color: #fff;
    opacity: 0.5;
    right: 0;
    opacity: 1;
    background-color: #0a0b0b;

}

.fixed2 {
    position: sticky;
    color: #fff;
    background-color: #0a0b0b;
    top: 0;
    right: 0;
    opacity: 1;


} */
</style>