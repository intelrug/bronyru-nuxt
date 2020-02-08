<template>
  <!-- begin .social-->
  <div class="social">
    <ul class="social__list">
      <li class="social__item">
        Разработчики:
      </li>
      <li class="social__item">
        <a
          href="https://vk.com/intelrug"
          class="social__link"
        >intelrug</a>
      </li>
      <li class="social__item">
        <a
          href="https://vk.com/lyrapuffy"
          class="social__link"
        >Lyrapuff</a>
      </li>
    </ul>
    <ul class="social__list">
      <li class="social__item">
        Администраторы:
      </li>
      <li class="social__item">
        <a
          href="https://vk.com/nasretdinov_r_r"
          class="social__link"
        >Руслан Насретдинов</a>
      </li>
      <li class="social__item">
        <a
          href="https://vk.com/agmtuva"
          class="social__link"
        >Григорий Абросимов</a>
      </li>
    </ul>
  </div>
  <!-- end .social-->
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Social extends Vue {
}
</script>
<style lang="stylus" src="./social.styl" />
