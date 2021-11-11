import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ConfigurationServiceStamp = stampit.methods({
  getScheduleParameters({communityId}){
    return this.fetchApi.get(`parameters/schedule/${communityId}`)
  },
  editScheduleParameters({parameters}){
    return this.fetchApi.put(`parameters/schedule/${parameters.communityId}`, parameters)
  },
  registerUnitMetric({unitMetric}){
    return this.fetchApi.post('supplies/unit_metrics', unitMetric)
  },
  editUnitMetric({unitMetric}){
    return this.fetchApi.put(`supplies/unit_metrics/${unitMetric.unitMetricId}`, unitMetric)
  },
  deleteUnitMetric({unitMetricId}){
    return this.fetchApi.delete(`supplies/unit_metrics/${unitMetricId}`)
  }
});

const ConfigurationService = stampit.compose(ServiceStamp, ConfigurationServiceStamp);
export default ConfigurationService;
