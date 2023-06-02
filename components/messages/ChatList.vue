<template>
  <div>
    <v-list>
      <v-list-item v-for="chat in chats" :key="chat.id" @click="selectChat(chat)">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ chat.user_one.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chats: [],
      selectedChat: null,
    };
  },
  mounted() {
    this.fetchChats();
  },
  methods: {
    fetchChats() {
      this.$axios.get('/api/chats')
        .then(response => {
          console.log(response.data);
          this.chats = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectChat(chat) {
      this.selectedChat = chat;
    },
  },
};
</script>
