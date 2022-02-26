<template>
    <card collapsible
        :collapsed="collapsed">
        <card-header class="has-background-light">
            <template v-slot:title>
                <span class="icon is-small mr-1">
                    <fa icon="address-card"/>
                </span>
                {{ displayTitle }}
            </template>
            <template v-slot:controls>
                <card-refresh @refresh="fetch"/>
                <card-badge :label="count"/>
                <card-collapse/>
            </template>
        </card-header>
        <card-content>
            <people :id="id"
                :query="query"
                @update="count = $refs.people.count; $refs.card.resize()"
                ref="people"/>
        </card-content>
    </card>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressCard, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent,
} from '@enso-ui/card/bulma';
import People from './People.vue';
import { ref, computed, useStore, watch } from 'vue';

library.add(faAddressCard, faPlusSquare);

export default {
    name: 'PeopleCard',

    components: {
        Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent, People,
    },

    inject: ['i18n'],

    props: {
        id: {
            type: Number,
            required: true,
        },
        open: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: null,
        },
    },
    setup() {
        const query = ref('')
        const count = ref(0)
        const store = useStore()
        return{
            one: computed(() => store.state[layout].isMobile)
        }
        const displayTitle = computed(() => {
            return !this.isMobile
                ? this.title || this.i18n('People')
                : null;
        })
        const isEmpty = computed(() => {
            return this.count === 0;
        })
        const count = ref('')
        watch(count, () => {
            this.$refs.card.resize();
        })
    }
};
</script>
