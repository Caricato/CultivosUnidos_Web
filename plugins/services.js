import { map } from 'ramda';
import { injectRoleInRequest, injectTokenInRequest } from '~/helpers/requests';

export default function ({ $axios, store, $config }, inject) {
  //const { token } = store.state.auth;
  //const { role } = store.state.roles;

  const services = [
    { name: 'getRiceService', url: $config.apiBaseUrl },
  ];

  const createService = ({ name, url }) => {
    const fetchApi = $axios.create({ baseURL: url });
    //injectTokenInRequest(fetchApi, token);
    //injectRoleInRequest(fetchApi, role);
    inject(name, serviceStamp => serviceStamp({ fetchApi }));
  };

  map(createService, services);
}
