<template>
  <div>
    <v-list>
      <v-list-item v-for="chat in chats" :key="chat.id">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ chat.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ chat.lastMessage }}</v-list-item-subtitle>
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
    };
  },
  mounted() {
    this.fetchChats();
  },
  methods: {
    fetchChats() {
      axios.get('/api/chats')
        .then(response => {
          this.chats = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
