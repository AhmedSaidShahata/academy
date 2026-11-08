<template>
  <section id="why" class="academy-why academy-section academy-anchor">
    <div class="academy-container academy-why__inner">
      <AcademySectionIntro v-reveal :title="$t('academy.why.title')" :text="$t('academy.why.text')" />

      <div class="academy-why__body">
        <ul v-reveal.stagger class="academy-why__features">
          <li v-for="feature in features" :key="feature.key" class="academy-why__feature">
            <span class="academy-why__icon-box">
              <img :src="$asset(`/assets/icons/academy/${feature.icon}.svg`)" alt="" width="32" height="32"
                aria-hidden="true" />
            </span>
            <div class="academy-why__feature-text">
              <h3 class="academy-why__feature-title">{{ $t(`academy.why.${feature.key}_title`) }}</h3>
              <p class="academy-why__feature-body">{{ $t(`academy.why.${feature.key}_text`) }}</p>
            </div>
          </li>
        </ul>

        <div v-reveal.end v-tilt class="academy-why__visual">
          <img class="academy-why__visual-image" :src="$asset('/assets/images/academy/why-visual.png')"
            :alt="$t('academy.why.visual_alt')" width="1186" height="1327" loading="lazy" />
          <div class="academy-why__glass">
            <p class="academy-why__glass-title">{{ $t("academy.why.visual_title") }}</p>
            <p class="academy-why__glass-text">{{ $t("academy.why.visual_text") }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { key: "knowledge", icon: "book-open-check" },
  { key: "skills", icon: "users-round" },
  { key: "paths", icon: "route" },
  { key: "readiness", icon: "briefcase-business" },
];
</script>
