
import { isNil } from 'ramda';

export const injectTokenInRequest = (fetchApi, token) => {
  fetchApi.interceptors.request.use((request) => {
    if (!isNil(token)) {
      request.headers.common.Authorization = 'Bearer ' + token;
    }

    return request;
  });
};

export const injectRoleInRequest = (fetchApi, role) => {
  fetchApi.interceptors.request.use((request) => {
    if (!isNil(role)) {
      request.headers.role = role;
    }

    return request;
  });
};
