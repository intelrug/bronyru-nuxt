<template>
  <!-- begin .player -->
  <div
    ref="player"
    class="player"
    :class="{'player_nocursor': !showControls}"
    @click="onPlayerClick"
    @mousemove="enableControls"
    @mouseleave="disableControls"
  >
    <div
      v-show="showMobileSettings"
      ref="mobileSettings"
      class="player__player-settings"
    >
      <PlayerSettings
        :show.sync="showMobileSettings"
        :dub="selectedDubCode"
        :dubs="dubs"
        :sub="selectedSubCode"
        :subs="subs"
        :video="selectedVideo"
        :videos="videos"
      />
    </div>
    <video
      ref="video"
      class="player__video"
      :poster="poster"
      :src="videoSource"
    />
    <video
      ref="audio"
      class="player__audio"
      :src="audioSource"
    />
    <div
      v-show="!canplay"
      class="player__spinner"
    >
      <img
        src="/img/spinner.svg"
        alt="Spinner"
      >
    </div>
    <transition name="controls">
      <div
        v-if="showControls"
        class="player__controls"
      >
        <div
          v-show="canplay"
          class="player__play-button"
        >
          <svg v-show="!playing">
            <use xlink:href="/img/icon.svg#icon_play_arrow" />
          </svg>
          <svg v-show="playing">
            <use xlink:href="/img/icon.svg#icon_pause" />
          </svg>
        </div>
        <div
          v-show="startFrom > 0"
          class="player__start-from"
          @click="play(false)"
        >
          Начать с {{ startFrom | toHHMMSS }}
        </div>
        <div class="player__gradient-bottom" />
        <div
          v-show="isMobile"
          class="player__gradient-top"
        />
        <div
          v-show="isMobile"
          ref="controlsTop"
          class="player__controls-top"
        >
          <div
            v-show="false"
            class="player__icon"
          >
            <svg>
              <use xlink:href="/img/icon.svg#icon_info" />
            </svg>
          </div>
          <div class="player__spacer" />
          <div
            class="player__icon"
            @click.stop="showMobileSettings = true"
          >
            <svg>
              <use xlink:href="/img/icon.svg#icon_settings" />
            </svg>
          </div>
        </div>
        <div
          ref="controlsBottom"
          class="player__controls-bottom"
        >
          <div class="player__seek-bar">
            <SeekBar
              :value="progress"
              :buffered="buffered"
              :duration="duration"
              :mobile="isMobile"
              @update:value="seekTo"
            />
          </div>
          <div
            class="player__icon"
            @click="play"
          >
            <svg v-show="!playing">
              <use xlink:href="/img/icon.svg#icon_play_arrow" />
            </svg>
            <svg v-show="playing">
              <use xlink:href="/img/icon.svg#icon_pause" />
            </svg>
          </div>
          <div
            v-show="!isMobile"
            class="player__volume"
          >
            <div
              class="player__icon"
              @click="mute"
            >
              <svg v-show="muted || volume === 0">
                <use xlink:href="/img/icon.svg#icon_volume_off" />
              </svg>
              <svg v-show="!muted && volume > 0 && volume < 50">
                <use xlink:href="/img/icon.svg#icon_volume_down" />
              </svg>
              <svg v-show="!muted && volume >= 50">
                <use xlink:href="/img/icon.svg#icon_volume_up" />
              </svg>
            </div>
            <div class="player__volume-seek-bar">
              <SeekBarVolume
                :value="volume"
                @update:value="changeVolume"
              />
            </div>
          </div>
          <div class="player__duration">
            {{ progress * duration / 100 | toHHMMSS }}&nbsp;/&nbsp;{{ duration | toHHMMSS }}
          </div>
          <div class="player__spacer" />
          <div
            v-show="!isMobile"
            ref="subsButton"
            class="player__icon player__icon_size_s"
            @click="toggleSubs"
          >
            <svg>
              <use xlink:href="/img/icon.svg#icon_subtitles" />
            </svg>
          </div>
          <div
            v-show="!isMobile"
            ref="dubsButton"
            class="player__icon player__icon_size_s"
            @click="toggleDubs"
          >
            <svg>
              <use xlink:href="/img/icon.svg#icon_language" />
            </svg>
          </div>
          <div
            v-show="!isMobile"
            ref="videosButton"
            class="player__icon player__icon_size_s"
            @click="toggleVideos"
          >
            <svg>
              <use xlink:href="/img/icon.svg#icon_settings" />
            </svg>
          </div>
          <div
            class="player__icon"
            @click="setFullscreen"
          >
            <svg v-show="!fullscreen">
              <use xlink:href="/img/icon.svg#icon_fullscreen" />
            </svg>
            <svg v-show="fullscreen">
              <use xlink:href="/img/icon.svg#icon_fullscreen_exit" />
            </svg>
          </div>
        </div>
        <div
          v-show="subsOpened && !isMobile"
          ref="subsPopup"
          class="player__popup"
        >
          <div
            v-for="(sub, i) in subs"
            :key="i"
            class="player__popup-item"
            @click="selectSub(sub.code)"
          >
            <div
              v-show="selectedSubCode === sub.code"
              class="player__popup-icon"
            >
              <svg>
                <use xlink:href="/img/icon.svg#icon_check" />
              </svg>
            </div>
            {{ sub.name }}
          </div>
        </div>
        <div
          v-show="dubsOpened && !isMobile"
          ref="dubsPopup"
          class="player__popup"
        >
          <div
            v-for="(dub, i) in dubs"
            :key="i"
            class="player__popup-item"
            @click="selectDub(dub.code)"
          >
            <div
              v-show="selectedDubCode === dub.code"
              class="player__popup-icon"
            >
              <svg>
                <use xlink:href="/img/icon.svg#icon_check" />
              </svg>
            </div>
            {{ dub.name }}
          </div>
        </div>
        <div
          v-show="videosOpened && !isMobile"
          ref="videosPopup"
          class="player__popup"
        >
          <div
            v-for="(video, i) in videos"
            :key="i"
            class="player__popup-item"
            @click="selectVideo(video)"
          >
            <div
              v-show="selectedVideo === video"
              class="player__popup-icon"
            >
              <svg>
                <use xlink:href="/img/icon.svg#icon_check" />
              </svg>
            </div>
            {{ video }}p
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- end .player -->
</template>

<script lang="ts">
import {
  Component, Prop, Ref, Vue, Watch,
} from 'vue-property-decorator';
import Cookies from 'js-cookie';
import { IEpisode } from '~/types/episode';
import SeekBar from '~/components/seekBar/seekBar.vue';
import SeekBarVolume from '~/components/seekBarVolume/seekBarVolume.vue';
import PlayerSettings from '~/components/player-settings/player-settings.vue';

@Component({
  components: { SeekBarVolume, SeekBar, PlayerSettings },
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
export default class Player extends Vue {
  @Prop() episode!: IEpisode;
  @Ref() player!: HTMLElement;
  @Ref() video!: HTMLVideoElement;
  @Ref() audio!: HTMLVideoElement;
  @Ref() dubsButton!: HTMLDivElement;
  @Ref() subsButton!: HTMLDivElement;
  @Ref() videosButton!: HTMLDivElement;
  @Ref() dubsPopup!: HTMLDivElement;
  @Ref() subsPopup!: HTMLDivElement;
  @Ref() videosPopup!: HTMLDivElement;
  @Ref() controlsTop!: HTMLDivElement;
  @Ref() controlsBottom!: HTMLDivElement;
  @Ref() mobileSettings!: HTMLDivElement;

  @Watch('playing')
  onPlayingStatusChanged(val: boolean) {
    if (val) {
      this.video.play();
      this.audio.play();
    } else {
      this.video.pause();
      this.audio.pause();
      clearTimeout(this.closeControlsTimeoutId);
      this.showControls = true;
    }
  }

  @Watch('canplay')
  onCanPlayChanged(val: boolean) {
    if (val) {
      if (this.playing) {
        this.video.play();
        this.audio.play();
      }
      // hide loading spinner
    } else {
      this.video.pause();
      this.audio.pause();
      // show loading spinner
    }
  }

  @Watch('episode')
  onEpisodeChanged(val: IEpisode) {
    this.selectedSubCode = (Cookies.get('sub') || 'none') === 'none' ? null : Cookies.get('sub')!;
    this.selectedDubCode = Cookies.get('dub') || '';
    this.startFrom = parseInt(localStorage.getItem(`episode_${this.episode.id}`) || '0', 10);
    if (!val.dubs.find((d) => d.code === this.selectedDubCode)) {
      this.selectedDubCode = val.dubs[0].code;
    }
    if (!val.subtitles.find((s) => s.code === this.selectedSubCode)) {
      this.selectedSubCode = null;
    }
    // eslint-disable-next-line no-restricted-globals
    const w = screen.width;
    // eslint-disable-next-line no-restricted-globals
    const h = screen.height;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let [quality] = val.videos;
    if (w && h) {
      const size: number = Math.max(w, h);
      for (let i = 0; i < val.videos.length - 1; i += 1) {
        const cur: number = parseInt(val.videos[i], 10);
        const prev: number = parseInt(val.videos[i + 1], 10);
        if (cur >= size && prev < size) {
          quality = val.videos[i];
        }
      }
    }
  }

  @Watch('selectedDubCode')
  onSelectedDubCodeChanged(val: string) {
    this.selectDub(val);
    Cookies.set('dub', val, { expires: 3650 });
  }

  @Watch('selectedVideo')
  onSelectedVideoChanged(val: string) {
    this.selectVideo(val);
  }

  @Watch('selectedSubCode')
  onSelectedSubCodeChanged(val: string | null) {
    if (val) {
      if (!this.subtitles) {
        this.initSubtitles();
      }
      this.subtitles.setTrackByUrl(this.subtitleSource);
    } else if (this.subtitles) {
      this.subtitles.freeTrack();
    }
    Cookies.set('sub', val || 'none', { expires: 3650 });
  }

  @Watch('currentTime')
  onProgressChanged(value: number, oldValue: number) {
    if (value !== oldValue) {
      localStorage.setItem(`episode_${this.episode.id}`, String(value));
    }
  }

  private showMobileSettings: boolean = false;
  private showControls: boolean = true;
  private mouseOnControls: boolean = true;
  private closeControlsTimeoutId!: number;
  private duration: number = 0;
  private progress: number = 0;
  private buffered: number = 0;
  private playing: boolean = false;
  private fullscreen: boolean = false;
  private volume: number = 50;
  private muted: boolean = false;
  private subsOpened: boolean = false;
  private dubsOpened: boolean = false;
  private videosOpened: boolean = false;
  private selectedSubCode: string | null = null;
  private selectedDubCode: string = '';
  private selectedVideo: string = '';
  private canplay: boolean = true;
  private subtitles!: any;
  private clicksCount: number = 0;
  private clicksLocation: number = 0;
  private clicksTimeoutId!: number;
  private windowWidth: number = 0;
  private startFrom: number = 0;
  private currentTime: number = 0;

  get videoSource(): string | null {
    return this.selectedVideo ? `${this.episode.path}${this.selectedVideo}.mp4` : null;
  }

  get audioSource(): string | null {
    return this.selectedDubCode ? `${this.episode.path}${this.selectedDubCode}.mp4` : null;
  }

  get subtitleSource(): string | null {
    return this.selectedSubCode ? `${this.episode.path}${this.selectedSubCode}.ass` : null;
  }

  get poster() {
    return `${this.episode.path}index.jpg`;
  }

  get dubs() {
    return this.episode.dubs;
  }

  get subs() {
    return [{ code: null, name: 'Отключено' }, ...this.episode.subtitles];
  }

  get videos() {
    return this.episode.videos;
  }

  get isMobile() {
    return this.windowWidth <= 1025;
  }

  async mounted() {
    if (process.browser) {
      this.windowWidth = window.innerWidth;
      window.onresize = () => {
        this.windowWidth = window.innerWidth;
      };
      this.selectedDubCode = this.episode.dubs[0] ? this.episode.dubs[0].code : '';
      this.selectedVideo = this.episode.videos[0] || '';
      this.video.onloadedmetadata = () => {
        this.duration = this.video.duration;
      };
      this.video.ontimeupdate = () => {
        this.currentTime = Math.floor(this.video.currentTime);
        if (this.duration && this.video.currentTime) {
          this.progress = (100 / this.duration) * this.video.currentTime;
        }
      };
      this.video.onprogress = () => {
        const { duration, buffered, currentTime } = this.video;
        if (duration > 0) {
          for (let i = 0; i < buffered.length; i++) {
            if (buffered.start(buffered.length - 1 - i) < currentTime) {
              this.buffered = (buffered.end(buffered.length - 1 - i) / duration) * 100;
              break;
            }
          }
        }
      };
      this.audio.volume = this.volume / 100;
      setInterval(() => {
        if (this.playing) {
          if (Math.abs(this.audio.currentTime - this.video.currentTime) * 1000 > 200) {
            this.video.currentTime = this.audio.currentTime;
          }
          if (!(this.video.readyState === 4 && this.audio.readyState === 4)) {
            this.canplay = false;
          }
        }
        if (this.video.readyState === 4 && this.audio.readyState === 4) {
          this.canplay = true;
        }
      }, 2 * 1000);
      // eslint-disable-next-line no-restricted-globals
      screen.orientation.onchange = () => {
      // eslint-disable-next-line no-restricted-globals
        if (!this.fullscreen && (screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary')) {
          this.setFullscreen();
        }
        // eslint-disable-next-line no-restricted-globals
        if (this.fullscreen && (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary')) {
          this.setFullscreen();
        }
      };
      document.onfullscreenchange = () => {
        if (!document.fullscreenElement) {
          this.fullscreen = false;
          if (this.isMobile) {
          // eslint-disable-next-line no-restricted-globals
            screen.orientation.unlock();
          }
        }
      };
      this.setHotKeys();
      this.getCookies();
    }
  }

  getCookies() {
    if (this.isMobile) {
      this.volume = 100;
      this.muted = false;
    } else {
      this.volume = parseInt(Cookies.get('volume') || '50', 10);
      this.muted = (Cookies.get('muted') || 'false') === 'true';
    }
    this.selectedSubCode = (Cookies.get('sub') || 'none') === 'none' ? null : Cookies.get('sub')!;
    this.selectedDubCode = Cookies.get('dub') || this.selectedDubCode;
    this.startFrom = parseInt(localStorage.getItem(`episode_${this.episode.id}`) || '0', 10);
  }

  initSubtitles() {
    const subOptions = {
      video: this.video,
      subUrl: this.subtitleSource,
      workerUrl: '/scripts/subtitles-octopus-worker.js',
    };

    // @ts-ignore
    // eslint-disable-next-line no-undef
    this.subtitles = new SubtitlesOctopus(subOptions);
  }

  async play(fromZero: boolean = true) {
    if (this.canplay) {
      if (!fromZero) {
        this.video.currentTime = this.startFrom;
        this.audio.currentTime = this.startFrom;
      } else {
        this.playing = !this.playing;
      }
      this.startFrom = 0;
    }
  }

  seekTo(value: number) {
    this.canplay = false;
    this.video.currentTime = (this.duration / 100) * value;
    this.audio.currentTime = (this.duration / 100) * value;
    this.progress = value;
  }

  changeVolume(value: number) {
    this.volume = value;
    this.audio.volume = value / 100;
    if (!this.isMobile) {
      Cookies.set('volume', String(value), { expires: 3650 });
    }
  }

  mute() {
    this.muted = !this.muted;
    this.audio.muted = this.muted;
    if (!this.isMobile) {
      Cookies.set('muted', String(this.muted), { expires: 3650 });
    }
  }

  skip(value: number = 10) {
    this.video.currentTime += value;
    this.audio.currentTime += value;
    this.enableControls(true);
  }

  setFullscreen() {
    if (!this.fullscreen) {
      this.fullscreen = true;
      const docElmWithBrowsersFullScreenFunctions = this.player as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
      };
      // eslint-disable-next-line no-restricted-globals
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      if (this.isMobile) {
        // eslint-disable-next-line no-restricted-globals
        if (screen.orientation.type !== 'landscape-secondary') {
          // eslint-disable-next-line no-restricted-globals
          screen.orientation.lock('landscape-primary');
        }
      }
    } else {
      this.fullscreen = false;
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      if (this.isMobile) {
        // eslint-disable-next-line no-restricted-globals
        screen.orientation.unlock();
      }
    }
  }

  closePopups() {
    this.dubsOpened = false;
    this.subsOpened = false;
    this.videosOpened = false;
  }

  toggleSubs() {
    if (this.subsOpened) {
      this.closePopups();
    } else {
      this.closePopups();
      this.subsOpened = true;
    }
  }

  toggleDubs() {
    if (this.dubsOpened) {
      this.closePopups();
    } else {
      this.closePopups();
      this.dubsOpened = true;
    }
  }

  async toggleVideos() {
    await this.$nextTick();
    if (this.videosOpened) {
      this.closePopups();
    } else {
      this.closePopups();
      this.videosOpened = true;
    }
  }

  async selectSub(val: string | null) {
    if (this.selectedSubCode !== val) {
      this.selectedSubCode = val;
      this.closePopups();
    }
  }

  async selectDub(val: string) {
    // if (this.selectedDubCode !== val) {
    this.selectedDubCode = val;
    this.closePopups();
    await this.$nextTick();
    if (this.progress > 0) {
      this.canplay = false;
    }
    this.audio.currentTime = this.video.currentTime;
    // }
  }

  async selectVideo(val: string) {
    // if (this.selectedVideo !== val) {
    this.selectedVideo = val;
    this.closePopups();
    await this.$nextTick();
    if (this.progress > 0) {
      this.canplay = false;
    }
    this.video.currentTime = this.audio.currentTime;
    // }
  }

  onPlayerClick(event: any) {
    if (this.showMobileSettings) {
      if (!this.mobileSettings.contains(event.target)) {
        this.showMobileSettings = false;
      }
      return;
    }

    if (this.showControls) {
      if (
        !(this.videosButton.contains(event.target)
            || this.dubsButton.contains(event.target)
            || this.subsButton.contains(event.target)
            || this.videosPopup.contains(event.target)
            || this.dubsPopup.contains(event.target)
            || this.subsPopup.contains(event.target))
      ) {
        if (this.subsOpened || this.dubsOpened || this.videosOpened) {
          this.closePopups();
        } else if (
          !(this.controlsTop.contains(event.target)
              || this.controlsBottom.contains(event.target))
        ) {
          this.clicksCount += 1;
          clearTimeout(this.clicksTimeoutId);
          this.clicksLocation = this.getClickLocation(event);
          this.play();
          this.disableControls();
        }
      }
    } else if (this.isMobile) {
      this.enableControls();
    } else {
      this.clicksCount += 1;
      clearTimeout(this.clicksTimeoutId);
      this.clicksLocation = this.getClickLocation(event);
      this.play();
    }

    if (this.clicksCount > 0) {
      if (this.clicksCount === 2) {
        this.clicksTimeoutId = window.setTimeout(() => {
          this.setFullscreen();
          this.clicksCount = 0;
        }, 200);
      } else {
        this.clicksTimeoutId = window.setTimeout(() => {
          this.clicksCount = 0;
        }, 200);
      }
    }
  }

  enableControls(event: any = null) {
    if ((event && !this.isMobile) || (!event && this.isMobile)) {
      this.showControls = true;
      if (this.playing) {
        this.disableControls();
      }
    }
  }

  disableControls() {
    clearTimeout(this.closeControlsTimeoutId);
    this.closeControlsTimeoutId = window.setTimeout(() => {
      if (this.playing) {
        this.showControls = false;
      }
    }, 2 * 1000);
  }

  getClickLocation(event: any) {
    const prefix = this.player.getBoundingClientRect().left;
    let pointE = (((event.pageX - prefix) / this.player.clientWidth) * 100);
    if (pointE < 0) {
      pointE = 0;
    } else if (pointE > 100) {
      pointE = 100;
    }
    if (pointE > 33) {
      if (pointE < 66) {
        return 0;
      }
      return 1;
    }
    return -1;
  }

  setHotKeys() {
    document.onkeydown = (event: KeyboardEvent) => {
      console.log(event.code);
      switch (event.code) {
        case 'ArrowRight':
          this.skip(10);
          event.preventDefault();
          break;
        case 'ArrowLeft':
          this.skip(-10);
          event.preventDefault();
          break;
        case 'Space':
          this.play();
          event.preventDefault();
          break;
        default:
      }
    };
  }
}
</script>

<style lang="stylus" src="./player.styl"/>
