<template>
  <!-- Create a Vuetify container with a row of columns -->
  <v-container>
    <v-row>
      <!-- Create a column for the chat list component -->
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <!-- Pass in the chats and users data as props to the chat-list component -->
          <!-- Listen for the `selectChat` and `chat-added` events emitted by the component -->
          <chat-list :chats="chats" :users="users" @selectChat="selectChat" @chat-added="addChat"></chat-list>
        </v-sheet>
      </v-col>
      <!-- Create a column for the chat messages component, but only show it if a chat is selected -->
      <v-col>
        <v-sheet>
          <chat-messages v-if="selectedChat" :users="users" :messages="selectedChat.message"
            @message-sent="sendMessage" />
        </v-sheet>
      </v-col>
      <!-- Create a column for the new chat modal -->
      <v-col>
        <v-sheet>
          <!-- Pass in the users data as a prop to the new-chat-modal component -->
          <!-- Listen for the `chat-added` event emitted by the component -->
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
  meta: {
    permission: { name: 'dashboard menu' },
    title: 'Messages',
  },
  inject: ['toastr'],
  data() {
    return {
      chats: [], // Set initial state of 'chats' to an empty array
      users: [], // Set initial state of 'users' to an empty array
      selectedChat: null, // Set initial state of 'selectedChat' to null
    };
  },
  mounted() {
    // When the page is loaded, fetch the list of chats and users
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
      const apiUrl = this.$store.state.user.id == 1 ? '/administration/people/options' : '/social/chats/options' ;
      // Fetch the list of users
      // Populate the `users` array with the response data
      // this.$axios.get('/api/social/chats/options')
      this.$axios.get(`/api${apiUrl}`)
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectChat(chat) {
      // Set the selected chat to the chat that was clicked on in the chat list
      this.selectedChat = chat;
    },
    addChat(user) {
      // Check if a chat already exists with the selected user
      // Alert the user if a chat already exists and return early
      if (this.chats.some(chat => chat.user_one.id === user || chat.user_two.id === user)) {
        this.toastr.info('Already exists');
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
