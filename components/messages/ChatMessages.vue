<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <p>{{ message.content }}</p>
    </div>
    <v-text-field v-model="newMessage" label="Message" />
    <v-btn @click="sendMessage" :disabled="!newMessage">Send</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      if (this.selectedChat) {
        this.$axios.get(`/api/chats/${this.selectedChat.id}/messages`)
          .then(response => {
            this.messages = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    sendMessage() {
      if (this.selectedChat) {
        this.$axios.post(`/api/chats/${this.selectedChat.id}/messages`, {
          content: this.newMessage,
        })
          .then(response => {
            this.newMessage = '';
            this.fetchMessages();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },
  watch: {
    selectedChat() {
      this.fetchMessages();
    },
  },
};
</script>
