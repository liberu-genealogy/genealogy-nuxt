import { createApp } from 'vue';
import { defineRule, ErrorMessage } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { configure } from 'vee-validate';

// Install all VeeValidate rules
Object.keys(rules).forEach((rule) => {
  // defineRule(rule, rules[rule]);
});

// Set up VeeValidate configuration
configure({
  generateMessage: ({ field, rule }) => {
    const messages = {
      required: `${field} is required.`,
      // Add other rule messages as needed
    };
    return messages[rule];
  },
});

const app = createApp({});

// Register VeeValidate components globally
app.component('ErrorMessage', ErrorMessage);

// Mount the app
app.mount('#app');
export default app;