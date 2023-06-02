<template>
  <div>
    <chat-list @select-chat="selectChat" @chat-added="addChat"></chat-list>
    <chat-messages :selected-chat="selectedChat"></chat-messages>
    <new-chat-modal @chat-added="addChat"></new-chat-modal>
  </div>
</template>

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
      selectedChat: null,
      chats: [],
    };
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat;
    },
    addChat(chat) {
      this.chats.push(chat);
      this.selectedChat = chat;
    },
  },
};
</script>
