<template>
	<div class="count-down" v-text="str"></div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: [ 'endDate' ],
	        data: function() {
                        return {  str: '' }
	        },
	        methods: {
                        _showCountDownTime() {
                                let begin = new Date();
                                let timeSpan = Math.ceil((this.endDate - begin) / 1000);
                                let day = Math.floor(timeSpan / (3600 * 24));
                                let hours = Math.floor(timeSpan / 3600 % 24);
                                let minutes = Math.floor(timeSpan / 60 % 60);
                                let seconds = timeSpan % 60;
                                let result = `${ day } 天 ${ hours }:${ minutes }:${ seconds }`;
                                this.str = result;
                                if(timeSpan <= 0) {	//结束倒计时
                                        clearInterval(this.timer);
                                        return;
                                }
                        }
	        },
	        created() {
			this.timer = setInterval(this._showCountDownTime, 1000);
	        },
	        destroyed() { if(this.timer) clearInterval(this.timer); }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>