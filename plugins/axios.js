import { injectRoleInRequest, injectTokenInRequest } from '~/helpers/requests';

export default function ({ $axios, store }) {
  //const { token } = store.state.auth;
  //const { role } = store.state.roles;
  $axios.setBaseURL(process.env.apiBaseUrl);
  //injectTokenInRequest($axios, token);
  //injectRoleInRequest($axios, role);
}
