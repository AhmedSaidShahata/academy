<template>
  <section id="contact" class="academy-contact academy-anchor">
    <img class="academy-contact__bg" :src="$asset('/assets/images/academy/contact-bg.png')" alt="" width="2123" height="741"
      loading="lazy" aria-hidden="true" />
    <div class="academy-contact__overlay" aria-hidden="true" />

    <div v-reveal.start class="academy-container academy-contact__inner">
      <h2 class="academy-contact__title">{{ $t("academy.contact.title") }}</h2>
      <p class="academy-contact__text">{{ $t("academy.contact.text") }}</p>

      <div class="academy-contact__row">
        <a class="academy-contact__card" :href="`mailto:${contact.email}`">
          <span class="academy-contact__icon-box">
            <img :src="$asset('/assets/icons/academy/mail.svg')" alt="" width="20" height="20" aria-hidden="true" />
          </span>
          <span class="academy-contact__card-text">
            <span class="academy-contact__label">{{ $t("academy.contact.email_label") }}</span>
            <span class="academy-contact__value academy-contact__value--link" dir="ltr">{{ contact.email }}</span>
          </span>
        </a>

        <a class="academy-contact__card" :href="`tel:${contact.phone}`">
          <span class="academy-contact__icon-box">
            <img :src="$asset('/assets/icons/academy/phone.svg')" alt="" width="20" height="20" aria-hidden="true" />
          </span>
          <span class="academy-contact__card-text">
            <span class="academy-contact__label">{{ $t("academy.contact.phone_label") }}</span>
            <span class="academy-contact__value" dir="ltr">{{ contact.phoneLabel }}</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { contact } = useAcademyLinks();
</script>
