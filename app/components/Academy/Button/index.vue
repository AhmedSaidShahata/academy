<template>
  <AcademyLink :href="href" class="academy-button" :class="`academy-button--${variant}`">
    <slot />
  </AcademyLink>
</template>

<script setup>
defineProps({
  href: { type: String, required: true },
  // "primary" = filled purple, "outline" = white with a purple border.
  variant: { type: String, default: "primary" },
});
</script>
