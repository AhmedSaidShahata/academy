<template>
  <section id="hero" class="academy-hero academy-anchor">
    <div class="academy-hero__media" aria-hidden="true">
      <img class="academy-hero__image" src="/assets/images/academy/hero.png" alt="" width="2048" height="768"
        fetchpriority="high" />
    </div>

    <div v-reveal.stagger class="academy-hero__content">
      <div class="academy-hero__card">
        <h1 class="academy-hero__title">
          {{ $t("academy.hero.title_lead") }}
          <span class="academy-hero__title-highlight">{{ $t("academy.hero.title_highlight") }}</span>
          <span class="academy-hero__title-tail">{{ $t("academy.hero.title_tail") }}</span>
        </h1>
        <p class="academy-hero__text">{{ $t("academy.hero.text") }}</p>
      </div>

      <div class="academy-hero__actions">
        <AcademyButton :href="registerHref">{{ $t("academy.hero.cta_apply") }}</AcademyButton>
        <AcademyButton variant="outline" href="#international">{{ $t("academy.hero.cta_explore") }}</AcademyButton>
      </div>
    </div>
  </section>
</template>

<script setup>
const { registerHref } = useAcademyLinks();
</script>
