<template>
  <div>
    <v-list>
      <v-list-item v-for="chat in chats" :key="chat.id" @click="$emit('selectChat', chat)">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ chat.user_two.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['chats'],
};
</script>
