import ProductService from "@/services/productos/supervisor-service";
import BudgetService from "@/services/presupuesto/supervisor-service";

export const state = () => ({
  products: [],
  budget: [],
  error:null,
  loading:false,
  totalBudget: 0,
});

export const actions={
  async getProducts({commit},{communityId}){
    const service =this.$getRiceService(ProductService);
    try{
      const products = await service.getAllProducts({ communityId });
      commit('storeAllProducts', products.data);
    }catch(error){
      commit('catchError', error);
    }
  },

  async generateBudget({commit}, {productId, hectares}){
    const service =this.$getRiceService(BudgetService);
    commit('changeLoading', true)
    try{
      const budget = await service.generateBudget({ productId, hectares });
      commit('storeBudget', budget.data.supplies);
      commit('storeTotal', budget.data.total);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },

  async clearTable({commit}){
    commit('changeLoading', true);
    commit('storeBudget', []);
    commit('storeTotal', 0);
    commit('changeLoading', false);
  }
}

export const mutations={
  storeAllProducts(_state, data){
    _state.products = data;
  },

  storeBudget(_state, budget){
    _state.budget = budget;
  },

  storeTotal(_state, total){
    _state.totalBudget = total;
  },
  catchError(_state, error) {
    _state.error = error;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
}
