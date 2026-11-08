<template>
  <section id="saudi" class="academy-saudi academy-section academy-section--tint academy-anchor">
    <div class="academy-saudi__inner academy-container">
      <div v-reveal class="academy-saudi__head">
        <AcademySectionIntro class="academy-saudi__intro" :title="$t('academy.saudi.title')"
          :text="$t('academy.saudi.text')" />
        <AcademyButton :href="registerForms.saudi">{{ $t("academy.saudi.cta") }}</AcademyButton>
      </div>

      <div v-reveal.zoom class="academy-saudi__media">
        <img class="academy-saudi__image" :src="$asset('/assets/images/academy/saudi.png')" :alt="$t('academy.saudi.image_alt')"
          width="1751" height="898" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { registerForms } = useAcademyLinks();
</script>
