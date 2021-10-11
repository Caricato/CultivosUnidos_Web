export const actions = {
  nuxtServerInit({ commit }) {
    const userAuth = this.$cookiz.get('userAuth');
    commit('login/login/storeUserLogged', userAuth);
  }
};
