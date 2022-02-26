import Vue from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default () => {
  Vue.component('StripeCheckout', StripeCheckout);
};
