<template>
  <v-app>
    <h1>This is Private Message page.</h1><br>
    <v-container>
      <v-row>
        <v-col cols="4">
          <ChatList />
        </v-col>
        <v-col cols="8">
          <MessageDisplay />
          <MessageInput />
        </v-col>
      </v-row>
    </v-container>
    </div>
    </div>
  </v-app>
</template>
<router>
  {
    name: 'social.messages.index'
  }
</router>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'
import Echo from 'laravel-echo';

import ChatList from '../../../components/messages/ChatList.vue';
import MessageDisplay from '../../../components/messages/MessageDisplay.vue';
import MessageInput from '../../../components/messages/MessageInput.vue';

export default {
  layout: 'auth',
  inject: ['errorHandler', 'route', 'toastr'],
  //middleware: ['permission', 'verification'],
  meta: {
    permission: { name: 'dashboard menu' },
    title: 'Groups',
  },

  components: {
    ChatList,
    MessageDisplay,
    MessageInput,
  },

  // Get the user's messages
  mounted() {
    // Initialize Echo
    this.initializeEcho();
  },
  methods: {
    initializeEcho() {
      // Import Echo configuration from your Laravel app
      const echoConfig = {
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,
        // Other relevant configuration options
      };

      // Create an Echo instance
      this.echo = new Echo(echoConfig);

      // Listen for the 'chat' private channel
      this.echo.private('chat')
        .listen('.message.sent', (message) => {
          // Handle the received message, e.g., update the conversation list or messages
        });
    },
  },
}
</script>
