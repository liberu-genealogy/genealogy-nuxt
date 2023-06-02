<template>
    <core-page-header>
        <template v-slot:default="{ pageTitle }">
            <div class="level">
                <div class="level-left is-hidden-mobile">
                    <div class="level-item">
                        <p class="title is-5 page-title animated fadeIn">
                            {{ i18n(pageTitle) }}
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <breadcrumbs class="animated fadeIn"/>
                    </div>
                </div>
            </div>
        </template>
    </core-page-header>
</template>

<script>
import CorePageHeader from '../../core/components/PageHeader.vue';
import Breadcrumbs from './Breadcrumbs.vue';

export default {
    name: 'PageHeader',

    components: { CorePageHeader, Breadcrumbs },

    inject: ['i18n'],
};
</script>

<style lang="scss" scoped>
    @media screen and (max-width: 768px) {
        .level-left+.level-right {
            margin-top: unset;
        }
    }
</style>
