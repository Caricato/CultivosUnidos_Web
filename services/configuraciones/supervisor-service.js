import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ConfigurationServiceStamp = stampit.methods({
  getScheduleParameters({communityId}){
    return this.fetchApi.get(`parameters/schedule/${communityId}`)
  },
  editScheduleParameters({parameters}){
    return this.fetchApi.put(`parameters/schedule/${parameters.communityId}`, parameters)
  },
});

const ConfigurationService = stampit.compose(ServiceStamp, ConfigurationServiceStamp);
export default ConfigurationService;
