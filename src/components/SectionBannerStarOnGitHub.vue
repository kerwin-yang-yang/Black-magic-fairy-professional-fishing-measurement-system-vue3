<script setup>
import { mdiGithub } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import SectionBanner from "@/components/SectionBanner.vue";
import { gradientBgPinkRed } from "@/colors";
</script>

<template>
  <SectionBanner :class="gradientBgPinkRed">
    <h1 class="text-3xl text-white mb-6">
      欢迎关注我们的项目---> <b>黑魔仙专业钓鱼测评平台</b> ;-)
    </h1>
    <div>
      <BaseButton href="https://github.com/kerwin-yang-yang/vue3" :icon="mdiGithub" label="GitHub" target="_blank"
        rounded-full />
    </div>
  </SectionBanner>
</template>
