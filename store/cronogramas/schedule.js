export const state = () => ({
  loading: false,
  error: null,
  message: null,
  page:{},
  schedules: [],
  detail: {},
});

export const actions ={

}

export const mutations ={
  changeLoading(_state, loading) {
    _state.loading = loading;
  },
  catchError(_state, error) {
    _state.error = error;
  },
}
