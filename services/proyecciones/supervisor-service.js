import stampit from 'stampit';
import ServiceStamp from '~/services/service';
export const ProjectionServiceStamp = stampit.methods({
  getProjectCrops({month, products}){
    return this.fetchApi.get(`projections/crops`, {params: {month, products}});
  },
});
const ProjectionService = stampit.compose(ServiceStamp, ProjectionServiceStamp);
export default ProjectionService;
