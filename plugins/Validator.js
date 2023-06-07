import {createApp} from "vue";
import { messages } from "vee-validate";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  Rules,
} from "vee-validate";

createApp.component("ValidationProvider", ValidationProvider);
createApp.component("ValidationObserver", ValidationObserver);

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("validate", () => {
    extend("password", {
      // Add validation for password confirm
      params: ["target"],
      validate(value, { target }) {
        return value === target;
      },
      message: "Password confirmation does not match",
    });

    Object.keys(Rules).forEach((rule) => {
      extend(rule, {
        ...Rules[rule],
        message: messages[rule],
      });
    });
  });
};
