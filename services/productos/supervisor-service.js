import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ProductServiceStamp =stampit.methods({
  getPaginatedProducts({communityId}){
    return this.fetchApi.get(`products/${communityId}`);
  },
  registerProduct({productToRegister, suppliesFormulas}){
    return this.fetchApi.post(`products/`, {productToRegister, suppliesFormulas});
  },
  editProduct({productId, productToEdit, suppliesFormulas}){
    return this.fetchApi.put(`products/${productId}`, {productToEdit, suppliesFormulas});
  },
  deleteProduct({productId}){
    return this.fetchApi.delete(`products/${productId}`);
  },
  getProduct({productId}){
    return this.fetchApi.get(`products/detail/${productId}`);
  },
  getAllProducts({communityId}){
    return this.fetchApi.get(`products/aux/${communityId}`);
  },
});

const ProductService = stampit.compose(ServiceStamp, ProductServiceStamp);
export default ProductService;
