<template>
	<div>
		这是主页
		<CountDown :end-date="new Date(2019,6,5,16,0,0)"></CountDown>
		<MiNav></MiNav>
		<!--<span v-text="$store.state.abc"></span>-->
		<!--<button @click="$store.commit('changeAbc', { abc: '20190000' })">点击按钮改变state中的值</button>-->
	</div>
</template>

<script>
	import MiNav from '../components/MiNav.vue';
	import CountDown from '../components/CountDown.vue';

	export default {
	        components: { MiNav, CountDown }
	};
</script>

<style scoped>

</style>