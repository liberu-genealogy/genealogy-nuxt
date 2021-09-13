<template>
    <button class="button is-primary is-fullwidth"
        :class="{ 'is-loading': loading }"
        type="submit"
        @click.prevent="submit">
        <span class="icon is-small">
            <fa :icon="icon"/>
        </span>
        <span>{{ i18n(action) }}</span>
    </button>
</template>

<script>
import { mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faLock, faUser);

export default {
    name: 'Submit',

    inject: ['errors', 'i18n', 'route', 'state', 'toastr'],

    props: {
        action: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        endpoint: {
            type: String,
            required: true,
        },
        payload: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        loading: false,
    }),

    computed: {
        ...mapGetters(['isWebview']),
        config() {
            return this.isWebview
                ? { headers: { isWebview: true } }
                : {};
        },
    },

    methods: {
        submit() {
            this.loading = true;
            this.state.successful = false;
            this.$emit('submitting');

            this.$axios.post(this.route(this.endpoint), this.payload, this.config)
                .then(({ data }) => {
                    this.state.successful = true;
                    this.$emit('success', data);
                }).catch(error => {
                    const { status, data } = error.response;

                    switch (status) {
                    case 422:
                        this.errors.set(data.errors);
                        break;
                    case 429:
                        this.toastr.error(data.message);
                        break;
                    default:
                        throw error;
                    }
                }).finally(() => (this.loading = false));
        },
    },
};
</script>
