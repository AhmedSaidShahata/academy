<template>
  <section id="pathways" class="academy-pathways academy-section academy-anchor">
    <div class="academy-container academy-pathways__inner">
      <h2 v-reveal class="academy-heading">{{ $t("academy.about.pathways_title") }}</h2>

      <div v-reveal.stagger class="academy-pathways__grid">
        <article v-for="(pathway, index) in pathways" :key="pathway.key" class="academy-pathways__card"
          :class="{ 'academy-pathways__card--featured': pathway.featured }">
          <div class="academy-pathways__id">
            <span class="academy-pathways__number">{{ String(index + 1).padStart(2, "0") }}</span>
            <span v-if="pathway.featured" class="academy-pathways__badge">{{ $t("academy.about.pathways_badge") }}</span>
          </div>
          <span class="academy-pathways__divider" aria-hidden="true" />
          <div class="academy-pathways__copy">
            <h3 class="academy-pathways__title">{{ $t(`academy.about.pathway_${pathway.key}_title`) }}</h3>
            <p class="academy-pathways__text">{{ $t(`academy.about.pathway_${pathway.key}_text`) }}</p>
          </div>
          <AcademyLink :href="registerForms[pathway.key]" class="academy-pathways__register">
            <span>{{ $t("academy.about.pathway_register") }}</span>
            <svg class="academy-pathways__register-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </AcademyLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { registerForms } = useAcademyLinks();

const pathways = [
  { key: "imam", featured: true },
  { key: "saudi" },
  { key: "international" },
];
</script>
