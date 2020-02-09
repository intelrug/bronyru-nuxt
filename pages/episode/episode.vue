<template>
  <!-- begin .episode-->
  <div class="episode">
    <div class="episode__header">
      <div class="episode__title">
        <h1>My Little Pony: Friendship&nbsp;is&nbsp;Magic</h1>
      </div>
    </div>
    <div class="episode__content">
      <div class="episode__player">
        <Player :episode="episode" />
      </div>
      <div class="episode__publishers-tip">
        <img
          src="/img/episode/publishers-tip.png"
          alt=""
          role="presentation"
        ><span>Доступные озвучки:&nbsp;</span>{{ episode.dubs.map(d => d.name).join(', ') }}
      </div>
      <div class="episode__info">
        <div class="episode__info-left">
          <div class="episode__info-dates">
            <div
              v-for="(date, i) of episode.releases"
              :key="i"
              class="episode__info-date"
            >
              [{{ date.name }}] {{ date.date }}
            </div>
          </div>
          <div
            v-if="episode.writers.length !== 0"
            class="episode__info-writers"
          >
            <div
              v-for="(writer, i) of episode.writers"
              :key="i"
              class="episode__info-writer"
            >
              {{ writer }}
            </div>
          </div>
          <div
            v-else
            class="episode__info-writers"
          >
            <div class="episode__info-writer">
              [нет]
            </div>
          </div>
          <div
            v-if="episode.songs.length !== 0"
            class="episode__info-songs"
          >
            <div
              v-for="(song, i) of episode.songs"
              :key="i"
              class="episode__info-song"
            >
              {{ song }}
            </div>
          </div>
          <div
            v-else
            class="episode__info-songs"
          >
            <div class="episode__info-song">
              [нет]
            </div>
          </div>
        </div>
        <div class="episode__info-right">
          <div class="episode__info-title">
            {{ episode.title.eng }} ({{ episode.title.rus }})
          </div>
          <div class="episode__info-description">
            {{ episode.description.rus }}
          </div>
        </div>
      </div>
    </div>
    <br>
    <hr>
    <br>
    <div
      id="vk_comments"
      class="vk-comments"
    />
    <br>
  </div>
  <!-- end .episode-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import NavTiles from '~/components/navTiles/navTiles.vue';
import { IEpisode } from '~/types/episode';
import API from '~/lib/api';
import Player from '~/components/player/player.vue';

@Component({
  components: { Player, NavTiles },
  async asyncData({ route, redirect }) {
    const path: string = await API.url.get(route.path);
    const match = path.match(/^\/video\?name=(.*)$/);
    if (match && match[1]) {
      const response = await API.episodes.getByName(match[1]);
      return { episode: response };
    }
    redirect('/');
    return {};
  },
  head(this: Episode) {
    if (this.episode && this.episode.title) {
      return {
        title: this.episode.title.eng,
        meta: [
          { hid: 'description', name: 'description', content: this.episode.description.rus },
        ],
      };
    }
    return {};
  },
})
export default class Episode extends Vue {
  @Prop() s!: number;
  @Prop() e!: number;

  private episode: IEpisode = {
    id: 0,
    localId: 0,
    categoryId: 0,
    title: {
      eng: '',
      rus: '',
    },
    description: {
      eng: '',
      rus: '',
    },
    path: '',
    thumbnail: '',
    // note: '',
    releases: [],
    writers: [],
    songs: [],
    videos: [],
    dubs: [],
    subtitles: [],
  };

  async created() {
    if (process.browser) {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      VK.Widgets.Comments('vk_comments', {
        limit: 25, width: '875', attach: '*', pageUrl: `http://xn--80acfekkz0b1a6ftb.xn--p1ai${this.$route.path}`,
      });
    }
  }
}
</script>
<style lang="stylus" src="./episode.styl" />
