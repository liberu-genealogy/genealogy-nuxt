<template>
    <div>
<img :src="this.$route.params.id" />
	</div>
</template>
<router>
{
    name: 'dnamatching.show'
}
</router>
<script>
export default {

layout: 'auth',
    meta: {
        permission: { name: 'dna menu' },
        title: 'DNA Matching - Show'
    },
};
</script>

<style lang="scss">
</style>
