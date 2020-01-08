  <template>
	  <div class="root">
		  <MiAlert></MiAlert>
		  <Father></Father>
		  <keep-alive>
			  <router-view v-if="$route.meta.keepAlive"></router-view>
		  </keep-alive>
		  <router-view v-if="!$route.meta.keepAlive"></router-view>
	  </div>
  </template>

  <script>
	  import MiAlert from './components/MiAlert.vue';
	  import Father from './components/Father.vue';

	  export default {
	          components: { MiAlert, Father }
	  };
  </script>

  <style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width:100%
		height:100%
  </style>