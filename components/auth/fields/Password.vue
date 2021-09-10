<template>
  <div class="field">
    <div class="control has-icons-left has-icons-right">
      <input
        :value="value"
        class="input is-danger"
        :type="meta.content"
        placeholder="Password"
        :autocomplete="autocomplete"
        @input="
          $emit('input', $event.target.value);
          errors.clear('password');
        "
      />
      <span class="icon is-small is-left">
        <fa icon="lock" />
      </span>
      <reveal-password :meta="meta" class="is-spaced" />
      <span class="icon is-small is-right has-text-success">
        <fa icon="check" />
      </span>
      <span class="icon is-small is-right has-text-danger">
        <fa icon="exclamation-triangle" />
      </span>
      <slot
        name="password-strength"
        :password="value"
        :has-password="value.length > 0"
      />
    </div>
    <p class="has-text-danger is-size-7">password</p>
  </div>
</template>

<script>
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
  import { focus } from "@enso-ui/directives";
  import RevealPassword from "@enso-ui/forms/src/bulma/parts/RevealPassword.vue";
  library.add(faExclamationTriangle);
  export default {
    name: "Password",
    directives: { focus },

    components: { RevealPassword },
    props: {
      autocomplete: {
        type: String,
        default: "current-password",
      },
      value: {
        type: String,
        required: true,
      },
    },
    computed: {},
    data: () => ({
      meta: {
        content: "password",
      },
    }),
  };
</script>
