<template>
  <!-- In-page section on the current page: smooth scroll instead of a jump. -->
  <a v-if="kind === 'hash'" :href="href" v-bind="$attrs" @click="onHashClick">
    <slot />
  </a>

  <!-- Off-site (registration form, social networks, mail/tel). -->
  <a
    v-else-if="kind === 'external'"
    :href="href"
    v-bind="$attrs"
    :target="isWeb ? '_blank' : undefined"
    :rel="isWeb ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>

  <!-- Another page of the site, optionally with a #section to land on. -->
  <NuxtLink v-else :to="href" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  href: { type: String, required: true },
});

const emit = defineEmits(["navigate"]);

const { scrollToSection } = useLandingScroll();

const kind = computed(() => {
  if (props.href.startsWith("#")) return "hash";
  if (/^(https?:|mailto:|tel:)/.test(props.href)) return "external";
  return "internal";
});

const isWeb = computed(() => /^https?:/.test(props.href));

const onHashClick = (event) => {
  emit("navigate");
  scrollToSection(event, props.href);
};
</script>
