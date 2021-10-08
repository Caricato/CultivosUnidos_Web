import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const ProjectionServiceStamp = stampit.methods({
  getProjectCrops({month, products}){
    return this.fetchApi.post(`projections/crops`,  {month, products});
  },
  getProjectEarnings({month, products}){
    return this.fetchApi.post(`projections/earnings`,  {month, products});
  },
});
const ProjectionService = stampit.compose(ServiceStamp, ProjectionServiceStamp);
export default ProjectionService;
