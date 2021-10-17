import ProducerService from "@/services/productores/supervisor-service";

export const state = () => ({
  loading: true,
  error: null,
  message: null,
  producers:[],
});

export const actions={
  async getProducers({commit}, {communityId}){
    const service =this.$getRiceService(ProducerService);
    try{
      commit('changeLoading', true);
      const producers = await service.getProducers({ communityId });
      commit('storeProducers', producers.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  },
  async registerProducer({commit}, {producer}){
    const service = this.$getRiceService(ProducerService);
    try{
      await service.registerProducer({producer});
    }catch(error){
      commit('catchError', error);
    }
  },
  async editProducer({commit}, {producer}){
    const service = this.$getRiceService(ProducerService);
    try{
      await service.editProducer({producer});
    }catch(error){
      commit('catchError', error);
    }
  },
}

export const mutations={
  storeProducers(_state, producers){
    _state.producers = producers;
  },
  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
}
