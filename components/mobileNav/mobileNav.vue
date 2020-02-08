<template>
  <!-- begin .mobile-nav-->
  <div class="mobile-nav">
    <ul class="mobile-nav__list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="mobile-nav__item"
        :class="{'mobile-nav__item_opened': item.opened}"
        @click.stop="item.opened = !item.opened"
      >
        <svg
          v-if="item.sub"
          class="mobile-nav__dropdown-icon"
        >
          <use xlink:href="/img/icon.svg#icon_dropdown" />
        </svg>
        <a
          v-if="item.href"
          :href="item.href"
          class="mobile-nav__link"
        >
          {{ item.text }}
        </a>
        <div
          v-else
          class="mobile-nav__link"
        >
          {{ item.text }}
        </div>
        <div
          v-if="item.sub"
          class="mobile-nav__sub-nav"
        >
          <MobileNav
            :items="item.sub"
            :level="level + 1"
          />
        </div>
      </li>
      <li
        v-if="level === 0"
        class="mobile-nav__item"
        :class="{'mobile-nav__item_opened': contactsOpened}"
      >
        <svg class="mobile-nav__dropdown-icon">
          <use xlink:href="/img/icon.svg#icon_dropdown" />
        </svg>
        <div
          class="mobile-nav__link"
          @click="contactsOpened = !contactsOpened"
        >
          Обратная связь
        </div>
        <Social />
      </li>
      <li
        v-if="level === 0"
        class="social"
      >
        <ul class="social__list">
          <li class="social__item">
            <a
              href="https://vk.com/bronyru"
              class="social__link social__link_social"
            >
              <svg
                class="social__icon"
              >
                <use xlink:href="/img/icon.svg#icon_vk" />
              </svg>
              <span class="social__text">/BronyRu</span></a>
          </li>
          <li class="social__item">
            <a
              href="https://youtube.com/bronyru"
              class="social__link social__link_social"
            >
              <svg
                class="social__icon"
              >
                <use xlink:href="/img/icon.svg#icon_youtube" />
              </svg>
              <span class="social__text">/BronyRu</span></a>
          </li>
        </ul>
      </li>
    </ul>
  </div><!-- end .mobile-nav-->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Social from '~/components/social/social.vue';

@Component({
  name: 'MobileNav',
  components: { Social },
})
export default class MobileNav extends Vue {
  @Prop({ default: 0 }) level!: number;
  @Prop({
    default: () => [
      {
        text: 'Наше ТО',
        opened: true,
        sub: [
          {
            text: 'Проекты',
            opened: false,
            sub: [
              {
                text: 'RusBrony TV',
                href: '#',
              },
              {
                text: 'Эквестриология',
                href: '#',
              },
              {
                text: 'RYTP',
                href: '#',
              },
              {
                text: 'Полный Мисхёрд',
                href: '#',
              },
              {
                text: 'MultiDub',
                href: '#',
              },
              {
                text: 'PMV',
                href: '#',
              },
              {
                text: 'Отдел озвучивания',
                href: '#',
              },
              {
                text: 'ПО и игры',
                href: '#',
              },
              {
                text: 'Made in Equestria',
                href: '#',
              },
            ],
          },
          {
            text: 'Вакансии',
            href: '#',
          },
          {
            text: 'Донат',
            href: '#',
          },
        ],
      },
      {
        text: 'Пони-Стафф',
        opened: false,
        sub: [
          {
            text: 'Видео',
            opened: false,
            sub: [
              {
                text: 'Официальный MLP',
                href: '#',
              },
              {
                text: 'Неофициальный MLP',
                href: '#',
              },
            ],
          },
          {
            text: 'Комиксы',
            href: '#',
          },
          {
            text: 'Музыка',
            opened: false,
            sub: [
              {
                text: 'Музыкальный архив',
                href: '#',
              },
              {
                text: 'Everypony Radio',
                href: '#',
              },
            ],
          },
          {
            text: 'ПО',
            href: '#',
          },
          {
            text: 'Шрифты',
            href: '#',
          },
          {
            text: 'Игры',
            href: '#',
          },
          {
            text: 'Сайты',
            opened: false,
            sub: [
              {
                text: 'русскоязычные',
                href: '#',
              },
              {
                text: 'всемирные',
                href: '#',
              },
            ],
          },
          {
            text: 'Пони-конвенты',
            href: '#',
          },
          {
            text: 'Справочные материалы',
            href: '#',
          },
        ],
      },
      {
        text: 'Магазин',
        href: '#',
      },
    ],
  }) items!: [];
  private contactsOpened: boolean = false;
}
</script>
<style lang="stylus" src="./mobileNav.styl" />
