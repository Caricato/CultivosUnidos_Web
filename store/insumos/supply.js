import SupplyService from "~/services/insumos/supervisor-service";
import Vue from 'vue';

export const state = () => ({
  loading: true,
  error: null,
  message: null,
  page:{},
  allSupplies:[],
  supplies: [],
  metricTypes:[],
  editedItem: {},
  pdf:{},
});

export const actions ={
  async getSupplies({commit}, {companyId}){
    const service =this.$getRiceService(SupplyService);
    try{
      const supplies = await service.getPaginatedSupplies({ companyId });
      commit('storeSupplies', supplies.data.data);
      commit('storePagination', supplies.data);
    }catch(error){
      commit('catchError', error);
    }
    commit('changeLoading', false)
  },

  async getAllSupplies({commit}, {companyId}){
    const service =this.$getRiceService(SupplyService);
    try{
      const supplies = await service.getAllSupplies({ companyId });
      commit('storeAllSupplies', supplies.data);
    }catch(error){
      commit('catchError', error);
    }
  },

  async registerSupply({commit}, {supply}){
    const service = this.$getRiceService(SupplyService);
    try{
      await service.registerSupply({supply});
    }catch(error){
      commit('catchError', error);
    }
  },

  async editSupply({commit}, {supply}){
    const service = this.$getRiceService(SupplyService);
    try{
      await service.editSupply({supply});
    }catch(error){
      commit('catchError', error);
    }
  },
  async deleteSupply({commit}, {supplyId}) {
    const service =this.$getRiceService(SupplyService);
    commit('catchError', null);
    try{
      await service.deleteSupply({ supplyId });
    }catch(error){
      commit('catchError', error);
    }
  },
  async getSupplyMetricTypes({commit}){
    const service =this.$getRiceService(SupplyService);
    try{
      const metricTypes = await service.getSupplyMetricTypes();
      commit('storeMetricTypes', metricTypes.data);
    }catch(error){
      commit('catchError', error);
    }
  },
  async exportSupplies({commit}, {communityId, search}){
    const service =this.$getRiceService(SupplyService);
    try{
      const pdf = await service.exportSupplies({communityId, search});
      const dataPDF = new Blob([pdf.data],{
        type:'text/xml'
      });
      pdf.data = dataPDF;
      return pdf;
    }catch(error){
      commit('catchError', error);
    }
  },
}

export const getters ={
  fromId: _state => id => _state.supplies[id],
};

export const mutations= {
  storeSupplies(_state, supplies) {
    _state.supplies = supplies;
  },
  storeAllSupplies(_state, supplies) {
    _state.allSupplies = supplies;
  },
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
  storePagination(_state, page){
    _state.page = page;
  },
  storeMetricTypes(_state, metricTypes){
    _state.metricTypes = metricTypes;
  },
  storePDF(_state, pdf){
    _state.pdf = pdf;
  }
}
