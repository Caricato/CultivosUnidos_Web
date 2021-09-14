import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const CommunityServiceStamp = stampit.methods({
  getCommunity({communityId}){
    return this.fetchApi.get(`agriculture_community/${communityId}`);
  }
});

const CommunityService = stampit.compose(ServiceStamp, CommunityServiceStamp);
export default CommunityService;
