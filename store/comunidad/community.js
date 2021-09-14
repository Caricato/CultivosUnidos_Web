import Vue from 'vue';
import CommunityService from "@/services/comunidad/supervisor-service";

export const state = () => ({
  loading: false,
  error: null,
  community: {},
});

export const actions ={
  async getCommunity({commit}, {communityId}){
    const service =this.$getRiceService(CommunityService);
    commit('changeLoading', true)
    try{
      const community = await service.getCommunity({ communityId});
      commit('storeCommunity', community.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  }
}

export const mutations ={
  storeCommunity(_state, community){
    _state.community = community;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
}
