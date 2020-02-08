<template>
  <div class="page__wrapper">
    <div class="page__header">
      <iframe
        src="https://bronyru.info/header.htm"
        style="display: block;"
        scrolling="no"
        width="100%"
        height="140"
        frameborder="0"
      />
    </div>
    <div class="page__mobile-header">
      <MobileHeader />
    </div>
    <div class="page__nav">
      <Nav />
    </div>
    <div class="page__content">
      <nuxt />
    </div>
    <div class="page__footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import '~/assets/styl/fonts.styl';
import '~/assets/styl/reset.styl';
import '~/assets/styl/grid.styl';
import { Component, Vue } from 'vue-property-decorator';
import Header from '~/components/header/header.vue';
import Nav from '~/components/nav/nav.vue';
import Footer from '~/components/footer/footer.vue';
import MobileHeader from '~/components/mobileHeader/mobileHeader.vue';

@Component({
  components: {
    MobileHeader, Footer, Nav, Header,
  },
})
export default class App extends Vue {
}
</script>

<style lang="stylus" src="./default.styl" />
