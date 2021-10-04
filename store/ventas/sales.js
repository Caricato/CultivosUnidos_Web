import SaleService from "@/services/ventas/supervisor-service";

export const state = () => ({
  loading: true,
  loadingSupplies:true,
  error: null,
  message: null,
  page:{},
  sales:[],
  products: [],
  editedItem: {},
});
export const actions={
  async registerSale({commit}, {saleDate, detail, communityId}){
    const service =this.$getRiceService(SaleService);
    try{
      const sale = await service.registerSale({ saleDate, detail, communityId });
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },
  async getSales({commit}, {communityId, startDate, endDate}){
    const service =this.$getRiceService(SaleService);
    commit('changeLoading', true)
    try{
      const sales = await service.getSales({ communityId, startDate, endDate });
      commit('storeSales', sales.data);
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
  storeSales(_state, sales){
    _state.sales = sales;
  },
}
