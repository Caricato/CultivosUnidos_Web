import EntriesService from "@/services/entradas/supervisor-service";
import Vue from 'vue';

export const state = () => ({
  loading: false,
  loadingDetail: false,
  error: null,
  message: null,
  page:{},
  entries: [],
  detail: {},
  supplies:[],
  types:[],
});

export const actions ={
  async getEntriesInDateRange({commit}, {communityId, startDate, endDate, subtype}){
    const service =this.$getRiceService(EntriesService);
    commit('changeLoading', true)
    try{
      const entries = await service.getEntriesInDateRange({ communityId, startDate, endDate, subtype });
      commit('storeEntries', entries.data.data);
      commit('storePagination', entries.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },
  async getEntryTypes({commit}){
    const service =this.$getRiceService(EntriesService);
    try{
      const entryTypes = await service.getEntryTypes();
      commit('storeTypes', entryTypes.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },

  async registerEntry({commit}, {communityId, detailsToRegister, entryDate, entryType, subtype, producerId}){
    const service =this.$getRiceService(EntriesService);
    try{
      const newEntry = await service.registerEntry({ communityId, detailsToRegister, entryDate, entryType, subtype, producerId });
    }catch(error){
      commit('catchError', error);
    }
  },

  async getEntryDetails({commit}, {merchandiseEntryId}){
    const service =this.$getRiceService(EntriesService);
    commit('changeLoadingDetail', true);
    try{
      const detail = await service.getEntryDetails({ merchandiseEntryId });
      commit('storeDetail', detail);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoadingDetail', false);
  }
}

export const mutations ={
  storeEntries(_state, supplies) {
    _state.entries = supplies;
  },
  storeTypes(_state, types) {
    _state.types = types;
  },
  storeDetail(_state, detail) {
    _state.detail = detail;
  },
  storePagination(_state, page){
    _state.page = page;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  changeLoadingDetail(_state, loading) {
    _state.loadingDetail = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
}
