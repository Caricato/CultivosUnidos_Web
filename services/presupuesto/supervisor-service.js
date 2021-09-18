import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const BudgetServiceStamp = stampit.methods({
  generateBudget({productId, hectares}){
    return this.fetchApi.get(`supply_formula/budget/${productId}`, {params:{hectares}});
  },
});

const BudgetService = stampit.compose(ServiceStamp, BudgetServiceStamp);
export default BudgetService;
