<template>
  <!-- begin .content-->
  <div class="content">
    <div class="content__article">
      <div class="content__article-header">
        <img
          src="/img/content/pinkie.svg"
          class="content__article-image"
          alt=""
          role="presentation"
        >
        <div class="content__article-title">
          <h1>ДоBRO пожаловать!</h1>
        </div>
        <div class="content__article-description">
          <p>Сайт посвящён вселенной "My Little Pony" и всему что с этим связано.</p>
          <p>
            My Little Pony - это не просто мультсериал, это уникальное и очень масштабное явление! Пони пропагандируют
            истинные моральные ценности: верность, веселье, щедрость, честность, доброту и дружелюбие - мы называем это
            элементами гармонии. Мы верим, что именно в них заключается успех по жизни. Мы видели их в действии не только
            в мультсериале, но и в реальной жизни. Мы вдохновляемся этим. Мы - Брони (Brony).
          </p>
          <p>
            Творческое объединение "Магия Дружбы" - это одна из многочисленных некоммерческих компаний творческих
            представителей субкультуры Brony. Брони-культура является децентрализированным сообществом, распространённым
            по всему миру. ТО "Магия Дружбы", равно как любой отдельный его участник, не является основателем или
            предводителем брони-культуры в целом, а лишь направлено на поддержание интереса к ней в русскоязычном
            обществе, информирует население России и СНГ и хранит лучшие традиции самой дружной и позитивной субкультуры в
            мире.
          </p>
        </div>
      </div>
      <div class="content__article-content">
        <div class="content__article-tiles">
          <NavTiles />
        </div>
      </div>
    </div>
  </div>
  <!-- end .content-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavTiles from '~/components/navTiles/navTiles.vue';

@Component({
  components: { NavTiles },
})
export default class Home extends Vue {
}
</script>
<style lang="stylus" src="./home.styl" />
