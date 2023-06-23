import{_ as v}from"./nuxt-link.5ccbcf4d.js";import{L as k}from"./index.44e8f268.js";/* empty css              */import{a as x,aj as w,r as _,o as a,b as l,h as u,H as h,G as r,e as s,F as C,x as z,y as b,bg as S,t as n,c as p,z as m}from"./entry.92cc3846.js";import{_ as P}from"./plan_info_img.dd775b1b.js";import"./vue.runtime.esm-bundler.08aa84eb.js";const L={layout:"default",head:{title:"Subscription"},meta:{breadcrumb:"subscription",title:"Subscription"},components:{Loading:k},data(){return{error:!1,message:"",isLoading:!1,fullPage:!0,color:"#4fcf8d",backgroundColor:"#ffffff",response:null,has_payment_method:!1,plans:[],selectedPlanId:null,currency_options:["USD","GBP","EUR","AUD"],selected_currency:"GBP",selected_currency_symbol:"£",selected_currency_rate:1,isActive:!1}},computed:{...w(["loggedInUser"])},methods:{handleSelectedFiles(c){this.file=this.$refs.fileInput.files[0],this.fileName=this.file.name},submit(){},async loadPlans(){const c=await this.$axios.$get("/api/stripe/plans");this.getCurrentSubscription(),this.plans=c,this.isLoading=!1},async getCurrentSubscription(){const c=await this.$axios.$get("/api/stripe/current-subscription");this.isLoading=!1,this.has_payment_method=c.has_payment_method,c.subscribed&&this.plans.find(e=>{e.id==c.plan_id?e.subscribed=!0:e.subscribed=!1}),this.isLoading=!1},subscribe(){this.isLoading=!1,this.isActive=!1,this.$axios.$post("/api/stripe/subscribe",{plan_id:this.selectedPlanId}),this.getCurrentSubscription(),this.isLoading=!1},unsubscribe(){this.isLoading=!1,this.isActive=!1,this.$axios.post("/api/stripe/unsubscribe"),this.getCurrentSubscription(),this.isLoading=!1},async selectCurrency(c){await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=9WkmXwTgkCNODiQbpgzXrgt1SZkSBsIA1B3xZyMe").then(e=>e.json()).then(({data:e})=>{switch(console.log("new cur",e),c){case"GBP":this.selected_currency_symbol="£",this.selected_currency_rate=1;break;case"USD":this.selected_currency_symbol="$",this.selected_currency_rate=1/e.GBP;break;case"EUR":this.selected_currency_symbol="€",this.selected_currency_rate=e.EUR/e.GBP;break;case"AUD":this.selected_currency_symbol="$",this.selected_currency_rate=e.AUD/e.GBP;break;default:this.selected_currency_symbol="£",this.selected_currency_rate=1;break}}).catch(()=>{})},open(c){this.isActive=!0,this.selectedPlanId=c},close(){this.isActive=!1}},created(){this.loadPlans()}},A={class:"currency-div"},B=s("span",null,"Currency: ",-1),I={class:"currency-inside-div"},N=s("div",{class:"column is-12"},[s("h1",{class:"is-size-4 has-text-black"},[s("span",{class:"has-text-weight-medium"},"Subscription")])],-1),U={class:"column is-12"},D={class:"breadcrumb mt-1 mb-0","aria-label":"breadcrumbs"},G=s("li",{class:"is-size-7 has-text-weight-medium is-active"},[s("a",{href:"","aria-current":"page"},"Subscription")],-1),F=s("li",{class:"is-size-7 has-text-weight-medium is-active"},[s("a",{href:"","aria-current":"page"},"Stripe")],-1),V={class:"columns is-variable is-3 is-desktop"},E={class:"column is-9"},R={class:"columns is-multiline is-variable is-3"},T={class:"card has-background-white has-text-black"},j={class:"card-content"},H={class:"is-size-6 has-text-black is-uppercase has-text-weight-bold"},X={class:"is-size-7 has-text-black has-text-weight-regular"},Y={class:"is-size-6 has-text-black is-uppercase has-text-weight-bold"},Z={class:"is-size-7 has-text-black has-text-weight-regular"},q={key:2},M=["onClick"],O={key:3},Q=S('<div class="column is-3"><div class="columns is-gapless is-multiline"><div class="card plan_info_block has-background-primary has-text-black"><img src="'+P+'" alt=""><div class="card-content"><div class="has-text-black has-text-weight-medium is-flex plans_info mb-5"><i class="fas fa-check mr-2 mt-1"></i><p class="is-size-7"> Family Tree 365 is a secure online website which you can use to create your own family tree(s) with. </p></div><div class="has-text-black has-text-weight-medium is-flex plans_info mb-5"><i class="fas fa-check mr-2 mt-1"></i><p class="is-size-7"> It has a tree viewer and DNA support more features are planned such as the inclusion of archive databases &amp; collections </p></div><div class="has-text-black has-text-weight-medium is-flex plans_info"><i class="fas fa-check mr-2 mt-1"></i><p class="is-size-7"> It is aimed to be affordable with a 7 day no obligation trial with different pricing levels depending on how many trees you require. </p></div></div></div></div></div>',1),W=s("div",{class:"modal-background"},null,-1),J={class:"modal-card"},K={class:"modal-card-head"},$=s("p",{class:"modal-card-title"},"Confirmation",-1),ss=s("section",{class:"modal-card-body"},"Are you sure?",-1),es={class:"modal-card-foot"};function ts(c,e,is,cs,i,o){const d=v,f=_("loading"),y=_("vue-select");return a(),l("div",null,[u(d,{class:"is-size-7 has-text-weight-medium has-text-link",to:"/subscription/paypal"},{default:h(()=>[r("PayPal")]),_:1}),u(f,{active:i.isLoading,color:i.color,"background-color":i.backgroundColor},null,8,["active","color","background-color"]),s("div",A,[B,s("div",I,[u(y,{options:i.currency_options,placeholder:i.selected_currency,onInput:o.selectCurrency,clearable:!1},null,8,["options","placeholder","onInput"])])]),N,s("div",U,[s("nav",D,[s("ul",null,[s("li",null,[u(d,{class:"is-size-7 has-text-weight-medium has-text-link",to:"dashboard"},{default:h(()=>[r("Home")]),_:1})]),G,F])])]),s("div",V,[s("div",E,[s("div",R,[(a(!0),l(C,null,z(i.plans,t=>(a(),l("div",{class:"column is-6",key:t.id},[s("div",T,[s("div",j,[r(n(i.selected_currency_symbol+(t.amount*i.selected_currency_rate/100).toFixed(2))+" ",1),s("div",H,n(t.nickname),1),s("div",X,n(t.title),1),r(" "+n(i.selected_currency_symbol+(t.amount*i.selected_currency_rate/100).toFixed(2))+" ",1),s("div",Y,n(t.nickname),1),s("div",Z,n(t.title),1),i.has_payment_method==!1?(a(),p(d,{key:0,to:"/subscription/stripe?name="+t.id,class:"button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4"},{default:h(()=>[r("Subscribe by card")]),_:2},1032,["to"])):m("",!0),i.has_payment_method==!1?(a(),p(d,{key:1,to:"/subscription/paypal?name="+t.id,class:"button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4"},{default:h(()=>[r("Subscribe by PayPal")]),_:2},1032,["to"])):m("",!0),i.has_payment_method&&t.subscribed===!1?(a(),l("div",q,[s("button",{onClick:g=>o.open(t.id),class:"button is-size-7 is-uppercase has-text-white has-background-primary has-text-weight-medium is-light mt-4"}," Subscribe ",8,M)])):m("",!0),t.subscribed?(a(),l("div",O,[s("button",{onClick:e[0]||(e[0]=g=>o.open(null)),class:b(["button is-size-7 is-uppercase is-danger has-text-weight-medium is-light mt-4",{"is-success":t.subscribed}])}," Unsubscribe ",2)])):m("",!0)])])]))),128))])]),Q]),s("div",{class:b(["modal",{"is-active":i.isActive}])},[W,s("div",J,[s("header",K,[$,s("button",{class:"delete","aria-label":"close",onClick:e[1]||(e[1]=t=>o.close())})]),ss,s("footer",es,[i.selectedPlanId!=null?(a(),l("button",{key:0,class:"button is-success",onClick:e[2]||(e[2]=t=>o.subscribe())}," Yes ")):(a(),l("button",{key:1,class:"button is-success",onClick:e[3]||(e[3]=t=>o.unsubscribe())}," Yes ")),s("button",{class:"button",onClick:e[4]||(e[4]=t=>o.close())},"No")])])],2)])}const us=x(L,[["render",ts]]);export{us as default};
