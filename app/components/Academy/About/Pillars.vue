<template>
  <section class="academy-pillars academy-section academy-section--plain-tint">
    <div class="academy-container academy-pillars__inner">
      <h2 v-reveal class="academy-heading">{{ $t("academy.about.pillars_title") }}</h2>

      <div v-reveal.stagger class="academy-pillars__grid">
        <article v-for="pillar in pillars" :key="pillar.key" class="academy-pillars__card">
          <span class="academy-pillars__icon-box">
            <img :src="`/assets/icons/academy/${pillar.icon}.svg`" alt="" width="26" height="26" aria-hidden="true" />
          </span>
          <h3 class="academy-pillars__title">{{ $t(`academy.about.pillar_${pillar.key}_title`) }}</h3>
          <p class="academy-pillars__text">{{ $t(`academy.about.pillar_${pillar.key}_text`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Reading order (start -> end) of the Figma row.
const pillars = [
  { key: "sector", icon: "compass" },
  { key: "linking", icon: "network" },
  { key: "accreditation", icon: "badge-check" },
  { key: "alignment", icon: "chart-no-axes-combined" },
];
</script>
