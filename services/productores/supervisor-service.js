import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const ProducerServiceStamp =stampit.methods({
  getProducers({communityId}){
    return this.fetchApi.get(`producer/${communityId}`);
  },

});
const ProducerService = stampit.compose(ServiceStamp, ProducerServiceStamp);
export default ProducerService;
