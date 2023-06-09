<template>
  <v-app>
    <!-- Add a dialog (modal) component that can be toggled with 'dialog' property -->
    <v-dialog v-model="dialog" max-width="500px">
      <!-- Create a slot for the activator (the button that opens the modal) -->
      <template v-slot:activator="{ on }">
        <!-- Create a button that opens the modal on click -->
        <v-btn @click="openModal" color="primary" dark>Add Chat</v-btn>
      </template>
      <!-- Create a card component with the modal content -->
      <v-card>
        <v-card-title>
          <span class="headline">Select User</span>
        </v-card-title>
        <v-card-text>
          <!-- Create an autocomplete component with a list of user items -->
          <v-autocomplete v-model="selectedUser"
            :items="users.filter(user => { return user.id !== this.$store.state.user.id })" item-text="name"
            item-value="id" label="Select User" clearable outlined></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <!-- Create a button that calls the 'startChat' method when clicked and disables if 'selectedUser' is empty -->
          <v-btn @click="startChat" :disabled="!selectedUser">Start Chat</v-btn>
          <v-btn @click="closeModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: ['users'], // Accepts a 'users' prop to pass in the list of users
  data() {
    return {
      dialog: false, // Sets the initial state of the dialog to false (closed)
      selectedUser: null, // Sets the initial state of selectedUser to null
    };
  },
  methods: {
    openModal() {
      // Sets the selectedUser to null and opens the modal
      this.selectedUser = null;
      this.dialog = true;
    },
    closeModal() {
      // Closes the dialog and resets the selectedUser
      this.dialog = false;
      this.selectedUser = null;
    },
    startChat() {
      if (this.selectedUser) {
        // Emits an event with the selectedUser when chat is started and closes the dialog
        this.$emit('chat-added', this.selectedUser);
        this.dialog = false;
      }
    },
  },
};
</script>