<template>
  <div class="academy-intro" :class="`academy-intro--${align}`">
    <h2 class="academy-intro__title">{{ title }}</h2>
    <p v-if="text" class="academy-intro__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  // "center" for the full-width section headers, "start" for split layouts.
  align: { type: String, default: "center" },
});
</script>
