import ConfigurationService from "@/services/configuraciones/supervisor-service";

export const state = () => ({
  loading: false,
  error: null,
  message: null,
  page:{},
  scheduleConfig: [],
});

export const actions={
  async getScheduleConfig({commit}, {communityId}){
    const service = this.$getRiceService(ConfigurationService);
    commit('changeLoading', true);
    try{
      const config = await service.getScheduleParameters({communityId});
      commit('storeScheduleConfig', config.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  },

  async editScheduleConfig({commit}, {parameters}){
    const service = this.$getRiceService(ConfigurationService);
    try{
      const config = await service.editScheduleParameters({parameters});
    }catch(error){
      commit('catchError', error);
    }
  },

  async registerUnitMetric({commit}, {unitMetric}){
    const service = this.$getRiceService(ConfigurationService);
    try{
      await service.registerUnitMetric({unitMetric});
    }catch(error){
      commit('catchError', error);
    }
  },

  async editUnitMetric({commit}, {unitMetric}){
    const service = this.$getRiceService(ConfigurationService);
    try{
      await service.editUnitMetric({unitMetric});
    }catch(error){
      commit('catchError', error);
    }
  },

  async deleteUnitMetric({commit}, {unitMetricId}){
    const service = this.$getRiceService(ConfigurationService);
    try{
      await service.deleteUnitMetric({unitMetricId});
    }catch(error){
      commit('catchError', error);
    }
  },

  async cleanError({commit}){
    commit('catchError', null);
  }
}

export const mutations={
  storeScheduleConfig(_state, config){
    _state.scheduleConfig = config;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
}
