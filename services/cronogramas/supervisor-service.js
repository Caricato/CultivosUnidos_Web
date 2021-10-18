import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const ScheduleServiceStamp = stampit.methods({

});

const ScheduleService = stampit.compose(ServiceStamp, ScheduleServiceStamp);
export default ScheduleService;
