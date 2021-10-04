import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const SaleServiceStamp = stampit.methods({
  registerSale({saleDate, detail, communityId}){
    return this.fetchApi.post(`sales/`, {saleDate, detail, communityId});
  },
  getSales({communityId, startDate, endDate}){
    return this.fetchApi.get(`sales/${communityId}`, {params: {startDate, endDate}});
  },
  getSaleDetail({saleId}){
    return this.fetchApi.get(`sales/detail/${saleId}`);
  },
});
const SaleService = stampit.compose(ServiceStamp, SaleServiceStamp);
export default SaleService;
