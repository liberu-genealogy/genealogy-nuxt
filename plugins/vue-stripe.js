import {createApp} from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default () => {
  createApp.component('StripeCheckout', StripeCheckout);
};
