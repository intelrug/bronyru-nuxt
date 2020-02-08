<template>
  <!-- begin .mobile-header-->
  <div class="mobile-header">
    <div class="grid-12__container">
      <div
        class="mobile-header__mobile-nav"
        :class="{'mobile-header__mobile-nav_opened': menu}"
      >
        <div class="mobile-header__dimmer" />
        <div class="mobile-header__nav-background">
          <MobileNav />
        </div>
      </div>
      <div class="mobile-header__inner">
        <!--+e.backward-->
        <svg
          class="mobile-header__menu-icon"
          @click="menu = !menu"
        >
          <use xlink:href="/img/icon.svg#icon_menu" />
        </svg>
        <div class="mobile-header__logo">
          <svg class="mobile-header__logo-icon">
            <use xlink:href="/img/icon.svg#icon_logo" />
          </svg>
        </div>
        <div class="mobile-header__title">
          ТО "Магия Дружбы"
        </div>
      </div>
    </div>
  </div><!-- end .mobile-header-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MobileNav from '~/components/mobileNav/mobileNav.vue';

@Component({
  components: { MobileNav },
})
export default class MobileHeader extends Vue {
  private menu: boolean = false;
}
</script>
<style lang="stylus" src="./mobileHeader.styl" />
