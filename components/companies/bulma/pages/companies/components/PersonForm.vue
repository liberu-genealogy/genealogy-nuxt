<template>
    <modal portal="person-form"
        v-on="$listeners">
        <enso-form class="box has-background-light"
            v-bind="$attrs"
            disable-state
            v-on="$listeners"
            @ready="init">
            <template v-slot:actions-left
                v-if="id">
                <a class="button is-warning"
                    @click="$emit('edit-person', id)">
                    <span class="is-hidden-mobile">
                        {{ i18n('Edit Person') }}
                    </span>
                    <span class="icon">
                        <fa icon="user-tie"/>
                    </span>
                    <span class="is-hidden-mobile"/>
                </a>
            </template>
        </enso-form>
    </modal>
</template>

<script>
import { Modal } from '@enso-ui/modal/bulma';
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
    name: 'PersonForm',

    components: { Modal, EnsoForm },

    inject: ['i18n'],

    props: {
        companyId: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        id: null,
    }),

    methods: {
        init({ form }) {
            this.id = form.field('id').value;
            form.field('company_id').value = this.companyId;
        },
    },
};
</script>

<style lang="scss">
    .person-form .modal-content {
        overflow: unset;
    }

    @media screen and (max-width: 1023px) {
        .person-form .modal-content {
            width: 95%;
        }
    }
</style>
