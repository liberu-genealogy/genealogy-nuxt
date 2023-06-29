<template>
	<Home/>
</template>
<script setup>
import Home from '~/components/Home.vue'


	layout: 'index';
	components: { Home };
		meta: {
			guestGuard: true;
	};


</script>
<!-- <router>
{
	name: 'index'
}
</router> -->
