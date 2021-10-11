export default function ({ store, redirect }) {
  if (store.state.login.login.userAuth === null || store.state.login.login.userAuth === undefined) {
    return redirect('/login');
  }
}
