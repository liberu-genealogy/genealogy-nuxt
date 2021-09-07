<template>
  <div class="field">
    <div class="control has-icons-left has-icons-right">
      <input
        :value="value"
        v-focus
        class="input is-danger"
        type="email"
        placeholder="Email"
        autocomplete="email"
        @input="
          $emit('input', $event.target.value);
          errors.clear('email');
        "
      />
      <span class="icon is-small is-left">
        <fa icon="envelope" />
      </span>
      <span class="icon is-small is-right has-text-success">
        <fa icon="check" />
      </span>
      <span class="icon is-small is-right has-text-danger">
        <fa icon="exclamation-triangle" />
      </span>
    </div>
    <p class="has-text-danger is-size-7">
      {{ "email" }}
    </p>
  </div>
</template>

<script>
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faCheck,
    faExclamationTriangle,
    faEnvelope,
  } from "@fortawesome/free-solid-svg-icons";
  import { focus } from "@enso-ui/directives";
  library.add(faCheck, faExclamationTriangle, faEnvelope);
  export default {
    name: "Email",
    directives: { focus },

    props: {
      value: {
        type: String,
        required: true,
      },
    },
    computed: {
      //   successful() {
      //     return this.state.successful;
      //   },
    },
  };
</script>
