<template>
  <footer class="academy-footer">
    <span class="academy-footer__accent" aria-hidden="true" />

    <div class="academy-container academy-footer__main">
      <div class="academy-footer__brand">
        <NuxtLink :to="homePath" class="academy-footer__logo" :aria-label="$t('academy.nav.back_to_home')">
          <img :src="$asset('/assets/icons/academy/otas-logo-white.svg')" :alt="$t('academy.nav.otas_logo_alt')" width="118"
            height="45" />
        </NuxtLink>
        <p class="academy-footer__brand-text">{{ $t("academy.footer.brand_text") }}</p>
      </div>

      <span class="academy-footer__divider" aria-hidden="true" />

      <nav class="academy-footer__links" :aria-label="$t('academy.footer.quick_links')">
        <p class="academy-footer__heading">{{ $t("academy.footer.quick_links") }}</p>
        <div class="academy-footer__columns">
          <ul v-for="(column, columnIndex) in columns" :key="columnIndex" class="academy-footer__column">
            <li v-for="link in column" :key="link.label">
              <AcademyLink :href="link.href" class="academy-footer__link"
                :class="{ 'academy-footer__link--strong': link.strong }">
                {{ $t(link.label) }}
              </AcademyLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="academy-footer__bottom">
      <div class="academy-container academy-footer__bottom-inner">
        <p class="academy-footer__copyright">{{ $t("academy.footer.copyright") }}</p>

        <div class="academy-footer__follow">
          <p class="academy-footer__follow-title">{{ $t("academy.footer.follow_us") }}</p>
          <ul class="academy-footer__social">
            <li v-for="network in orderedNetworks" :key="network.key">
              <a class="academy-footer__social-link" :href="network.href" target="_blank" rel="noopener noreferrer"
                :aria-label="network.label">
                <span v-if="network.glyph" class="academy-footer__social-glyph" aria-hidden="true">
                  {{ network.glyph }}
                </span>
                <img v-else :src="$asset(`/assets/icons/academy/social-${network.key}.svg`)" alt="" width="18" height="18"
                  aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const { homePath, aboutPath, sectionHref, socialNetworks } = useAcademyLinks();

// The design reads Facebook -> Instagram from the "Follow us" label outward.
const orderedNetworks = [...socialNetworks].reverse();

const columns = computed(() => [
  [
    { label: "academy.nav.home", href: homePath.value, strong: true },
    { label: "academy.footer.imam_path", href: `${aboutPath.value}#pathways` },
    { label: "academy.footer.saudi", href: sectionHref("saudi") },
    { label: "academy.footer.international", href: sectionHref("international") },
  ],
  [
    { label: "academy.footer.why", href: sectionHref("why") },
    { label: "academy.footer.opportunities", href: sectionHref("opportunities") },
    { label: "academy.nav.faq", href: sectionHref("faq") },
  ],
]);
</script>
