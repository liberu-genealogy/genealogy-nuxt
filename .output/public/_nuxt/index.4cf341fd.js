import{a as w,l as H,dB as f,dq as N,dr as B,s as E,m as F,r as n,o as c,b as d,F as V,x as z,t as l,h as e,H as o,G as A,c as D,e as t,z as L}from"./entry.92cc3846.js";import{a as R,b as S,d as T,C as j,c as q}from"./CardRefresh.d37be0b0.js";import{C as G}from"./CardCollapse.4df3c1d4.js";import{C as I}from"./Confirmation.2ba4c9ec.js";H.add(f,N,B,E,F);const M={meta:{breadcrumb:"index",title:"Logs"},inject:["errorHandler","i18n","route","routerErrorHandler","toastr"],components:{Card:R,CardHeader:S,CardContent:T,CardControl:j,CardRefresh:q,CardCollapse:G,Confirmation:I},data:()=>({logs:[],loading:!1}),computed:{icon(){return f}},created(){this.fetch()},methods:{fetch(){this.loading=!0,this.$axios.get(this.route("system.logs.index")).then(({data:s})=>{this.logs=s,this.loading=!1}).catch(this.errorHandler)},empty(s){this.$axios.delete(this.route("system.logs.destroy",s.name)).then(({data:m})=>{const u=this.logs.findIndex(_=>s.name===_.name);this.logs.splice(u,1,m.log),this.toastr.success(m.message)}).catch(this.errorHandler)},timeFromNow(s){return this.$formatDistance(s)}}},$={key:0,class:"columns is-multiline"},J={class:"icon is small"},K=["onClick"],O=["href"],P={class:"icon is-small is-naked"},Q={class:"is-pulled-right"},U={class:"is-pulled-right"},W={key:1,class:"subtitle is-4 has-text-centered mt-3"};function X(s,m,u,_,Y,a){const i=n("fa"),h=n("card-control"),p=n("confirmation"),g=n("card-refresh"),C=n("card-collapse"),y=n("card-header"),k=n("card-content"),b=n("card");return s.logs.length>0?(c(),d("div",$,[(c(!0),d(V,null,z(s.logs,(r,x)=>(c(),d("div",{class:"column is-one-third-widescreen is-half-desktop is-full-tablet",key:x},[e(b,{class:"is-rounded raises-on-hover",collapsible:"",loading:s.loading},{default:o(()=>[e(y,{class:"has-background-light"},{title:o(()=>[A(l(r.name),1)]),controls:o(()=>[r.visible?(c(),D(h,{key:0},{default:o(()=>[t("span",{class:"icon is-small is-naked",onClick:v=>s.$router.push({name:"system.logs.show",params:{log:r.name}}).catch(a.routerErrorHandler)},[e(i,{icon:"eye"})],8,K)]),_:2},1024)):L("",!0),e(h,null,{default:o(()=>[t("a",{class:"icon is-small is-naked",href:a.route("system.logs.download",r.name)},[e(i,{icon:"cloud-download-alt"})],8,O)]),_:2},1024),e(h,null,{default:o(()=>[e(p,{placement:"bottom",onConfirm:v=>a.empty(r)},{default:o(()=>[t("span",P,[e(i,{icon:"trash-alt"})])]),_:2},1032,["onConfirm"])]),_:2},1024),e(g,{onRefresh:a.fetch},null,8,["onRefresh"]),e(C)]),default:o(()=>[t("span",J,[e(i,{icon:a.icon},null,8,["icon"])])]),_:2},1024),e(k,{class:"p-3"},{default:o(()=>[t("p",null,[t("span",null,l(a.i18n("Last updated")),1),t("span",Q,l(a.timeFromNow(r.modified)),1)]),t("p",null,[t("span",null,l(a.i18n("Size")),1),t("span",U,l(r.size)+" "+l(a.i18n("MB")),1)])]),_:2},1024)]),_:2},1032,["loading"])]))),128))])):(c(),d("p",W,l(a.i18n("No log files available")),1))}const te=w(M,[["render",X]]);export{te as default};
