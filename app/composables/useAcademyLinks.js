// Single source for the academy's navigation, shared by the header, the
// footer and every CTA, so a section id or the registration form only ever
// changes in one place.
//
// Section links point at anchors on the home page. On the home page they are
// handled as smooth in-page scrolls (`useLandingScroll`); from any other page
// they navigate to the localized home route with the hash, and `pages/index.vue`
// lands on the section after mount.
export const useAcademyLinks = () => {
  const localePath = useLocalePath();
  const route = useRoute();

  const homePath = computed(() => localePath("index"));
  const aboutPath = computed(() => localePath("about-us"));

  // Locale-prefixed home routes ("/" for ar, "/en" for en) - compare by
  // route name so the check survives the prefix and any trailing slash.
  const isHome = computed(() => String(route.name || "").startsWith("index"));
  const isAbout = computed(() => String(route.name || "").startsWith("about-us"));

  const sectionHref = (id) => (isHome.value ? `#${id}` : `${homePath.value}#${id}`);

  // Student data-entry forms, one per track. These are the respondent
  // (published `/viewform`) URLs - the `/edit` URLs open the form editor.
  const registerForms = {
    imam: "https://docs.google.com/forms/d/e/1FAIpQLScuO_enOqZYaOu5pXYp7EWm3fAQT12KbvNqMeGFcCWIitivmA/viewform",
    saudi: "https://docs.google.com/forms/d/e/1FAIpQLSe8GjCMwiEtb0t5YYUqO7HaBNqIhInfJHbdAzTeco-DQObC7A/viewform",
    international: "https://docs.google.com/forms/d/e/1FAIpQLSfywqv1dxldrUBLul3NW4nHoYQtktGVjL7OOCTpnOhfIXPyRA/viewform",
  };

  // The generic "Apply now" buttons belong to the Imam University partnership
  // the hero introduces.
  const registerHref = registerForms.imam;

  const contact = {
    phone: "+966530885222",
    phoneLabel: "(+966) 530885222",
    email: "Info@otas.net",
  };

  const socialNetworks = [
    { key: "instagram", href: "https://www.instagram.com/otasnet", label: "Instagram" },
    { key: "linkedin", href: "https://www.linkedin.com/company/otasnet", label: "LinkedIn" },
    { key: "snapchat", href: "https://www.snapchat.com/@travelplusgl", label: "Snapchat" },
    { key: "x", href: "https://x.com/Otasnet", label: "X", glyph: "𝕏" },
    { key: "facebook", href: "https://www.facebook.com/Otasnetsa", label: "Facebook" },
  ];

  return {
    homePath,
    aboutPath,
    isHome,
    isAbout,
    sectionHref,
    registerHref,
    registerForms,
    contact,
    socialNetworks,
  };
};
