<template>
  <section class="academy-statements academy-section">
    <div class="academy-container academy-statements__inner">
      <template v-for="(item, index) in items" :key="item.key">
        <span v-if="index > 0" class="academy-statements__divider" aria-hidden="true" />
        <div v-reveal class="academy-statements__row">
          <div class="academy-statements__heading">
            <h2 class="academy-statements__title">{{ $t(`academy.about.${item.key}_title`) }}</h2>
            <img :src="$asset(`/assets/icons/academy/${item.icon}.svg`)" alt="" width="40" height="40" aria-hidden="true" />
          </div>
          <p class="academy-statements__text">{{ $t(`academy.about.${item.key}_text`) }}</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const items = [
  { key: "vision", icon: "telescope" },
  { key: "mission", icon: "compass-lg" },
];
</script>
