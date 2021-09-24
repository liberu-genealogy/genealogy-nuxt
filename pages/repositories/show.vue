<template>
    <div/>
</template>
<router>
{
    name: 'repositories.show'
}
</router>
<script>
export default {
    name: 'Show',
    layout: 'auth',
    meta: {
        permission: { name: 'repositories menu' },
        title: 'Repositories - Show'
    },
};
</script>

<style lang="scss">
</style>
