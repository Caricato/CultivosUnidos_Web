import stampit from 'stampit';
import ServiceStamp from '~/services/service';

export const AuthServiceStamp = stampit.methods({
  login({ payload}) {
    return this.fetchApi.post(`user/login`, payload);
  },
  sendMailPassword({payload}){
    return this.fetchApi.post(`user/reset/mail`, payload);
  },
  resetPassword({payload}){
    return this.fetchApi.post(`user/reset`, payload);
  },
});

const AuthService = stampit.compose(ServiceStamp, AuthServiceStamp);
export default AuthService;
