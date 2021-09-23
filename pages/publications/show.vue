<template>
    <div/>
</template>
<router>
{
    name: 'publications.show'
}
</router>
<script>
export default {
    name: 'Show',
    layout: 'auth',
	meta: {
        permission: { name: 'publications menu' },
        title: 'Publications - Show'
    },
};
</script>

<style lang="scss">
</style>
