import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ScheduleServiceStamp = stampit.methods({
  registerSchedule({communityId, schedule}){
    return this.fetchApi.post(`schedules/${communityId}`, schedule.schedule);
  },
  getSchedules({communityId}){
    return this.fetchApi.get(`schedules/${communityId}`);
  },
  getScheduleDetail({scheduleId}){
    return this.fetchApi.get(`schedules/detail/${scheduleId}`)
  },
  freeHectares({scheduleDetailId}){
    return this.fetchApi.put(`schedules/detail/free/${scheduleDetailId}`)
  }
});

const ScheduleService = stampit.compose(ServiceStamp, ScheduleServiceStamp);
export default ScheduleService;
