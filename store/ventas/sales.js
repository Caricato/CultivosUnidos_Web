import SaleService from "@/services/ventas/supervisor-service";

export const state = () => ({
  loading: true,
  loadingSupplies:true,
  error: null,
  message: null,
  page:{},
  sales:[],
  sale:{},
  products: [],
  saleDetail: {},
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

  async getSaleDetail({commit}, {saleId}){
    const service =this.$getRiceService(SaleService);
    commit('changeLoading', true)
    try{
      const saleDetail = await service.getSaleDetail({ saleId });
      commit('storeSale', saleDetail.data.sale);
      commit('storeDetail', saleDetail.data.saleDetails);
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
  storeSale(_state, sale){
    _state.sale = sale;
  },
  storeDetail(_state, saleDetail){
    _state.saleDetail = saleDetail;
  }
}
