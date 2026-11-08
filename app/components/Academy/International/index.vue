<template>
  <section id="international" class="academy-international academy-section academy-anchor">
    <div class="academy-international__inner academy-container">
      <div v-reveal.start class="academy-international__content">
        <AcademySectionIntro align="start" :title="$t('academy.international.title')"
          :text="$t('academy.international.text')" />

        <ul v-reveal.stagger class="academy-international__features">
          <li v-for="feature in features" :key="feature.key" class="academy-international__feature">
            <img class="academy-international__feature-icon" :src="`/assets/icons/academy/${feature.icon}.svg`" alt=""
              :width="feature.width" height="40" aria-hidden="true" />
            <span class="academy-international__feature-label">
              {{ $t(`academy.international.feature_${feature.key}`) }}
            </span>
          </li>
        </ul>

        <AcademyButton class="academy-international__cta" :href="registerForms.international">
          {{ $t("academy.international.cta") }}
        </AcademyButton>
      </div>

      <div v-reveal.end class="academy-international__media">
        <img class="academy-international__image" src="/assets/images/academy/international.png"
          :alt="$t('academy.international.image_alt')" width="673" height="484" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { registerForms } = useAcademyLinks();

// Reading order (start -> end) of the Figma feature strip.
const features = [
  { key: "accreditation", icon: "culture-experience", width: 40 },
  { key: "environment", icon: "impact-effect", width: 40 },
  { key: "flexibility", icon: "research-collaboration", width: 39 },
  { key: "experience", icon: "academic-experience", width: 40 },
];
</script>
