import{d as y,a as x,L as f,y as b,U as v,I as S,X as w}from"./index.1bf5856a.js";import{a as k,bx as U,r as p,o as E,b as B,h as _,e as m}from"./entry.92cc3846.js";import{L as C}from"./index.44e8f268.js";/* empty css              */import{a as L}from"./FileSaver.min.a072bdec.js";import"./text.2058c26f.js";import"./json.3f897cba.js";import"./tree.65d50c14.js";import"./vue.runtime.esm-bundler.08aa84eb.js";const u=Object.assign({},y,{tip:x()});Array.prototype.remove=function(){let t,e=arguments,s=e.length,n;for(;s&&this.length;)for(t=e[--s];(n=this.indexOf(t))!==-1;)this.splice(n,1);return this};const D={layout:"auth",components:{vSelect:U,Loading:C},head:{title:"Pedigree Tree View"},data:()=>({persons:[],selected_option:null,data:{},all_nodes:[],tree:null,dag:null,svg:null,g:null,tip:null,duration:750,zoom:null,isLoading:!0,fullPage:!0,color:"#4fcf8d",backgroundColor:"#ffffff"}),mounted(){},async created(){this.persons=await this.$axios.$get("/api/get_person")},methods:{async setSelected(t){this.isLoading=!0;const e={start_id:t};try{let s=await this.$axios.$get("/api/trees/show",{params:e});if(this.data=s,!this.data.links.length){console.log("no data found");return}this.data.links=this.data.links.map(n=>n.map(r=>r.toString())),u.selectAll("#tree").selectAll("svg").remove(),this.isLoading=!1,setTimeout(this.generate,1e3)}catch(s){console.log(s)}this.isLoading=!1},async fetchdata(){this.isLoading=!0;try{this.data=await this.$axios.$get("/api/trees/show"),this.isLoading=!1,this.generate()}catch{console.log(error)}this.isLoading=!1},generate(){Object.keys(this.data.unions).forEach(a=>this.data.unions[a].isUnion=!0),Object.keys(this.data.persons).forEach(a=>this.data.persons[a].isUnion=!1);let t={top:20,right:0,bottom:30,left:0},e=1500-t.left-t.right,s=800-t.top-t.bottom,n=e,r=s;this.zoom=u.zoom().on("zoom",(a,g)=>this.g.attr("transform",a.transform)),this.tip=u.tip.attr("class","d3-tip").direction("e").offset([0,5]).html(a=>a.data.isUnion?void 0:(`
              <span style='margin-left: 2.5px;'><b>`+a.data.name+`</b></span><br>
                <table style="margin-top: 2.5px;">
                  <tr><td>born</td><td>`+(this.getFullDisplayBirthYear(a)||"?")+" in "+(a.data.birthday_plac||"?")+`</td></tr>
                  <tr><td>died</td><td>`+(this.getFullDisplayDeathYear(a)||"?")+" in "+(a.data.deathday_plac||"?")+`</td></tr>
                </table>`).replace(new RegExp("null","g"),"?")),this.svg=u.select("#tree").append("svg").attr("width",n).attr("height",r).call(this.zoom).call(this.tip),this.g=this.svg.append("g");let o=120,h=50;try{console.log(f()),this.tree=b().nodeSize(()=>[h,o]).layering(v()).decross(S()).coord(f())}catch(a){console.log(a)}if(this.dag=w()(this.data.links),this.dag.id){let a=this.dag.copy();a.id=void 0,this.dag=a}this.all_nodes=this.dag.descendants(),this.all_nodes.forEach(a=>{a.data=this.data.persons[a.data.id]?this.data.persons[a.data.id]:this.data.unions[a.data.id],a.childrens=a.children(),a._children=a.children(),a.inserted_nodes=[],a.inserted_roots=[],a.neighbors=[],a.visible=!1,a.inserted_connections=[]});let d=this.all_nodes.find(a=>{if(a.data)return a.data.id===this.data.start});d.visible=!0,d.neighbors=[],d.neighbors=this.getNeighbors(d),d.x0=r/2,d.y0=n/2,this.update(d)},remove_inserted_root_nodes(t){t.inserted_connections.forEach(e=>{e[0].childrens.includes(e[1])&&(e[0]._children.push(e[1]),e[0].childrens.remove(e[1]))}),t.inserted_nodes.forEach(this.remove_inserted_root_nodes)},collapse(t){this.remove_inserted_root_nodes(t),t.neighbors.filter(s=>s.visible&&t.inserted_nodes.includes(s)).forEach(s=>{s.visible=!1,t.childrens.includes(s)&&(t._children.push(s),t.childrens.remove(s)),s.childrens.includes(t)&&(s._children.push(t),s.childrens.remove(t)),s.data.isUnion&&this.collapse(s),t.inserted_nodes.remove(s)})},add_root_nodes(t){t.inserted_connections.forEach(e=>{e[0]._children.includes(e[1])&&(e[0].childrens.push(e[1]),e[0]._children.remove(e[1]))}),t.inserted_nodes.forEach(this.add_root_nodes)},uncollapse(t,e){if(t===void 0)return;t.neighbors.filter(r=>r.visible).forEach(r=>{t._children.includes(r)&&t.inserted_connections.push([t,r]),r._children.includes(t)&&t.inserted_connections.push([r,t])}),t.neighbors.filter(r=>!r.visible).forEach(r=>{r.neighbors=this.getNeighbors(r),r.visible=!0,t._children.includes(r)&&(t.childrens.push(r),t._children.remove(r)),r._children.includes(t)&&(r.childrens.push(t),r._children.remove(t),e&&!t.inserted_roots.includes(r)&&t.inserted_roots.push(r)),r.data.isUnion&&this.uncollapse(r,!0),t.inserted_nodes.push(r)}),e||this.add_root_nodes(t)},is_extendable(t){return t.neighbors.filter(e=>!e.visible).length>0},getNeighbors(t){return t.data.isUnion?this.getChildren(t).concat(this.getPartners(t)):this.getOwnUnions(t).concat(this.getParentUnions(t))},getParentUnions(t){if(t===void 0)return[];if(t.data.isUnion)return[];let e=t.data.parent_union;return e?[this.all_nodes.find(n=>{if(n.data)return n.data.id===e})].filter(n=>n!==void 0):[]},getParents(t){let e=[];return t.data.isUnion?t.data.partner.forEach(s=>e.push(this.all_nodes.find(n=>n.data.id===s))):this.getParentUnions(t).forEach(n=>e=e.concat(this.getParents(n))),e.filter(s=>s!==void 0)},getOtherPartner(t,e){let s=e.partner.find(n=>n!==t.data.id&&n!==void 0);return this.all_nodes.find(n=>n.data.id===s)},getPartners(t){let e=[];return t.data.isUnion?t.data.partner.forEach(s=>e.push(this.all_nodes.find(n=>n.data.id===s))):this.getOwnUnions(t).forEach(n=>{e.push(this.getOtherPartner(t,n.data))}),e.filter(s=>s!==void 0)},getOwnUnions(t){if(t.data.isUnion)return[];let e=[];return t.data.own_unions.forEach(s=>e.push(this.all_nodes.find(n=>{var r;return((r=n.data)==null?void 0:r.id)===s}))),e.filter(s=>s!==void 0)},getChildren(t){let e=[];return t.data.isUnion?e=t.childrens.concat(t._children):this.getOwnUnions(t).forEach(n=>e=e.concat(this.getChildren(n))),e=e.filter(s=>s!==void 0).sort((s,n)=>Math.sign((this.getFullDisplayBirthYear(s)||0)-(this.getFullDisplayDeathYear(n)||0))),e},getFullDisplayBirthYear(t){if(t.data&&t.data.birth_year)return t.data.birth_year;if(t.data&&t.data.birthday)return this.getBirthYear(t)},getFullDisplayDeathYear(t){if(t.data&&t.data.death_year)return t.data.death_year;if(t.data&&t.data.deathday)return this.getDeathYear(t)},getBirthYear(t){return new Date(t.data.birthday||NaN).getFullYear()},getDeathYear(t){return new Date(t.data.deathday||NaN).getFullYear()},find_path(t){let e=this.getParents(t),s=!1,n=null;return e.forEach(r=>{r&&!s&&(r.id==="profile-89285291"?(s=!0,n=[r,t]):(n=this.find_path(r),n&&(s=!0,n.push(t))))}),n},update(t){if(t.data.id!==this.data.start)return!1;this.tree(this.dag);let e=this.dag.descendants(),s=this.dag.links(),n=this.g.selectAll("g.node").data(e,l=>{if(l.data)return l.data.id||(l.data.id=++i)}),r=n.enter().append("g").attr("class","node").attr("transform",l=>"translate("+t.y0+","+t.x0+")").on("click",this.onClick).on("mouseover",(l,c)=>this.tip.show(c,l.target)).on("mouseout",(l,c)=>this.tip.hide(c,l.target)).attr("visibility","visible");r.append("circle").attr("class","node").attr("r",1e-6).style("fill",l=>this.is_extendable(l)?"lightsteelblue":"#fff"),r.append("text").attr("dy","-2").attr("x",13).attr("text-anchor","start").text(l=>{if(l.data)return l.data.name}),r.append("text").attr("dy","10").attr("x",13).attr("text-anchor","start").text(l=>{if(!(l.data&&l.data.isUnion))return(this.getFullDisplayBirthYear(l)||"?")+" - "+(this.getFullDisplayDeathYear(l)||"?")});let o=r.merge(n);o.transition().duration(this.duration).attr("transform",l=>"translate("+l.y+","+l.x+")"),o.select("circle.node").attr("r",l=>{l.data&&10*!l.data.isUnion}).style("fill",l=>this.is_extendable(l)?"lightsteelblue":"#fff").attr("cursor","pointer");let h=n.exit().transition().duration(this.duration).attr("transform",l=>"translate("+t.y+","+t.x+")").attr("visibility","hidden").remove();h.select("circle").attr("r",1e-6),h.select("text").style("fill-opacity",1e-6);let d=this.g.selectAll("path.link").data(s,l=>l.source.id+l.target.id);d.enter().insert("path","g").attr("class","link").attr("d",l=>{let c={x:t.x0,y:t.y0};return this.diagonal(c,c)}).merge(d).transition().duration(this.duration).attr("d",l=>this.diagonal(l.source,l.target)),d.exit().transition().duration(this.duration).attr("d",l=>{let c={x:t.x,y:t.y};return this.diagonal(c,c)}).remove(),this.svg.transition().duration(this.duration).call(this.zoom.transform,u.zoomTransform(this.g.node()).translate(-(t.y-t.y0),-(t.x-t.x0))),e.forEach(l=>{l.x0=l.x,l.y0=l.y}),u.select("#saveButton").on("click",()=>{let l=this.getSVGString(this.svg.node());this.svgString2Image(l,this.svg.node().getBBox().width,this.svg.node().getBBox().height,"png",this.onSave)})},diagonal(t,e){return`M ${t.y} ${t.x}
                C ${(t.y+e.y)/2} ${t.x},
                  ${(t.y+e.y)/2} ${e.x},
                  ${e.y} ${e.x}`},getCSSStyles(t){let e=[];e.push("#"+t.id);for(let o=0;o<t.classList.length;o++)r("."+t.classList[o],e)||e.push("."+t.classList[o]);let s=t.getElementsByTagName("*");for(let o=0;o<s.length;o++){let h=s[o].id;r("#"+h,e)||e.push("#"+h);let d=s[o].classList;for(let a=0;a<d.length;a++)r("."+d[a],e)||e.push("."+d[a])}let n="";for(let o=0;o<document.styleSheets.length;o++){let h=document.styleSheets[o];try{if(!h.cssRules)continue}catch(a){if(a.name!=="SecurityError")throw a;continue}let d=h.cssRules;for(let a=0;a<d.length;a++)r(d[a].selectorText,e)&&(n+=d[a].cssText)}return n;function r(o,h){return h.indexOf(o)!==-1}},appendCSS(t,e){let s=document.createElement("style");s.setAttribute("type","text/css"),s.innerHTML=t;let n=e.hasChildNodes()?e.children[0]:null;e.insertBefore(s,n)},getSVGString(t){t.setAttribute("xlink","http://www.w3.org/1999/xlink");let e=this.getCSSStyles(t);this.appendCSS(e,t);let n=new XMLSerializer().serializeToString(t);return n=n.replace(/(\w+)?:?xlink=/g,"xmlns:xlink="),n=n.replace(/NS\d+:href/g,"xlink:href"),n},svgString2Image(t,e,s,n,r){let o="data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(t))),h=document.createElement("canvas"),d=h.getContext("2d");h.width=e,h.height=s;let a=new Image;a.onload=()=>{d.clearRect(0,0,e,s),d.drawImage(a,0,0,e,s),h.toBlob(g=>{let l=Math.round(g.length/1024)+" KB";r&&r(g,l)})},a.src=o},onClick(t,e){e.data.isUnion||(this.is_extendable(e)?this.uncollapse(e):this.collapse(e),this.update(e))},onSave(t,e){L.saveAs(t,"D3 vis exported to PNG.png")}}},$=m("div",{id:"tree"},null,-1),z=m("button",{id:"saveButton"},"Export my PNG",-1);function P(t,e,s,n,r,o){const h=p("loading"),d=p("v-select");return E(),B("div",null,[_(h,{active:!1,color:t.color,"background-color":t.backgroundColor},null,8,["color","background-color"]),_(d,{label:"name",modelValue:t.selected_option,"onUpdate:modelValue":e[0]||(e[0]=a=>t.selected_option=a),reduce:a=>a.id,options:t.persons,onInput:o.setSelected},null,8,["modelValue","reduce","options","onInput"]),$,z])}const M=k(D,[["render",P]]);export{M as default};
