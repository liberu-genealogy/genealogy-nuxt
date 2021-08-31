<template>
    <modal v-on="$listeners">
        <div class="box">
            <h5 class="subtitle is-5">
                {{ i18n("The selected user is about to be deleted. Are you sure?") }}
            </h5>
            <hr>
            <div class="level">
                <div class="level-left"/>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-outlined"
                            @click="$emit('close')">
                            {{ i18n("Cancel") }}
                        </button>
                        <button class="button is-danger ml-1"
                            v-focus
                            @click="destroy()">
                            {{ i18n("Delete User") }}
                        </button>
                        <button class="button is-danger ml-1"
                            v-focus
                            @click="destroy(true)">
                            {{ i18n("Delete User and Person") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { focus } from '@enso-ui/directives';
import { Modal } from '@enso-ui/modal/bulma';

export default {
    name: 'DeleteModal',

    components: { Modal },

    directives: { focus },

    inject: ['i18n', 'errorHandler', 'route'],

    props: {
        userId: {
            type: Number,
            required: true,
        },
    },

    methods: {
        destroy(person = false) {
            axios.delete(this.route('administration.users.destroy', this.userId),
                { params: { person: !!person } })
                .then(({ data }) => this.$emit('destroyed', data))
                .catch(this.errorHandler);
        },
    },
};
</script>
