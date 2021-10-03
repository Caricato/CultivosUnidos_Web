import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ProductServiceStamp =stampit.methods({
  getPaginatedProducts({communityId}){
    return this.fetchApi.get(`products/${communityId}`);
  },
  registerProduct({productToRegister, suppliesFormulas, productPriceToRegisters}){
    return this.fetchApi.post(`products/`, {productToRegister, suppliesFormulas, productPriceToRegisters});
  },
  editProduct({productId, productToEdit, suppliesFormulas, productPriceToRegisters}){
    return this.fetchApi.put(`products/${productId}`, {productToEdit, suppliesFormulas, productPriceToRegisters});
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
