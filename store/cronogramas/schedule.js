import ScheduleService from "@/services/cronogramas/supervisor-service";

export const state = () => ({
  loading: false,
  error: null,
  message: null,
  page:{},
  schedules: [],
  detail: {},
  scheduleDetails:[],
});

export const actions ={
  async registerSchedule({commit}, {communityId, schedule}){
    const service = this.$getRiceService(ScheduleService);
    try{
      await service.registerSchedule({communityId, schedule});
    }catch(error){
      commit('catchError', error);
    }
  },

  async getSchedules({commit}, {communityId}){
    const service = this.$getRiceService(ScheduleService);
    commit('changeLoading', true);
    try{
      const schedules = await service.getSchedules({communityId});
      commit('storeSchedules', schedules.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  },

  async getScheduleDetail({commit}, {scheduleId}){
    const service = this.$getRiceService(ScheduleService);
    commit('changeLoading', true);
    try{
      const schedules = await service.getScheduleDetail({scheduleId});
      commit('storeScheduleDetail', schedules.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  }
}

export const mutations ={
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
  storeSchedules(_state, schedules){
    _state.schedules = schedules;
  },
  storeScheduleDetail(_state, detail){
    _state.detail = detail.getScheduleDTO;
    _state.scheduleDetails = detail.getScheduleDetailDTO;
  },
}
