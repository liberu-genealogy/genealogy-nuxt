function a({store:i,redirect:e,$config:t}){if(!i.state.auth.user.email_verified_at&&t.appEnv=="production")return e("/emailverification")}export{a as default};
