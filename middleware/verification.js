export default function ({ store, redirect, $config }) {
      if(!store.state.auth.user.email_verified_at && $config.appEnv == 'production') {
          return redirect('/emailverification');
      }
  }