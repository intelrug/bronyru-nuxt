<template>
  <!-- begin .icon-group-->
  <div class="icon-group">
    <div
      v-for="(item, i) of items"
      :key="i"
      class="icon-group__icon"
    >
      <a
        :href="item.href"
        class="icon-group__icon-link"
      >
        <img
          :src="item.icon"
          :alt="item.alt"
          class="icon-group__icon-image"
          title=""
        >
      </a>
    </div>
  </div>
  <!-- end .icon-group-->
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class IconGroup extends Vue {
  @Prop({ default: [] }) items!: {href: string, icon: string, alt: string}[];
}
</script>
<style lang="stylus" src="./iconGroup.styl" />
