<template>
  <header class="academy-header" :class="{ 'academy-header--stuck': isStuck }">
    <nav class="academy-header__bar" :aria-label="$t('academy.nav.aria_label')">
      <NuxtLink class="academy-header__logo" :to="homePath" :aria-label="$t('academy.nav.back_to_home')"
        @click="onLogoClick">
        <img class="academy-header__logo-img" :src="$asset('/assets/icons/academy/otas-logo.svg')"
          :alt="$t('academy.nav.otas_logo_alt')" width="200" height="76" />
      </NuxtLink>

      <ul class="academy-header__links">
        <li v-for="link in primaryLinks" :key="link.key">
          <AcademyLink :href="link.href" class="academy-header__link"
            :class="{ 'academy-header__link--active': activeKey === link.key }"
            :aria-current="activeKey === link.key ? 'page' : undefined" @click="onNavClick(link.key)">
            {{ $t(`academy.nav.${link.key}`) }}
          </AcademyLink>
        </li>

        <li ref="moreEl" class="academy-header__more">
          <button type="button" class="academy-header__link academy-header__more-toggle"
            :class="{ 'academy-header__link--active': activeKey === 'more' }" :aria-expanded="moreOpen ? 'true' : 'false'"
            aria-haspopup="true" aria-controls="academy-more-menu" @click="moreOpen = !moreOpen">
            <span>{{ $t("academy.nav.more") }}</span>
            <img class="academy-header__caret" :class="{ 'academy-header__caret--open': moreOpen }"
              :src="$asset('/assets/icons/academy/caret-down.svg')" alt="" width="14" height="8" aria-hidden="true" />
          </button>

          <Transition name="academy-pop">
            <ul v-show="moreOpen" id="academy-more-menu" class="academy-header__menu">
              <li v-for="link in moreLinks" :key="link.key">
                <AcademyLink :href="link.href" class="academy-header__menu-link"
                  :class="{ 'academy-header__menu-link--active': activeMoreKey === link.key }"
                  @click="onNavClick(link.key); moreOpen = false">
                  {{ $t(`academy.nav.${link.key}`) }}
                </AcademyLink>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>

      <div class="academy-header__tools">
        <button type="button" class="academy-header__lang" :aria-label="$t('academy.nav.switch_language')"
          @click="switchLocale">
          <img :src="$asset('/assets/icons/academy/globe.svg')" alt="" width="20" height="20" aria-hidden="true" />
          <span class="academy-header__lang-label">{{ nextLocaleCode.toUpperCase() }}</span>
        </button>

        <button type="button" class="academy-header__toggle" :aria-expanded="drawerOpen ? 'true' : 'false'"
          aria-controls="academy-drawer" :aria-label="$t(drawerOpen ? 'academy.nav.close_menu' : 'academy.nav.open_menu')"
          @click="drawerOpen = !drawerOpen">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile / tablet drawer -->
    <Transition name="academy-fade">
      <div v-if="drawerOpen" class="academy-drawer__scrim" aria-hidden="true" @click="drawerOpen = false" />
    </Transition>
    <Transition name="academy-slide">
      <aside v-if="drawerOpen" id="academy-drawer" class="academy-drawer" role="dialog" aria-modal="true"
        :aria-label="$t('academy.nav.aria_label')">
        <div class="academy-drawer__head">
          <img :src="$asset('/assets/icons/academy/otas-logo.svg')" :alt="$t('academy.nav.otas_logo_alt')" width="120"
            height="46" />
          <button ref="drawerCloseEl" type="button" class="academy-drawer__close"
            :aria-label="$t('academy.nav.close_menu')" @click="drawerOpen = false">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <ul class="academy-drawer__links">
          <li v-for="link in [...primaryLinks, ...moreLinks]" :key="link.key">
            <AcademyLink :href="link.href" class="academy-drawer__link"
              :class="{ 'academy-drawer__link--active': activeKey === link.key || activeMoreKey === link.key }"
              @click="onNavClick(link.key); drawerOpen = false">
              {{ $t(`academy.nav.${link.key}`) }}
            </AcademyLink>
          </li>
        </ul>

        <AcademyButton class="academy-drawer__cta" :href="registerHref">
          {{ $t("academy.nav.apply") }}
        </AcademyButton>
      </aside>
    </Transition>
  </header>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
import { useLocaleStore } from "~/stores/locale";

const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();
const route = useRoute();
const { homePath, aboutPath, isHome, isAbout, sectionHref, registerHref } = useAcademyLinks();
const { scrollToTop } = useLandingScroll();

// Sections tracked by the scroll spy, in page order.
const PRIMARY_SECTIONS = ["international", "saudi", "opportunities", "why"];
const MORE_SECTIONS = ["programs", "faq", "contact"];

const primaryLinks = computed(() => [
  { key: "home", href: isHome.value ? "#hero" : homePath.value },
  ...PRIMARY_SECTIONS.map((key) => ({ key, href: sectionHref(key) })),
]);

const moreLinks = computed(() => [
  { key: "about", href: aboutPath.value },
  { key: "programs", href: sectionHref("programs") },
  { key: "faq", href: sectionHref("faq") },
  { key: "contact", href: sectionHref("contact") },
]);

// ---- Active link ---------------------------------------------------------
const spySection = ref("");

const activeMoreKey = computed(() => {
  if (isAbout.value) return "about";
  return MORE_SECTIONS.includes(spySection.value) ? spySection.value : "";
});

const activeKey = computed(() => {
  if (activeMoreKey.value) return "more";
  if (!isHome.value) return "";
  return PRIMARY_SECTIONS.includes(spySection.value) ? spySection.value : "home";
});

// ---- Language ------------------------------------------------------------
const nextLocaleCode = computed(() => (locale.value === "ar" ? "en" : "ar"));

const switchLocale = async () => {
  const code = nextLocaleCode.value;
  drawerOpen.value = false;
  await setLocale(code);
  setLocaleValidate(code);
  setLocaleApp(code);
  cookies.set("_lang", code);
  document.documentElement.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", code);
};

// ---- "More" dropdown -----------------------------------------------------
const moreOpen = ref(false);
const moreEl = ref(null);

const onDocumentClick = (event) => {
  if (moreOpen.value && moreEl.value && !moreEl.value.contains(event.target)) moreOpen.value = false;
};

// ---- Drawer --------------------------------------------------------------
const drawerOpen = ref(false);
const drawerCloseEl = ref(null);

watch(drawerOpen, (open) => {
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) nextTick(() => drawerCloseEl.value?.focus());
});

const onKeydown = (event) => {
  if (event.key !== "Escape") return;
  moreOpen.value = false;
  drawerOpen.value = false;
};

// Close any open menu once a navigation lands somewhere else.
watch(() => route.fullPath, () => {
  moreOpen.value = false;
  drawerOpen.value = false;
});

const onLogoClick = (event) => {
  if (!isHome.value) return;
  onNavClick("home");
  scrollToTop(event);
};

// ---- Sticky state --------------------------------------------------------
const isStuck = ref(false);
let frame = null;

const onScroll = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = null;
    isStuck.value = window.scrollY > 24;
    updateSpy();
  });
};

const onResize = () => {
  if (drawerOpen.value && window.innerWidth > 1279) drawerOpen.value = false;
};

// ---- Scroll spy ----------------------------------------------------------
// Geometry-based rather than IntersectionObserver: on every scroll frame the
// active section is the last one whose top has passed 40% of the viewport.
// That also works for jumps (links, #hash deep links, scroll restoration),
// which an observer can miss when the target is reached in a single step.
const SECTION_ORDER = ["international", "saudi", "opportunities", "programs", "why", "faq", "contact"];

// After a click the underline goes straight to the chosen link and stays
// there while the smooth scroll passes the sections in between.
let lockTimer = null;
let navLocked = false;

const releaseLockSoon = () => {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => {
    navLocked = false;
    updateSpy();
  }, 180);
};

const onNavClick = (key) => {
  if (!isHome.value) return;
  spySection.value = key === "home" ? "" : key;
  navLocked = true;
  // Fallback in case the click causes no scroll at all (already in place).
  releaseLockSoon();
};

const updateSpy = () => {
  if (navLocked) return;
  if (!isHome.value) {
    spySection.value = "";
    return;
  }

  const line = window.innerHeight * 0.4;
  let current = "";
  for (const id of SECTION_ORDER) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= line) current = id;
  }

  // The last section can be too short to ever reach the line - treat the
  // bottom of the page as being on it.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) current = SECTION_ORDER[SECTION_ORDER.length - 1];

  spySection.value = current;
};

const onSpyScroll = () => {
  if (navLocked) releaseLockSoon();
};

// The header lives in the layout, so it outlives page changes - re-check
// once the new page (and its sections) has actually rendered, and again
// after the home page's own #hash landing has settled.
const offPageFinish = useNuxtApp().hook("page:finish", () => {
  navLocked = false;
  nextTick(updateSpy);
  [300, 1100].forEach((delay) => setTimeout(updateSpy, delay));
});

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scroll", onSpyScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeydown);
  document.addEventListener("click", onDocumentClick);
  onScroll();
  [300, 1100].forEach((delay) => setTimeout(updateSpy, delay));
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("scroll", onSpyScroll);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("keydown", onKeydown);
  document.removeEventListener("click", onDocumentClick);
  if (frame) cancelAnimationFrame(frame);
  clearTimeout(lockTimer);
  offPageFinish?.();
  document.documentElement.style.overflow = "";
});
</script>
