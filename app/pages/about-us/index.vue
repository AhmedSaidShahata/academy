<template>
  <main class="academy-about-page">
    <AcademyAboutIntro />
    <AcademyAboutVisionMission />
    <AcademyAboutPathways />
    <AcademyAboutPillars />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead(() => {
  const title = t("academy.seo.about_title");
  const description = t("academy.seo.about_description");

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: t("academy.seo.keywords") },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
});

onMounted(() => {
  if (!window.location.hash) return;

  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (!target) return;

  const land = () => target.scrollIntoView({ behavior: "auto", block: "start" });
  [0, 150, 600].forEach((delay) => setTimeout(land, delay));
});
</script>
