<template>
    <div class="container p-4 has-text-centered">
        <span class="icon is-large">
            <fa class="has-text-warning"
                icon="exclamation-triangle"
                size="2x"/>
        </span>
        <p class="subtitle is-3">
            {{ i18n('The requested page does not exist') }}
        </p>
    </div>
</template>
<router>
{
    name: 'notFound',
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);

export default {
    // head: {
    //     title: '404'
    // },
    meta: {
        title: '404'
    },
    inject: ['i18n'],
};
</script>