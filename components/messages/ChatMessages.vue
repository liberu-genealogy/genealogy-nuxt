<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <span>{{ users.find(user => user.id === message.user_id) ? users.find(user => user.id === message.user_id).name : message.user_id }}</span>
      <p>{{ message.message }}</p><br>
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
