<template>
  <!-- begin .header-->
  <div class="header">
    <a
      href="/"
      class="header__homelink"
    >
      <img
        src="/img/header/header.20190411.jpg"
        class="header__image"
        alt=""
        role="presentation"
      >
    </a>
  </div>
  <!-- end .header-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>
<style lang="stylus" src="./header.styl" />
