import ProductService from "@/services/productos/supervisor-service";

export const state = () => ({
  loading: true,
  loadingSupplies:true,
  error: null,
  message: null,
  page:{},
  supplyFormula:[],
  products: [],
  prices: [],
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

  async registerProduct({commit}, {productToRegister, suppliesFormulas, productPriceToRegisters}){
    const service =this.$getRiceService(ProductService);
    try{
      const product = await service.registerProduct({ productToRegister, suppliesFormulas, productPriceToRegisters });
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },

  async editProduct({commit}, {productId, productToEdit, suppliesFormulas, productPriceToRegisters}){
    const service =this.$getRiceService(ProductService);
    try{
      const product = await service.editProduct({ productId, productToEdit, suppliesFormulas, productPriceToRegisters });
    }catch(error){
      commit('catchError', error);
    }
  },

  async deleteProduct({commit}, {productId}){
    const service =this.$getRiceService(ProductService);
    try{
      const product = await service.deleteProduct({ productId });
    }catch(error){
      commit('catchError', error);
    }
  },

  async getProduct({commit}, {productId}){
    const service =this.$getRiceService(ProductService);
    try{
      const product = await service.getProduct({ productId });
      commit('storeEditedProduct', product.data.product);
      commit('storeSupplies', product.data.suppliesFormula);
      commit('storePrices', product.data.productPrices);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoadingSupplies', false);
  },

  async clearPrices({commit}){
    commit('storePrices', []);
  }
}

export const mutations={
  storeProducts(_state, products){
    _state.products = products;
  },
  storePagination(_state, data){
    _state.page = data;
  },

  storeEditedProduct(_state, data){
    _state.editedItem = data;
  },

  storeSupplies(_state, data){
    _state.supplyFormula = data;
  },

  storePrices(_state, data){
    _state.prices = data;
  },

  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  changeLoadingSupplies(_state, loading) {
    _state.loadingSupplies = loading;
  },
}
