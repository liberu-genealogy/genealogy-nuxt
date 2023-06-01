<!-- MessageInput.vue -->
<template>
  <div>
    <v-text-field v-model="newMessage" label="Message" />
    <v-btn @click="sendMessage">Send</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      // Make an API request to send a message
      axios.post('/api/chats', {
        content: this.newMessage,
      })
        .then(response => {
          // Clear the input field after sending the message
          this.newMessage = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
