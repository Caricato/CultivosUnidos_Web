import ProjectionService from "@/services/proyecciones/supervisor-service";

export const state = () => ({
  loading: true,
  error: null,
  message: null,
  page:{},
  projectCrops:[],
});
export const actions={
  async getProjectCrops({commit}, {month, products}){
    const service =this.$getRiceService(ProjectionService);
    commit('changeLoading', true)
    try{
      const projection = await service.getProjectCrops({ month, products });
      commit('storeProjectCrops', projection.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },
}

export const mutations={
  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  storeProjectCrops(_state, projectCrops) {
    _state.projectCrops = projectCrops;
  },
}
