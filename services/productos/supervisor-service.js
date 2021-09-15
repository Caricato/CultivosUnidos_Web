import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ProductServiceStamp =stampit.methods({
  getPaginatedProducts({communityId}){
    return this.fetchApi.get(`products/${communityId}`);
  },
});

const ProductService = stampit.compose(ServiceStamp, ProductServiceStamp);
export default ProductService;
