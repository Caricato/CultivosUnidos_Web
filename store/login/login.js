import AuthService from "@/services/login/auth-service";

export const state = () => ({
  token: null,
  user: null,
  loading: false,
  error: null,
  role: null,
  options: null,
  userAuth: null,
  authenticated: false,
});

export const actions = {
  async login({commit, dispatch},{payload}){
    const service =this.$getRiceService(AuthService);
    try{
      const user = await service.login({payload});
      commit('storeUserLogged', user.data);
      this.$cookiz.set('userAuth', user.data, { path: '/'});
      console.log(this.$cookiz.get('userAuth'));
    }catch(error){
      commit('catchError', error);
    }
  },
  async cleanError({commit}){
    commit('catchError', null);
  },
  async logout({commit}){
    this.$cookiz.remove('userAuth', { path: '/'});
    commit('storeUserLogged', null);
  }
};

export const mutations = {
  storeUserLogged(_state, user) {
    _state.userAuth = user;
    if (user !== null) _state.role = user.role;
  },
  catchError(_state, error) {
    _state.error = error;
  },
};
