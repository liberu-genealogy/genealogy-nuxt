import{a as y,r as o,o as i,c as f,l as U,v as R,dE as z,w as C,b as p,e as _,h as t,dc as A,E as D,dF as H,dG as q,aO as L,T as N,aL as G,S as E,z as g,H as d,t as Y,O as b,y as O}from"./entry.92cc3846.js";import{_ as J}from"./FilterState.16aca4b3.js";import{E as K}from"./EnsoTable.3d9aed36.js";import"./VueSelect.b511f2f3.js";import{E as M}from"./EnsoSelect.8229d59e.js";import{E as P}from"./EnsoDatepicker.9c00621a.js";import{V as Q,B as W,E as X}from"./EnsoDateFilter.2eb18b56.js";import{E as Z}from"./EnsoSelectFilter.6aa28328.js";import{F as w}from"./Flags.f27e4707.js";import"./SearchMode.06b93769.js";import"./focus.3e4288bb.js";import"./selectOnFocus.6b9dd492.js";import"./Modal.987fd8d3.js";import"./strings.38ce49d3.js";const ee={name:"EnsoFilter",components:{VueFilter:Q},inject:["i18n"]};function se(s,a,n,m,$,l){const v=o("vue-filter");return i(),f(v,{i18n:l.i18n},null,8,["i18n"])}const ae=y(ee,[["render",se]]);U.add(R,z);const te={name:"Filters",components:{BooleanFilter:W,EnsoDateFilter:X,EnsoFilter:ae,EnsoSelectFilter:Z},inject:["i18n"],props:{filters:{type:Object,required:!0},intervals:{type:Object,required:!0},params:{type:Object,required:!0}},data:()=>({overdueOptions:[{value:!0,icon:"exclamation",class:"has-text-danger"}]}),computed:{...C(["enums"]),flagOptions(){return this.enums.flags._keys().map(s=>({icon:"flag",value:s*1,class:`has-text-${this.enums.flags._get(s).toLowerCase()}`}))}}},le={class:"columns is-centered is-multiline"},ne={class:"column is-narrow"},oe={class:"column is-narrow flags-filter"},ie={class:"column is-narrow"},re={class:"column is-narrow"},de={class:"column is-narrow"};function ce(s,a,n,m,$,l){const v=o("enso-select-filter"),u=o("enso-filter"),h=o("boolean-filter"),k=o("enso-date-filter");return i(),p("div",le,[_("div",ne,[t(v,{class:"box raises-on-hover allocation-filter",modelValue:n.filters.tasks.allocated_to,"onUpdate:modelValue":a[0]||(a[0]=r=>n.filters.tasks.allocated_to=r),source:"administration.users.options",label:"person.name",name:l.i18n("Allocated To")},null,8,["modelValue","name"])]),_("div",oe,[t(u,{class:"box raises-on-hover",modelValue:n.filters.tasks.flag,"onUpdate:modelValue":a[1]||(a[1]=r=>n.filters.tasks.flag=r),icons:"",options:l.flagOptions,name:l.i18n("Importance")},null,8,["modelValue","options","name"])]),_("div",ie,[t(h,{class:"box raises-on-hover",modelValue:n.filters.tasks.completed,"onUpdate:modelValue":a[2]||(a[2]=r=>n.filters.tasks.completed=r),icons:"",name:l.i18n("Completed")},null,8,["modelValue","name"])]),_("div",re,[t(u,{class:"box raises-on-hover",modelValue:n.params.overdue,"onUpdate:modelValue":a[3]||(a[3]=r=>n.params.overdue=r),icons:"",options:s.overdueOptions,name:l.i18n("Overdue")},null,8,["modelValue","options","name"])]),_("div",de,[t(k,{class:"box raises-on-hover",modelValue:n.params.dateInterval,"onUpdate:modelValue":a[4]||(a[4]=r=>n.params.dateInterval=r),onUpdate:a[5]||(a[5]=r=>n.intervals.tasks.reminder=r)},null,8,["modelValue"])])])}const me=y(te,[["render",ce]]);U.add(A,D,H);const ue={meta:{breadcrumb:"index",title:"Tasks"},inject:["i18n","route","toastr","errorHandler"],directives:{tooltip:q,clickOutside:L},components:{Avatar:N,EnsoDatepicker:P,EnsoTable:K,FilterState:J,VueSwitch:G,Filters:me,Flags:w,EnsoSelect:M},data:()=>({apiVersion:1.1,ready:!1,filters:{tasks:{completed:!1,flag:null,allocated_to:null}},intervals:{tasks:{reminder:{min:null,max:null}}},params:{dateInterval:"today",overdue:null}}),computed:{...C(["enums","user","meta"]),canChangeAllocation(){return[this.enums.roles.Admin,this.enums.roles.Supervisor].includes(`${this.user.role.id}`)},dateFormat(){return this.meta.dateTimeFormat.split(":s").shift()}},methods:{update(s,a,n){this.$axios.patch(this.route("tasks.update",{task:s}),{[a]:n}).then(({data:{message:m}})=>{this.toastr.success(m),this.$refs.table.fetch()}).catch(m=>{m.response&&m.response.status===422?this.toastr.warning(this.i18n(m.response.data.message)):this.errorHandler(m)})},isOpen(s){var a;return(a=this.$refs[s])==null?void 0:a.isOpen}}},pe={class:"wrapper"},fe={class:"icon is-small has-text-info is-clickable"},_e={key:1,class:"icon is-naked is-clickable is-small"},ve={key:1,class:"icon is-naked is-clickable is-small"},ke={key:0,class:"allocated-to"};function ge(s,a,n,m,$,l){const v=o("filters"),u=o("fa"),h=o("flags"),k=o("v-popover"),r=o("enso-datepicker"),V=o("avatar"),S=o("enso-select"),T=o("vue-switch"),I=o("enso-table"),B=o("filter-state"),F=E("tooltip"),j=E("click-outside");return i(),p("div",pe,[s.ready?(i(),f(v,{key:0,filters:s.filters,intervals:s.intervals,params:s.params},null,8,["filters","intervals","params"])):g("",!0),t(I,{class:"box is-paddingless raises-on-hover",filters:s.filters,intervals:s.intervals,params:s.params,onReady:a[0]||(a[0]=e=>s.ready=!0),onReset:a[1]||(a[1]=e=>s.$refs.filterState.reset()),id:"tasks",ref:"table"},{name:d(({row:e})=>[_("span",null,Y(e.name),1),b((i(),p("span",fe,[t(u,{icon:"info-circle",size:"xs"})])),[[F,e.description]])]),flag:d(({row:e,column:c})=>[t(k,{trigger:"click",ref:`flag-${e.id}`},{popover:d(()=>[l.isOpen(`flag-${e.id}`)?(i(),f(h,{key:0,modelValue:e.flag,"onUpdate:modelValue":x=>e.flag=x,onInput:x=>{l.update(e.id,"flag",e.flag),s.$refs[`flag-${e.id}`].hide()}},null,8,["modelValue","onUpdate:modelValue","onInput"])):g("",!0)]),default:d(()=>[c.enum._get(e.flag)?(i(),p("span",{key:0,class:O(["icon is-clickable",`has-text-${c.enum._get(e.flag).toLowerCase()}`])},[t(u,{icon:"flag"})],2)):(i(),p("span",_e,[t(u,{icon:"cog",size:"xs"})]))]),_:2},1536)]),reminder:d(({row:e})=>[t(k,{trigger:"click","auto-hide":!1,ref:`reminder-${e.id}`},{popover:d(()=>[l.isOpen(`reminder-${e.id}`)?b((i(),f(r,{key:0,class:"reminder-picker",modelValue:e.rawReminder,"onUpdate:modelValue":c=>e.rawReminder=c,format:"Y-m-d H:i:s",time:"","alt-format":l.dateFormat},null,8,["modelValue","onUpdate:modelValue","alt-format"])),[[j,()=>{l.update(e.id,"reminder",e.rawReminder),s.$refs[`reminder-${e.id}`].hide()}]]):g("",!0)]),default:d(()=>[e.reminder?b((i(),p("span",{key:0,class:O(["icon is-clickable",e.overdue?"has-text-danger":"has-text-success"])},[t(u,{icon:"clock"})],2)),[[F,e.reminder]]):(i(),p("span",ve,[t(u,{icon:"cog",size:"xs"})]))]),_:2},1536)]),allocatedTo:d(({row:e})=>[l.canChangeAllocation?(i(),f(k,{key:0,trigger:"click",ref:`allocated_to-${e.id}`},{popover:d(()=>[l.isOpen(`allocated_to-${e.id}`)?(i(),p("div",ke,[t(S,{modelValue:e.allocatedTo.id,"onUpdate:modelValue":c=>e.allocatedTo.id=c,onSelect:c=>{l.update(e.id,"allocated_to",e.allocatedTo.id),s.$refs[`allocated_to-${e.id}`].hide()},source:"tasks.users","disable-clear":"",label:"person.name"},null,8,["modelValue","onUpdate:modelValue","onSelect"])])):g("",!0)]),default:d(()=>[t(V,{class:"is-24x24 is-clickable",user:e.allocatedTo},null,8,["user"])]),_:2},1536)):(i(),f(V,{key:1,class:"is-24x24",user:e.allocatedTo},null,8,["user"]))]),completed:d(({row:e})=>[t(T,{class:"is-medium",modelValue:e.completed,"onUpdate:modelValue":c=>e.completed=c,onInput:c=>l.update(e.id,"completed",e.completed)},null,8,["modelValue","onUpdate:modelValue","onInput"])]),createdBy:d(({row:{createdBy:e}})=>[t(V,{class:"is-24x24",user:e},null,8,["user"])]),_:1},8,["filters","intervals","params"]),t(B,{"api-version":s.apiVersion,name:"taskFilters",filters:s.filters,params:s.params,onReady:a[2]||(a[2]=e=>s.ready=!0),ref:"filterState"},null,8,["api-version","filters","params"])])}const Be=y(ue,[["render",ge]]);export{Be as default};
