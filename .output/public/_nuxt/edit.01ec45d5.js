import{a as c,l as m,dC as f,dD as u,r as a,o as p,b as h,e as s,h as i,K as _,H as b,t as l}from"./entry.92cc3846.js";import"./EnsoTabs.e092c412.js";import"./Divider.5a44f9ec.js";import{E as v}from"./FormFieldGroup.0c63c93a.js";import"./EnsoDatepicker.9c00621a.js";import"./RevealPassword.8886125f.js";import"./VueSelect.b511f2f3.js";import"./focus.3e4288bb.js";import"./SearchMode.06b93769.js";m.add([f,u]);const g={meta:{breadcrumb:"edit",title:"Edit Menu"},inject:["errorHandler","i18n","route","routerErrorHandler","toastr"],components:{EnsoForm:v},data:()=>({ready:!1}),methods:{writeConfig(){this.$axios.post(this.route("system.roles.writeConfig",this.$refs.form.routeParam("role"))).then(({data:e})=>this.toastr.success(e.message)).catch(this.errorHandler)}}},C={class:"columns is-centered"},y={class:"column is-three-quarters-desktop is-full-touch"},k={class:"level-item"},$={class:"is-hidden-mobile"},w={class:"icon"},E=s("span",{class:"is-hidden-mobile"},null,-1),H={class:"level-item"},S={class:"is-hidden-mobile"},B={class:"icon"},x=s("span",{class:"is-hidden-mobile"},null,-1);function D(e,o,F,N,P,t){const n=a("fa"),d=a("enso-form");return p(),h("div",C,[s("div",y,[i(d,{class:"box has-background-light raises-on-hover",onReady:o[2]||(o[2]=r=>e.ready=!0),ref:"form"},_({_:2},[e.ready?{name:"actions",fn:b(()=>[s("div",k,[s("a",{class:"button is-warning",onClick:o[0]||(o[0]=r=>e.$router.push({name:"system.roles.configure",params:{role:e.$refs.form.routeParam("role")}}))},[s("span",$,l(t.i18n("Configure")),1),s("span",w,[i(n,{icon:"sliders-h"})]),E])]),s("div",H,[s("a",{class:"button is-link",onClick:o[1]||(o[1]=(...r)=>t.writeConfig&&t.writeConfig(...r))},[s("span",S,l(t.i18n("File")),1),s("span",B,[i(n,{icon:"save"})]),x])])]),key:"0"}:void 0]),1536)])])}const I=c(g,[["render",D]]);export{I as default};
