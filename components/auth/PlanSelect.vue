<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        <div>{{ selected.title }}</div>
        <div>£{{ (selected.amount / 100).toFixed(2) }}</div>
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
        class="option"
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
            <div>{{ option.title }}</div>
            <div>£{{ (option.amount / 100).toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      default: {
        type: String,
        required: false,
        default: null,
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    data() {
      return {
        selected: this.default
          ? this.default
          : this.options.length > 0
          ? this.options[0]
          : {
            title: 'Select a plan', amount: 0 
          },
        open: false,
      };
    },
    mounted() {
      this.$emit("input", this.selected);
    },
  };
  </script>
  
  <style scoped>
  @import '~/assets/css/base.css';
  .custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 60px;
    line-height: 50px;
    font-family: inherit;
    /* border-color: #E0DFDF; */
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #222222;
  }
  
  .custom-select .selected {
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    padding-left: 1em;
    padding-right: 2em;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .custom-select .selected.open {
    color: #222222;
    border: 1px solid #4fcf8d;
    border-radius: 10px 10px 0px 0px;
  }
  
  .custom-select .selected:after {
    position: absolute;
    content: "";
    top: 22px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #222222 transparent transparent transparent;
  }
  
  .custom-select.select:after {
    display: none;
  }
  .custom-select .items {
    color: #222222;
    border-radius: 0px 0px 10px 10px;
    overflow: hidden;
    border-right: 1px solid #dbdbdb;
    border-left: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    position: absolute;
    background-color: white;
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .custom-select .items > div {
    color: #222222;
    padding-left: 1em;
    padding-right: 1em;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .custom-select .items div:hover {
    background-color: #4fcf8d;
    color: white;
  }
  
  .selectHide {
    display: none;
  }
  </style>
  