<template>
	<div class="root">
		<Home v-if="isLogin"></Home>
		<Login v-else></Login>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import Home from './views/Home.vue';
	import Login from './views/Login.vue';

	let { mapGetters } = createNamespacedHelpers('login');

        export default {
                components: { Home, Login },
	        computed: mapGetters([ 'isLogin' ])
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
</style>