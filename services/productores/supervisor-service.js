import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const ProducerServiceStamp =stampit.methods({
  getProducers({communityId}){
    return this.fetchApi.get(`producer/${communityId}`);
  },
  registerProducer({producer}){
    return this.fetchApi.post(`producer/`, producer);
  },
  editProducer({producerId, producer}){
    return this.fetchApi.put(`producer/${producer.producerId}`, producer);
  },
  deleteProducer({producerId}){
    return this.fetchApi.delete(`producer/${producerId}`);
  },
});
const ProducerService = stampit.compose(ServiceStamp, ProducerServiceStamp);
export default ProducerService;
