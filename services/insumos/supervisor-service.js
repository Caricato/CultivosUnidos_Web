import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const SupplyServiceStamp =stampit.methods({
  getPaginatedSupplies({companyId}){
    return this.fetchApi.get(`supplies/${companyId}`);
  },
  getAllSupplies({companyId}){
    return this.fetchApi.get(`supplies/aux/${companyId}`);
  },
  getSupply({supplyId}){
    return this.fetchApi.get(`supplies/detail/${supplyId}`);
  },
  deleteSupply({supplyId}){
    return this.fetchApi.delete(`supplies/${supplyId}`);
  },
  getSupplyMetricTypes(){
    return this.fetchApi.get('supplies/metric_types');
  },
  getUnitMetrics({communityId}){
    return this.fetchApi.get(`supplies/unit_metrics/${communityId}`);
  },
  editSupply({supply}){
    return this.fetchApi.put(`supplies/${supply.supplyId}`, supply);
  },
  registerSupply({supply}){
    return this.fetchApi.post(`supplies`, supply);
  },
  exportSupplies({communityId, search}){
    return this.fetchApi.get(`supplies/reports/${communityId}`, search);
  },
});

const SupplyService = stampit.compose(ServiceStamp, SupplyServiceStamp);
export default SupplyService;
