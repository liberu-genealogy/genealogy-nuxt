<template>
  <div>
    <!-- Create a list component with a clickable list item for each chat in 'chats' property -->
    <v-list>
      <v-list-item v-for="chat in chats" :key="chat.id" @click="$emit('selectChat', chat)">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <!-- Get the other user's name using the 'getOtherUserName' method -->
          <v-list-item-title>{{ getOtherUserName(chat) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['chats', 'users'], // Accepts two props, 'chats' and 'users'
  methods: {
    getOtherUserName(chat) {
      // Determine the email address of the chat opponent
      const userEmail = chat.user_one.email === this.$store.state.user.email ? chat.user_two.email : chat.user_one.email;
      // Find the opponent's user object in the 'users' array based on their email address
      const opponentUser = this.users.find(user => user.email === userEmail);
      // Use the opponent's user object to get their name, or fallback to their email address
      const opponentUserName = opponentUser ? opponentUser.name : userEmail;
      // Return the opponent's name
      return opponentUserName;
    }
  }
};
</script>