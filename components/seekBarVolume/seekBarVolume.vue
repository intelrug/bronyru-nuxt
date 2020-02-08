<template>
  <!-- begin .seek-bar-volume  -->
  <div
    class="seek-bar-volume"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <div class="seek-bar-volume__box">
      <div
        ref="bg"
        class="seek-bar-volume__bg"
        :style="{width: valueSynced + '%'}"
      >
        <div
          ref="seeker"
          class="seek-bar-volume__seeker"
        />
      </div>
    </div>
  </div>
  <!-- end .seek-bar-volume -->
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Ref,
  PropSync,
} from 'vue-property-decorator';

@Component
export default class SeekBarVolume extends Vue {
  @PropSync('value', { default: 0 }) valueSynced!: number;
  @Ref() private bg!: HTMLElement;

  private pointerDown: boolean = false;

  mounted() {
    document.addEventListener('mouseup', () => {
      this.pointerDown = false;
    });
    document.addEventListener('mousemove', (event) => {
      this.onMouseMove(event);
    });
  }

  static getPosition(elem: HTMLElement | null, event: MouseEvent) {
    if (elem !== undefined && elem !== null && event !== undefined) {
      const prefix = elem.getBoundingClientRect().left;
      let pointE = (((event.pageX - prefix) / elem.clientWidth) * 100);
      if (pointE < 0) {
        pointE = 0;
      } else if (pointE > 100) {
        pointE = 100;
      }
      return pointE;
    }
    return 0;
  }

  onClick(event: MouseEvent) {
    this.valueSynced = SeekBarVolume.getPosition(this.bg.parentElement, event);
  }

  onMouseDown() {
    this.pointerDown = true;
  }

  onMouseMove(event: MouseEvent) {
    if (this.pointerDown) {
      this.valueSynced = SeekBarVolume.getPosition(this.bg.parentElement, event);
    }
  }
}

</script>
<style lang="stylus" src="./seekBarVolume.styl" />
