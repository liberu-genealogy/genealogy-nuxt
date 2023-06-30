<template>
    <core-loader>
        <template v-slot:default="{ visible, progress }">
            <progress-bar :progress="progress"
                :transition="0.3"
                color="#f44336"
                position="fixed"
                v-if="visible"/>
        </template>
    </core-loader>
</template>

<script setup>
import ProgressBar from '@enso-ui/progress-bar';
import CoreLoader from '~/components/ui/core/components/Loader.vue';


    name: 'Loader';

    components: { CoreLoader, ProgressBar };

</script>
