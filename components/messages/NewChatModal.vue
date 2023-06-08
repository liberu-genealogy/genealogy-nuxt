<template>
  <v-app>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn @click="openModal" color="primary" dark>Add Chat</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Select User</span>
        </v-card-title>
        <v-card-text>
          <v-autocomplete v-model="selectedUser"
            :items="users.filter(user => { return user.id !== this.$store.state.user.id })" item-text="name"
            item-value="id" label="Select User" clearable outlined></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="startChat" :disabled="!selectedUser">Start Chat</v-btn>
          <v-btn @click="closeModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      dialog: false,
      selectedUser: null,
    };
  },
  methods: {
    openModal() {
      // Fetch the list of users
      this.selectedUser = null;
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
      this.selectedUser = null;
    },
    startChat() {
      if (this.selectedUser) {
        this.$emit('chat-added', this.selectedUser);
        this.dialog = false;
      }
    },
  },
};
</script>
