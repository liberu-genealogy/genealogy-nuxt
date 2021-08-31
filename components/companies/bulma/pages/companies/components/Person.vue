<template>
    <div class="box has-background-light raises-on-hover p-3"
        @mouseover="controls = true"
        @mouseleave="controls = false">
        <p class="title is-5">
            {{ person.name }}
            <span class="is-pulled-right is-flex"
                v-if="controls">
                <a class="button is-naked is-small"
                    @click="$emit('edit')">
                    <span class="icon">
                        <fa icon="pencil-alt"/>
                    </span>
                </a>
                <a class="button is-naked is-small"
                    @click="$emit('delete')">
                    <span class="icon">
                        <fa icon="trash-alt"/>
                    </span>
                </a>
            </span>
        </p>
        <p class="subtitle is-6">
            {{ person.position }}
        </p>
        <p v-if="person.email">
            {{ person.email }}
        </p>
        <p v-if="person.phone">
            {{ person.phone }}
        </p>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck, faTimes, faEnvelope, faPhone, faInfoCircle, faPencilAlt, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add([
    faCheck, faTimes, faEnvelope, faPhone, faInfoCircle, faPencilAlt, faTrashAlt,
]);

export default {
    name: 'Person',

    inject: ['canAccess'],

    directives: { tooltip: VTooltip },

    props: {
        person: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
    }),
};
</script>
