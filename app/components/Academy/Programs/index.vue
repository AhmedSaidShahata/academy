<template>
  <section id="programs" class="academy-programs academy-section academy-section--tint academy-anchor">
    <div class="academy-container academy-programs__inner">
      <AcademySectionIntro v-reveal :title="$t('academy.programs.title')" :text="$t('academy.programs.text')" />

      <div class="academy-programs__grid">
        <!-- Row 1: wide feature, then a stack of two -->
        <div v-reveal.stagger class="academy-programs__row academy-programs__row--split">
          <AcademyProgramsCard program="ai" size="feature" />
          <div class="academy-programs__stack">
            <AcademyProgramsCard program="data" size="stacked" contain />
            <AcademyProgramsCard program="media" size="stacked" />
          </div>
        </div>

        <!-- Row 2: four quarter cards -->
        <div v-reveal.stagger class="academy-programs__row academy-programs__row--quarters">
          <AcademyProgramsCard v-for="program in quarterPrograms" :key="program" :program="program" />
        </div>

        <!-- Row 3: mirrored split - stack first, feature second -->
        <div v-reveal.stagger class="academy-programs__row academy-programs__row--split academy-programs__row--mirrored">
          <div class="academy-programs__stack">
            <AcademyProgramsCard program="fintech" size="stacked" />
            <AcademyProgramsCard program="pilgrim" size="stacked" />
          </div>
          <AcademyProgramsCard program="logistics" size="feature" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Reading order (start -> end) of the Figma bento's middle row.
const quarterPrograms = ["trips", "contracts", "languages", "cx"];
</script>
