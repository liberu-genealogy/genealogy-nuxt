import {createApp} from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
const app = createApp({});
export default () => {
 app.component('StripeCheckout', StripeCheckout);
};
app.mount('#app');