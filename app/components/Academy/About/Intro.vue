<template>
  <section class="academy-about-intro">
    <div class="academy-container academy-about-intro__inner">
      <div v-reveal.start class="academy-about-intro__copy">
        <h1 class="academy-about-intro__title">{{ $t("academy.about.title") }}</h1>
        <p class="academy-about-intro__statement">{{ $t("academy.about.statement") }}</p>
        <p class="academy-about-intro__text">
          {{ $t("academy.about.text_before") }}<a class="academy-about-intro__link" href="http://coophub.com.sa/"
            target="_blank" rel="noopener noreferrer" dir="ltr">coophub.com.sa</a>{{ $t("academy.about.text_after") }}
        </p>
      </div>

      <div v-reveal.end class="academy-about-intro__media">
        <img class="academy-about-intro__image" :src="$asset('/assets/images/academy/about-intro.png')"
          :alt="$t('academy.about.image_alt')" width="1672" height="941" fetchpriority="high" />
      </div>
    </div>
  </section>
</template>
