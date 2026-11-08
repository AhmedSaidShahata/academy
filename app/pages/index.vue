<template>
  <main>
    <AcademyHero />
    <AcademyInternational />
    <AcademySaudi />
    <AcademyOpportunities />
    <AcademyPrograms />
    <AcademyWhy />
    <AcademyFaq />
    <AcademyContact />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead(() => {
  const title = t("academy.seo.home_title");
  const description = t("academy.seo.home_description");

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: t("academy.seo.keywords") },
      { property: "og:site_name", content: t("academy.seo.site_name") },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
});

// Deep links such as "/#faq" (including the header/footer links used from
// other pages) land on their section once the page and its images settle.
onMounted(() => {
  if (!window.location.hash) return;

  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (!target) return;

  const land = () => target.scrollIntoView({ behavior: "auto", block: "start" });
  [0, 50, 150, 300, 600, 1000].forEach((delay) => setTimeout(land, delay));
});
</script>
