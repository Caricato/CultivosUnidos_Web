import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const EntriesServiceStamp = stampit.methods({
  getEntriesInDateRange({communityId, startDate, endDate, subtype}){
    return this.fetchApi.get(`merchandise_entry/${communityId}`, {params: {startDate, endDate, subtype}});
  },
  getEntryTypes(){
    return this.fetchApi.get(`merchandise_entry/types`);
  },
  registerEntry({communityId, detailsToRegister, entryDate, entryType, subtype, producerId}){
    return this.fetchApi.post(`merchandise_entry/${communityId}`, {detailsToRegister, entryDate, entryType, subtype, producerId});
  },
  getEntryDetails({merchandiseEntryId}){
    return this.fetchApi.get(`merchandise_entry/detail/${merchandiseEntryId}`);
  }
});
const EntriesService = stampit.compose(ServiceStamp, EntriesServiceStamp);
export default EntriesService;
