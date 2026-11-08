<template>
  <v-app>
    <LandingLoader />
    <AcademyHeader />
    <div class="academy-header-spacer" aria-hidden="true" />
    <v-main class="pt-0">
      <slot />
    </v-main>
    <AcademyFooter />
  </v-app>
</template>

<script setup>

useHead({
  script: [
    {
      innerHTML: "document.documentElement.classList.add('js-reveal')",
      tagPosition: "head",
    },
  ],
});
</script>
