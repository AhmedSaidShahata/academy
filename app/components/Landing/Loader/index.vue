<template>
  <!-- Only ever shown under `html.js-reveal` (see _landing-loader.scss) - a
       visitor without JavaScript never gets stuck behind it, since nothing
       would ever be able to remove it for them. -->
  <div class="landing-loader" :class="{ 'landing-loader--done': done, 'landing-loader--hidden': hidden }"
    aria-hidden="true">
    <span class="landing-loader__glow landing-loader__glow--teal" />
    <span class="landing-loader__glow landing-loader__glow--lilac" />
    <span class="landing-loader__grid" />

    <div class="landing-loader__center">
      <div class="landing-loader__mark">
        <span class="landing-loader__arc landing-loader__arc--outer" />
        <span class="landing-loader__arc landing-loader__arc--inner" />
        <span class="landing-loader__disc">
          <img class="landing-loader__logo" :src="$asset('/assets/icons/academy/otas-logo-white.svg')" alt="" width="118"
            height="45" />
        </span>
      </div>

      <p class="landing-loader__tagline">
        <span v-for="(word, index) in taglineWords" :key="index" class="landing-loader__word"
          :style="{ '--word-delay': `${index * 90}ms` }">{{ word }}</span>
      </p>

      <span class="landing-loader__bar">
        <span class="landing-loader__bar-fill" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { t } = useI18n();

const taglineWords = computed(() => t("academy.loader.tagline").split(" "));

// Long enough for the intro animation to read as intentional, and to cover
// the hero artwork and webfonts swapping in behind it.
const MIN_VISIBLE_MS = 1100;
// Upper bound so a slow asset (or one that never fires `load`, e.g. blocked by
// an extension) cannot stall the reveal indefinitely.
const MAX_WAIT_MS = 3000;
// Time the progress bar takes to finish before the screen lifts away.
const FINISH_MS = 420;

const done = ref(false);
const hidden = ref(false);

let timers = [];
const after = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)));

onMounted(async () => {
  const pageLoaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

  await Promise.all([Promise.race([pageLoaded, after(MAX_WAIT_MS)]), after(MIN_VISIBLE_MS)]);

  done.value = true;
  await after(FINISH_MS);
  hidden.value = true;
});

onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
});
</script>
