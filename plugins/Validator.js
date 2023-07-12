import { createApp } from 'vue';
import { configure, defineRule, ErrorMessage } from 'vee-validate';
import { required } from '@vee-validate/rules';

// Set up VeeValidate configuration
configure({
  generateMessage: ({ field }) => `${field} is required.`,
});

const app = createApp({});

// Register VeeValidate rules
defineRule('required', required);

// Register VeeValidate components globally
app.component('ErrorMessage', ErrorMessage);

// Mount the app
app.mount('#app');
export default app;
