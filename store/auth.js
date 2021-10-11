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
  authenticate({ commit }, { userAuth }) {
    commit('authenticate', { userAuth });
  },
  logout({ commit }) {
    this.$cookiz.remove('token');
    this.$cookiz.remove('user');
    this.$cookiz.remove('role');
    commit('setOptions', null);
    commit('setRole', null);
    commit('setUser', { token: null, user: null });
    commit('logout');
    window.location = this.$config.ctAttentionUrl;
  },
  logoutRole({ commit }) {
    commit('setOptions', null);
    commit('setRole', null);
    this.$cookiz.remove('role');
    window.location = `${this.$config.ctAttentionUrl}/roles`;
  },
};

export const mutations = {
  setUser(_state, { token, user }) {
    _state.token = token;
    _state.user = user;
  },
  setRole(_state, role) {
    _state.role = role;
  },
  setOptions(_state, options) {
    _state.options = options;
  },
  setLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
  authenticate(_state, { userAuth }) {
    _state.authenticated = true;
    _state.userAuth = userAuth;
  },
  logout(_state) {
    _state.authenticated = false;
    _state.userAuth = null;
  },
};

