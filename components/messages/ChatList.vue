<template>
  <div>
    <v-list>
      <v-list-item v-for="chat in chats" :key="chat.id" @click="$emit('selectChat', chat)">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ getOtherUserName(chat) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['chats', 'users'],
  methods: {
    getOtherUserName(chat) {
      console.log(chat.user_one, this.$store.state.user)
      const userEmail = chat.user_one.email === this.$store.state.user.email ? chat.user_two.email : chat.user_one.email;
      const opponentUser = this.users.find(user => user.email === userEmail);
      const opponentUserName = opponentUser ? opponentUser.name : userEmail;
      return opponentUserName;
    }
  }
};
</script>
