<template>
    <core-toastr-position>
        <template v-slot:default="{ positions, toastrPosition, update }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item is-marginless">
                        {{ i18n('Notifications') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item toastr-position">
                        <dropdown>
                            <template v-slot:label>
                                <figure class="image is-16x16 ml-1">
                                    <img :src="require(`~/assets/images/corners/${toastrPosition}.svg`)">
                                </figure>
                            </template>
                            <template v-slot:items>
                                <dropdown-item v-for="position in positions"
                                    :key="position"
                                    :selected="toastrPosition === position"
                                    @select="update(position)">
                                    <figure class="image is-16x16">
                                        <img :src="require(`~/assets/images/corners/${position}.svg`)">
                                    </figure>
                                </dropdown-item>
                            </template>
                        </dropdown>
                    </div>
                </div>
            </div>
        </template>
    </core-toastr-position>
</template>

<script>
import { Dropdown, DropdownItem } from '@enso-ui/dropdown/bulma';
import CoreToastrPosition from '../../../core/components/settings/ToastrPosition.vue';

export default {
    name: 'ToastrPosition',

    components: { CoreToastrPosition, Dropdown, DropdownItem },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .toastr-position .dropdown .dropdown-content {
        width: 4.6em;
        .items {
            figure {
                margin: auto;
            }
        }
    }
</style>
