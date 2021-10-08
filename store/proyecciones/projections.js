import ProjectionService from "@/services/proyecciones/supervisor-service";

export const state = () => ({
  loading: true,
  error: null,
  message: null,
  page:{},
  month:'',
  productsData:[],
  projectCrops:[],
  total:'',
  totalCrops:'',
});
export const actions={
  async getProjectCrops({commit}, {month, products}){
    const service =this.$getRiceService(ProjectionService);
    commit('changeLoading', true)
    try{
      const projection = await service.getProjectCrops({ month, products });
      commit('storeProjectCrops', projection.data);
      commit('storeTotal', projection.data);
      commit('storeTotalCrops', projection.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  },
  async getProjectEarnings({commit}, {month, products}){
    const service =this.$getRiceService(ProjectionService);
    commit('changeLoading', true)
    try{
      const projection = await service.getProjectEarnings({ month, products });
      commit('storeProjectCrops', projection.data);
      commit('storeTotal', projection.data);
      commit('storeTotalCrops', projection.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false);
  },

  async saveData({commit}, {month, productsData}){
    commit('storeMonth', month);
    commit('storeProductsData', productsData);
  }
}

export const mutations={
  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  storeProjectCrops(_state, projectCrops) {
    _state.projectCrops = projectCrops.projectCrops;
  },
  storeMonth(_state, month){
    _state.month = month;
  },
  storeProductsData(_state, productsData){
    _state.productsData = productsData;
  },
  storeTotal(_state, projectCrops) {
    _state.total = projectCrops.total;
  },
  storeTotalCrops(_state, projectCrops) {
    _state.totalCrops = projectCrops.totalCrops;
  },
}
