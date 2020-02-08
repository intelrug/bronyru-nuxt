import Vue from 'vue';
import Router from 'vue-router';

import Home from '~/pages/home/home.vue';
import Episode from '~/pages/episode/episode.vue';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/стафф/видео/MLP-FiM/сезон:s/эпизод:e',
        name: 'episode',
        component: Episode,
        props: true,
      },
    ],
  });
}
