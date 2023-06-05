<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <chat-list :chats="chats" :users="users" @selectChat="selectChat" @chat-added="addChat"></chat-list>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet>
          <chat-messages v-if="selectedChat" :users="users" :messages="selectedChat.message" @message-sent="sendMessage" />
        </v-sheet>
      </v-col>
      <v-responsive width="100%"></v-responsive>
      <v-col>
        <v-sheet>
          <new-chat-modal :users="users" @chat-added="addChat"></new-chat-modal>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<router>
  {
    name: 'social.messages.index'
  }
</router>

<script>
import ChatList from '../../../components/messages/ChatList.vue';
import ChatMessages from '../../../components/messages/ChatMessages.vue';
import NewChatModal from '../../../components/messages/NewChatModal.vue';

export default {
  components: {
    ChatList,
    ChatMessages,
    NewChatModal,
  },
  data() {
    return {
      chats: [],
      users: [],
      selectedChat: null,
    };
  },
  mounted() {
    this.fetchChats();
    this.fetchUsers();
  },
  methods: {
    fetchChats() {
      // Fetch the list of chats for the logged-in user
      // Populate the `chats` array with the response data
      this.$axios.get('/api/social/chats')
        .then(response => {
          this.chats = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchUsers() {
      // Fetch the list of users
      // Populate the `users` array with the response data
      this.$axios.get('/api/social/chats/options')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectChat(chat) {
      this.selectedChat = chat;
    },
    addChat(user) {
      if (this.chats.some(chat => chat.user_one.id === user || chat.user_two.id === user)) {
        alert('already exists!'); return;
      }

      // Create a new chat with the selected user
      // Add the newly created chat to the `chats` array
      // Select the newly created chat as the `selectedChat`
      this.$axios.post('/api/social/chats', {
        user_two: user,
      })
        .then(response => {
          this.selectedChat = response.data;
          this.fetchChats();
        })
        .catch(error => {
          console.error(error);
        });
    },
    sendMessage(messageContent) {
      // Send the message to the selected chat
      // Add the newly sent message to the `selectedChat.messages` array
      this.$axios.post(`/api/social/chats/${this.selectedChat.id}`, {
        message: messageContent,
      })
        .then(response => {
          this.selectedChat.message.push(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
