<template>
  <!-- begin .player-settings -->
  <div class="player-settings">
    <div class="player-settings__mask">
      <div class="player-settings__wrapper">
        <div class="player-settings__container">
          <div
            class="player-settings__close-button"
            @click.stop="close"
          >
            <div class="player-settings__icon">
              <svg>
                <use xlink:href="/img/icon.svg#icon_close" />
              </svg>
            </div>
          </div>
          <div class="player-settings__header">
            Настройки
          </div>
          <div class="player-settings__body">
            <div class="player-settings__item">
              <label
                class="player-settings__label"
                for="subsSelect"
              >Субтитры</label>
              <select
                id="subsSelect"
                v-model="selectedSubSynced"
                class="player-settings__select"
              >
                <option
                  v-for="sub in subs"
                  :key="sub.code"
                  :value="sub.code"
                >
                  {{ sub.name }}
                </option>
              </select>
            </div>
            <div class="player-settings__item">
              <label
                class="player-settings__label"
                for="dubsSelect"
              >Озвучка</label>
              <select
                id="dubsSelect"
                v-model="selectedDubSynced"
                class="player-settings__select"
              >
                <option
                  v-for="dub in dubs"
                  :key="dub.code"
                  :value="dub.code"
                >
                  {{ dub.name }}
                </option>
              </select>
            </div>
            <div class="player-settings__item">
              <label
                class="player-settings__label"
                for="videosSelect"
              >Качество</label>
              <select
                id="videosSelect"
                v-model="selectedVideoSynced"
                class="player-settings__select"
              >
                <option
                  v-for="video in videos"
                  :key="video"
                  :value="video"
                >
                  {{ video }}p
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end .player-settings -->
</template>

<script lang="ts">
import {
  Component, Prop, PropSync, Vue,
} from 'vue-property-decorator';
import { IDub, ISub } from '~/types/episode';

@Component
export default class PlayerSettings extends Vue {
  @PropSync('show', { type: Boolean, required: true }) showSynced!: boolean;
  @PropSync('video', { type: String, required: true }) selectedVideoSynced!: string;
  @PropSync('dub', { type: String, required: true }) selectedDubSynced!: string;
  @PropSync('sub', { required: true }) selectedSubSynced!: string;
  @Prop({ type: Array, required: true }) videos!: string[];
  @Prop({ type: Array, required: true }) dubs!: IDub[];
  @Prop({ type: Array, required: true }) subs!: ISub[];

  close() {
    this.showSynced = false;
  }
}
</script>
<style lang="stylus" src="./player-settings.styl" />
