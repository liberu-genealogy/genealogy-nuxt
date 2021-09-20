<template>
	<Home/>
</template>
<script>
import Home from '~/components/Home.vue'

export default {
	layout: 'index',
	components: { Home },
		meta: {
			guestGuard: true,
	},

}
</script>
<router>
{
	name: 'index'
}
</router>
