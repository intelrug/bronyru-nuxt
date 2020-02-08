<template>
  <!-- begin .nav-tiles-->
  <div class="nav-tiles">
    <ul class="nav-tiles__list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="nav-tiles__item"
      >
        <a
          :href="item.href"
          class="nav-tiles__link"
        >
          <img
            :src="`/img/nav-tiles/${item.image}`"
            class="nav-tiles__image"
            alt=""
            role="presentation"
          >
          <span class="nav-tiles__text-background" />
          <span class="nav-tiles__text">
            <span
              class="nav-tiles__title"
              v-html="item.title"
            />
            <span
              class="nav-tiles__description"
              v-html="item.description"
            />
          </span>
        </a>
      </li>
    </ul>
  </div>
  <!-- end .nav-tiles-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavTiles extends Vue {
  private items = [
    {
      href: '/онас/брони',
      image: '1.jpg',
      title: 'Кто такие Брони',
      description: 'Презентация для тех, кто не знаком с брони-культурой',
    },
    {
      href: '/стафф/видео/MLP-FiM',
      image: '2.jpg',
      title: 'Friendship is Magic',
      description: 'Смотреть сериал, на котором базируется наша субкультура',
    },
    {
      href: '/стафф/музыка',
      image: '3.jpg',
      title: 'Поняшная музыка',
      description: 'Тысячи треков разнообразной музыки, созданной броняшами!',
    },
    {
      href: '/стафф/видео/EG',
      image: '4.jpg',
      title: 'Equestria Girls',
      description: 'Официальная хуманизация "My&nbsp;Little&nbsp;Pony"',
    },
    {
      href: '/стафф/видео/MLP-TheMovie',
      image: '5.jpg',
      title: 'MLP The Movie',
      description: 'Полнометражный мультфильм "Мой маленький пони в кино"',
    },
    {
      href: '/тв',
      image: '6.jpg',
      title: 'RusBronyTV',
      description: 'Наш музыкальный онлайн-телеканал',
    },
    {
      href: '/онас',
      image: '7.jpg',
      title: 'Наши проекты',
      description: 'Проекты творческого объединения "Магия Дружбы"',
    },
    {
      href: '/обеспечение',
      image: '8.jpg',
      title: 'Поддержать нас',
      description: 'Узнай чем ты можешь нам помочь',
    },
    {
      href: '/работа',
      image: '9.jpg',
      title: 'Вступить в ТО',
      description: 'Присоединяйся к нашей дружеской компании!',
    },
  ];

  mounted() {
    const elements = document.querySelectorAll('.nav-tiles');
    elements.forEach((elem) => {
      elem.className += ('ontouchstart' in window) || ('onmsgesturechange' in window) ? ' nav-tiles_touch' : '';
    });
  }
}
</script>
<style lang="stylus" src="./navTiles.styl" />
