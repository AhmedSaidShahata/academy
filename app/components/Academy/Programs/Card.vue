<template>
  <article v-tilt class="academy-program" :class="`academy-program--${size}`">
    <div class="academy-program__media" :class="{ 'academy-program__media--contain': contain }">
      <img class="academy-program__image" :src="`/assets/images/academy/program-${program}.jpg`"
        :alt="$t(`academy.programs.${program}_title`)" width="1584" height="672" loading="lazy" />
    </div>

    <div class="academy-program__body">
      <h3 class="academy-program__title">
        <span class="academy-program__name">{{ $t(`academy.programs.${program}_title`) }}</span>
        <span class="academy-program__separator" aria-hidden="true"> - </span>
        <span class="academy-program__role">{{ $t(`academy.programs.${program}_subtitle`) }}</span>
      </h3>
      <p class="academy-program__text">{{ $t(`academy.programs.${program}_text`) }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  program: { type: String, required: true },
  // "feature" (wide, tall image), "stacked" (half-height beside a feature),
  // "quarter" (four across, title and role on separate lines).
  size: { type: String, default: "quarter" },
  // The data-analysis artwork is letterboxed on a grey field in the design.
  contain: { type: Boolean, default: false },
});
</script>
