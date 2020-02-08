<template>
  <!-- begin .seek-bar  -->
  <div
    v-touch:start="onMouseDown"
    class="seek-bar"
    @click="onClick"
    @mousedown="onMouseDown"
  >
    <div class="seek-bar__box">
      <div
        class="seek-bar__preload"
        :style="{width: buffered + '%'}"
      />
      <div
        ref="bg"
        class="seek-bar__bg"
        :style="{width: valueSynced + '%'}"
      >
        <div
          ref="seeker"
          class="seek-bar__seeker"
        />
      </div>
    </div>
    <div
      ref="timestamp"
      class="seek-bar__timestamp"
    >
      {{ currentTimestamp | toHHMMSS }}
    </div>
  </div>
  <!-- end .seek-bar -->
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Ref,
  PropSync, Prop,
} from 'vue-property-decorator';

@Component({
  filters: {
    toHHMMSS(time: string | number) {
      const secs = parseFloat(String(time));
      const hours: number = Math.floor(secs / (60 * 60));
      let minutes: number | string = Math.floor((secs - (hours * 60 * 60)) / 60);
      let seconds: number | string = Math.floor(secs - (minutes * 60));

      if (seconds < 10) { seconds = `0${seconds}`; }
      if (hours && minutes < 10) { minutes = `0${minutes}`; }
      return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
    },
  },
})
export default class SeekBar extends Vue {
  @PropSync('value', { default: 0 }) valueSynced!: number;
  @Prop({ default: 0 }) buffered!: number;
  @Prop({ default: 0 }) duration!: number;
  @Prop({ default: false }) mobile!: boolean;
  @Ref() private seeker!: HTMLElement;
  @Ref() private bg!: HTMLElement;
  @Ref() private timestamp!: HTMLElement;

  private pointerDown: boolean = false;
  private currentTimestamp: number = 0;

  mounted() {
    document.addEventListener('mouseup', () => {
      this.pointerDown = false;
    });
    document.addEventListener('mousemove', (event) => {
      this.onMouseMove(event);
    });
    document.addEventListener('touchmove', (event) => {
      this.onMouseMove(event);
    });
    document.addEventListener('touchmove', (event) => {
      this.onMouseMove(event);
    });
  }

  static getPosition(elem: HTMLElement | null, event: MouseEvent | TouchEvent) {
    if (elem !== undefined && elem !== null) {
      const prefix = elem.getBoundingClientRect().left;
      let pageX = 0;
      if (window.TouchEvent && event instanceof TouchEvent) {
        pageX = event.touches[0].pageX;
      } else if (event instanceof MouseEvent) {
        pageX = event.pageX;
      }
      let pointE = (((pageX - prefix) / elem.clientWidth) * 100);
      if (pointE < 0) {
        pointE = 0;
      } else if (pointE > 100) {
        pointE = 100;
      }
      return pointE;
    }
    return 0;
  }

  onClick(event: MouseEvent | TouchEvent) {
    this.valueSynced = SeekBar.getPosition(this.bg.parentElement, event);
  }

  onMouseDown() {
    this.pointerDown = true;
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.mobile && this.timestamp) {
      const width: number = this.bg.parentElement!.clientWidth;
      const pos: number = SeekBar.getPosition(this.bg.parentElement, event);
      this.timestamp.style.left = `${(width / 100) * pos - this.timestamp.clientWidth / 2}px`;
      this.currentTimestamp = (this.duration / 100) * pos;
    }
    if (this.pointerDown) {
      this.valueSynced = SeekBar.getPosition(this.bg.parentElement, event);
    }
  }
}

</script>
<style lang="stylus" src="./seekBar.styl" />
