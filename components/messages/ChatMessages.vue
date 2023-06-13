<template>
  <div>
    <!-- Loop through each message in the 'messages' array and display its content -->
    <div v-for="message in messages" :key="message.id">
      <!-- Display the name of the user who sent the message, or the user ID if the user cannot be found -->
      <span>{{ users.find(user => user.id === message.user_id) ? users.find(user => user.id === message.user_id).name :
        message.user_id }}</span>
      <!-- Display the message content -->
      <p>{{ message.message }}</p><br>
    </div>
    <!-- Create a text input to type a new message and a send button -->
    <v-text-field v-model="newMessage" label="Message" />
    <v-btn @click="sendMessage" :disabled="!newMessage">Send</v-btn>
  </div>
</template>

<script>
export default {
  props: ['messages', 'users'], // Accepts two props, 'messages' and 'users'
  data() {
    return {
      newMessage: '' // Sets the initial state of 'newMessage' to an empty string
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        // Emit an event with the new message when the send button is clicked, and reset the 'newMessage' state
        this.$emit('message-sent', this.newMessage);
        this.newMessage = '';
      }
    }
  },
};
</script>