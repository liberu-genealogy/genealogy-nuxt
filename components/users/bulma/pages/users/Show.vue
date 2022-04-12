<template>
    <div class="columns is-multiline is-centered">
        <div class="column is-two-thirds-desktop">
            <user-profile/>
        </div>
    </div>
</template>

<script>
import UserProfile from './components/UserProfile.vue';

export default {
    name: 'Show',

    components: { UserProfile },
};
</script>
