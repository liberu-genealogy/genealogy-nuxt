import{a as o,o as r,b as s}from"./entry.92cc3846.js";import{E as i}from"./EnsoTable.3d9aed36.js";import{P as a}from"./index.6f6848e2.js";import"./SearchMode.06b93769.js";import"./focus.3e4288bb.js";import"./VueSelect.b511f2f3.js";import"./EnsoDatepicker.9c00621a.js";import"./selectOnFocus.6b9dd492.js";import"./Modal.987fd8d3.js";import"./text.2058c26f.js";import"./tree.65d50c14.js";const n={layout:"auth",meta:{permission:{name:"trees menu"},title:"Trees - Index"},components:{EnsoTable:i},methods:{fetchData(){this.$axios.$get("/api/trees/show").then(e=>{const t=new a("webtrees-pedigree-chart-container",{labels:{zoom:"Use Ctrl + scroll to zoom in the view",move:"Move the view with two fingers"},generations:4,defaultColor:"#0000FF",fontColor:"#0000FF",showEmptyBoxes:"up",treeLayout:"right",rtl:"rtl"});t.cssFile="assets/css/svg.css",console.log(e),t.draw(e)})}},mounted(){this.fetchData()}},m={id:"webtrees-pedigree-chart-container"};function c(e,t,p,l,h,d){return r(),s("div",m)}const E=o(n,[["render",c]]);export{E as default};
