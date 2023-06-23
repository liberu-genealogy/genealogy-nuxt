import{aV as v,aW as b,O as f,a as _,r as p,o as a,b as i,h as g,H as y,e as r,y as n,F as $,x as k,I as l,J as x,N as o,G as S,t as T}from"./entry.92cc3846.js";const z={name:"Tab",inject:{tabs:{from:"tabState"}},props:{id:{type:[String,Object,Number,null],required:!0},default:{type:Boolean,default:!1},keepAlive:{type:Boolean,default:!1}},data:()=>({active:!1,disabled:!1}),created(){this.register(),this.default&&this.activate()},beforeUnmount(){this.remove()},methods:{register(){this.tabs.register(this)},activate(){this.tabs.activate(this)},enable(){this.disabled=!1},disable(){this.active||(this.disabled=!0)},remove(){this.tabs.remove(this)}},render(){if(!this.keepAlive&&!this.active)return null;const e=this.keepAlive?[[v,this.active]]:[],t=b("div",{class:"animate__animated animate__fadeIn"},[this.$slots.default()]);return f(t,e)}},E={name:"CoreTabs",inheritAttrs:!1,emits:["activated","registered","removed","selected"],data:()=>({tabs:[]}),provide(){return{tabState:{tabs:this.tabs,register:this.register,activate:this.activate,remove:this.remove}}},methods:{activate(e){this.tabs.forEach(t=>t.active=e._.uid===t._.uid),this.$nextTick(()=>this.$emit("activated",e.id))},key(e){return typeof e=="object"?JSON.stringify(e):e},register(e){this.tabs.push(e),this.$emit("registered",e.id),this.tabs.length===1&&this.activate(e)},remove(e){const t=this.tabIndex(e);this.tabs.splice(t,1),this.$emit("removed",e.id)},select(e){e.disabled||(this.$emit("selected",e.id),this.activate(e))},tabIndex(e){return this.tabs.findIndex(({_:t})=>t.uid===e._.uid)}},render(){return this.$slots.default({key:this.key,tabs:this.tabs,tabEvents:e=>({click:()=>this.select(e)})})}};const N={name:"EnsoTabs",components:{CoreTabs:E},inheritAttrs:!1,props:{size:{type:String,default:"normal",validator:e=>["normal","small","medium","large"].includes(e)}},computed:{tabs(){return this.$refs.tabs.tabs}}},w={class:"tab-list has-background-grey-light"},A=["disabled"];function B(e,t,d,C,I,V){const c=p("core-tabs");return a(),i("div",{class:n(["enso-tabs",e.$attrs.class])},[g(c,l({ref:"tabs"},e.$attrs),{default:y(({key:h,tabs:u,tabEvents:m})=>[r("div",{class:n(["tabs is-toggle is-fullwidth no-scrollbars",`is-${d.size}`])},[r("ul",w,[(a(!0),i($,null,k(u,s=>(a(),i("li",{class:n({"is-active":s.active}),key:h(s.id)},[r("a",l({class:{"has-background-white has-text-grey-dark":s.active},disabled:s.disabled||null},x(m(s),!0)),[o(e.$slots,"label",{tab:s.id},()=>[S(T(s.id),1)])],16,A)],2))),128))])],2),o(e.$slots,"default")]),_:3},16)],2)}const O=_(N,[["render",B]]);export{O as E,z as _};
