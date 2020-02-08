<template>
  <!-- begin .nav-->
  <nav class="nav">
    <ul class="nav__list">
      <li
        style="background: #EB0B00"
        class="nav__item"
      >
        <a
          href="/"
          class="nav__link"
        >Главная</a>
      </li>
      <li
        style="background: orange"
        class="nav__item"
      >
        <a
          href="/онас"
          class="nav__link"
        >Наше ТО</a>
      </li>
      <li
        style="background: green"
        class="nav__item"
      >
        <a
          href="/магазин"
          class="nav__link"
        >Магазин</a>
      </li>
      <li
        style="background: indigo"
        class="nav__item"
      >
        <a
          href="/стафф"
          class="nav__link"
        >Брони-стафф</a>
      </li>
      <li
        style="background: darkmagenta"
        class="nav__item"
      >
        <a
          href="/тв"
          class="nav__link"
        >RusBronyTV</a>
      </li>
    </ul>
    <div class="nav__social">
      <IconGroup :items="social" />
    </div>
  </nav>
  <!-- end .nav-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconGroup from '~/components/iconGroup/iconGroup.vue';

@Component({
  components: { IconGroup },
})
export default class Nav extends Vue {
  private social: {href: string, icon: string, alt: string}[] = [
    {
      href: 'https://vk.com/public183379825',
      icon: '/img/nav/vk.png',
      alt: 'VK',
    },
    {
      href: 'https://www.youtube.com/bronyru',
      icon: '/img/nav/youtube.png',
      alt: 'Youtube',
    },
    {
      href: '/поиск',
      icon: '/img/nav/search.png',
      alt: 'Search',
    },
  ];
}
</script>
<style lang="stylus" src="./nav.styl" />
