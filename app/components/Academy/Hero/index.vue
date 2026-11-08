<template>
  <section id="hero" class="academy-hero academy-anchor">
    <div class="academy-hero__media" aria-hidden="true">
      <img class="academy-hero__image" :src="$asset('/assets/images/academy/hero.png')" alt="" width="2048" height="768"
        fetchpriority="high" />
    </div>

    <div v-reveal.stagger class="academy-hero__content">
      <div class="academy-hero__card">
        <!-- Typewriter title. The full sentence is always in the markup (for
             search engines, screen readers and visitors without JS); the
             invisible "ghost" copy reserves the final height so the card
             never grows while the visible layer is being typed on top. -->
        <h1 class="academy-hero__title">
          <span class="academy-hero__sr">{{ lead }} {{ highlight }} {{ tail }}</span>

          <span class="academy-hero__title-ghost" aria-hidden="true">
            {{ lead }}
            <span class="academy-hero__title-highlight">{{ highlight }}</span>
            <span class="academy-hero__title-tail">{{ tail }}</span>
          </span>

          <span class="academy-hero__title-typed" aria-hidden="true">
            {{ typed.lead }}{{ typed.highlight ? " " : "" }}<span v-if="typed.highlight"
              class="academy-hero__title-highlight">{{ typed.highlight }}</span>
            <span v-if="typed.tail" class="academy-hero__title-tail">{{ typed.tail }}<span
                class="academy-hero__caret" :class="{ 'academy-hero__caret--idle': finished }" /></span>
            <span v-else class="academy-hero__caret" :class="{ 'academy-hero__caret--idle': finished }" />
          </span>
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
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { t } = useI18n();
const { registerHref } = useAcademyLinks();

const lead = computed(() => t("academy.hero.title_lead"));
const highlight = computed(() => t("academy.hero.title_highlight"));
const tail = computed(() => t("academy.hero.title_tail"));

// Split by code point, not UTF-16 unit, so no character is ever cut in half.
const parts = computed(() => [lead.value, highlight.value, tail.value].map((part) => Array.from(part)));
const total = computed(() => parts.value.reduce((sum, part) => sum + part.length, 0));

// Server render and no-JS: the whole title, already "typed".
const count = ref(Number.MAX_SAFE_INTEGER);
const finished = computed(() => count.value >= total.value);

const typed = computed(() => {
  let left = count.value;
  const [l, h, tl] = parts.value.map((chars) => {
    const take = Math.max(0, Math.min(chars.length, left));
    left -= take;
    return chars.slice(0, take).join("");
  });
  return { lead: l, highlight: h, tail: tl };
});

const CHAR_MS = 30;
// A short beat after each phrase, so the sentence reads in its three parts.
const PHRASE_PAUSE_MS = 160;

let timer = null;

const stop = () => {
  clearTimeout(timer);
  timer = null;
};

const step = () => {
  if (finished.value) return;
  count.value += 1;

  const [a, b] = parts.value.map((part) => part.length);
  const atPhraseEnd = count.value === a || count.value === a + b;
  timer = setTimeout(step, atPhraseEnd ? PHRASE_PAUSE_MS : CHAR_MS);
};

const start = (delay = 250) => {
  stop();
  count.value = 0;
  timer = setTimeout(step, delay);
};

const onLoaderDone = () => start();

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Hidden under the splash on a first visit; start once it has lifted.
  count.value = 0;
  if (window.__academyLoaderDone) start(400);
  else window.addEventListener("academy:loader-done", onLoaderDone, { once: true });
});

onBeforeUnmount(() => {
  stop();
  window.removeEventListener("academy:loader-done", onLoaderDone);
});
</script>
