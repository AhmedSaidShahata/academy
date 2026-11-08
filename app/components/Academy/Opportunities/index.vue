<template>
  <section id="opportunities" class="academy-opportunities academy-section academy-anchor">
    <div class="academy-container academy-opportunities__inner">
      <AcademySectionIntro v-reveal :title="$t('academy.opportunities.title')"
        :text="$t('academy.opportunities.text')" />

      <div v-reveal.stagger class="academy-opportunities__grid">
        <article v-for="item in items" :key="item" class="academy-opportunities__card">
          <div class="academy-opportunities__head">
            <span class="academy-opportunities__icon-box">
              <img class="academy-opportunities__icon" :src="`/assets/icons/academy/opp-${item}.svg`" alt="" width="48"
                height="48" aria-hidden="true" />
            </span>
            <h3 class="academy-opportunities__title">{{ $t(`academy.opportunities.${item}_title`) }}</h3>
          </div>
          <p class="academy-opportunities__text">{{ $t(`academy.opportunities.${item}_text`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Reading order (start -> end, row by row) of the Figma grid.
const items = ["ai", "data", "media", "trips", "contracts", "languages", "cx", "fintech"];
</script>
