import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const ProducerServiceStamp =stampit.methods({
  getProducers({communityId}){
    return this.fetchApi.get(`producer/${communityId}`);
  },
  registerProducer({producer}){
    return this.fetchApi.post(`producer/`, producer);
  },
});
const ProducerService = stampit.compose(ServiceStamp, ProducerServiceStamp);
export default ProducerService;
