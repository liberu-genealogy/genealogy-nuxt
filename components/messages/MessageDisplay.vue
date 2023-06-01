<template>
  <div>
    <v-card v-for="message in messages" :key="message.id">
      <v-card-text>{{ message.content }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['chatId'],
  data() {
    return {
      messages: [],
    };
  },
  watch: {
    chatId() {
      this.fetchMessages();
    },
  },
  methods: {
    fetchMessages() {
      axios.get(`/api/chats/${this.chatId}`)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
