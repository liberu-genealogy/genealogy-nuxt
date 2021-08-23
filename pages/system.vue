<template>
</template>

<script>
export default {
    key(route) {
        return route.path
    },
    meta: {
        breadcrumb: 'system'
    }
};
</script>