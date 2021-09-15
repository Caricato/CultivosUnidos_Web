import ProductService from "@/services/productos/supervisor-service";

export const state = () => ({
  loading: true,
  error: null,
  message: null,
  page:{},
  allSupplies:[],
  products: [],
  editedItem: {},
});

export const actions={
  async getProducts({commit}, {communityId}){
    const service =this.$getRiceService(ProductService);
    try{
      const products = await service.getPaginatedProducts({ communityId });
      commit('storeProducts', products.data.data);
      commit('storePagination', products.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },
}

export const mutations={
  storeProducts(_state, products){
    _state.products = products;
  },
  storePagination(_state, data){
    _state.page = data;
  },

  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
}
