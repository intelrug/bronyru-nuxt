/* eslint-disable no-shadow */
import { MutationTree, ActionTree, ActionContext } from 'vuex';
import { Context as AppContext } from '@nuxt/types';
import { RootState } from '~/types/state';

export const state = (): RootState => ({
});

export const mutations: MutationTree<RootState> = {
};

interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit (actionContext: ActionContext<S, R>, appContext: AppContext): void;
}

export const actions: Actions<RootState, RootState> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async nuxtServerInit({ commit }, context) {
  },
};
