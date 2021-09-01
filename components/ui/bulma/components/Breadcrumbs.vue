<template>
    <core-breadcrumbs>
        <template v-slot:default="{ breadcrumbs, hasNavigation }">
            <nav class="breadcrumb is-small is-bold has-dot-separator">
                <ul>
                    <li v-for="breadcrumb in breadcrumbs"
                        :key="breadcrumb.name"
                        :class="{'is-active': !hasNavigation(breadcrumb)}">
                        <nuxt-link v-if="breadcrumb.route"
                            :to="{ name: breadcrumb.route }">
                            {{ i18n(breadcrumb.name) }}
                        </nuxt-link>
                        <a v-else>
                            {{ i18n(breadcrumb.name) }}
                        </a>
                    </li>
                </ul>
            </nav>
        </template>
    </core-breadcrumbs>
</template>

<script>
import CoreBreadcrumbs from '../../core/components/Breadcrumbs.vue';

export default {
    name: 'Breadcrumbs',

    components: { CoreBreadcrumbs },

    inject: ['i18n'],
};
</script>
