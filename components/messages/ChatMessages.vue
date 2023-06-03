<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <span>{{ message.user_id }}</span>
      <p>{{ message.message }}</p>
    </div>
    <v-text-field v-model="newMessage" label="Message" />
    <v-btn @click="sendMessage" :disabled="!newMessage">Send</v-btn>
  </div>
</template>

<script>
export default {
  props: ['messages', 'users'],
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      this.$emit('message-sent', this.newMessage);
      this.newMessage = '';
    }
  },
};
</script>
