<template>
  <!-- begin .footer-->
  <div class="footer">
    <hr>
    <div class="footer__content">
      <img
        src="/img/footer/NoDRM.png"
        class="footer__image"
        alt=""
        role="presentation"
      >
      <div class="footer__text">
        <a class="footer__copyright" href="/стафф/инфо/ПравилаРаспространения" target="_parent">Все права принадлежат пони. Весь мир принадлежит пони.</a>
        <p> Сайт работает под управлением Nginx и мы присоединяемся к акции по защите его свободы.</p>
      </div>
      <a
        href="https://metrika.yandex.ru/stat/?id=33133093&amp;amp;amp;from=informer"
        target="_blank"
        rel="nofollow"
        class="footer__metrika"
      >
        <img
          src="https://informer.yandex.ru/informer/33133093/3_1_FFFFFFFF_F5F3E9FF_0_pageviews"
          class="footer__metrika-image"
          alt=""
          role="presentation"
        >
      </a>
    </div>
  </div>
  <!-- end .footer-->
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>
<style lang="stylus" src="./footer.styl" />
