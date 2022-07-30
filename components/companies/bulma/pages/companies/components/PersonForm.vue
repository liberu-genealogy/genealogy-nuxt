<template>
    <modal class="person-modal">
        <enso-form class="box has-background-light"
            v-bind="$attrs"
            disable-state
            @ready="init">
            <template #actions-left
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
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@enso-ui/modal/bulma';
import { EnsoForm } from '@enso-ui/forms/bulma';

library.add(faUserTie);

export default {
    name: 'PersonForm',

    components: { Fa, Modal, EnsoForm },

    inject: ['i18n'],

    props: {
        companyId: {
            type: Number,
            required: true,
        },
    },

    emits: ['edit-person'],

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
.person-modal {
    .modal-content {
        overflow: unset;
    }

    @media screen and (max-width: 1023px) {
        .modal-content {
            width: 95%;
        }
    }
}
</style>
