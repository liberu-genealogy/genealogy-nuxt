<template>
	<Home/>
</template>
<script setup>
import Home from '~/components/Home.vue'


	const layout= 'index';
	const components= { Home };
	const meta= {
			guestGuard: true,
	};


</script>
var router{
	name: 'index'
}

