<template>
  <section id="faq" class="academy-faq academy-section academy-anchor">
    <div class="academy-container academy-faq__inner">
      <AcademySectionIntro v-reveal :title="$t('academy.faq.title')" :text="$t('academy.faq.text')" />

      <div v-reveal.stagger class="academy-faq__stack">
        <div v-for="index in questionsCount" :key="index" class="academy-faq__card"
          :class="{ 'academy-faq__card--open': openIndex === index }">
          <h3 class="academy-faq__heading">
            <button :id="`academy-faq-q-${index}`" type="button" class="academy-faq__question"
              :aria-expanded="openIndex === index ? 'true' : 'false'" :aria-controls="`academy-faq-a-${index}`"
              @click="toggle(index)">
              <span class="academy-faq__question-text">{{ $t(`academy.faq.question_${index}`) }}</span>
              <span class="academy-faq__trigger" aria-hidden="true">
                <img :src="$asset(`/assets/icons/academy/chevron-${openIndex === index ? 'up' : 'down'}.svg`)" alt=""
                  width="16" height="16" />
              </span>
            </button>
          </h3>

          <div :id="`academy-faq-a-${index}`" class="academy-faq__answer-wrap" role="region"
            :aria-labelledby="`academy-faq-q-${index}`">
            <div class="academy-faq__answer-clip">
              <p class="academy-faq__answer">{{ $t(`academy.faq.answer_${index}`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const questionsCount = 4;

// The design ships the first card expanded and the rest collapsed.
const openIndex = ref(1);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
