<template>
  <bm-overlay
    ref="customOverlay"
    class="simple"
    pane="labelPane"
    @draw="draw">
    <div class="img-box" @click="handleClick">
        <img :src="getUrl"/>
    </div>
  </bm-overlay>  
</template>

<script>
export default {
    props: ["user"],
    watch: {
        user: {
            handler(){
                this.$refs.customOverlay.reload();
            },
            deep: true,
        }
    },
    methods: {
        handleClick(){
            this.$emit('openUserBox');
        },
        draw ({ el, BMap, map}) {
            const {lng, lat} = this.user.pos;
            const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
            el.style.left = pixel.x + 'px'
            el.style.top = pixel.y + 'px'
        }
    },
    computed: {
        getUrl(){
            if(this.user.status == '已完成'){
                return require("../assets/E客群C-16.png")
            }
            if(this.user.status == '处理中'){
                return require("../assets/E客群C-15.png")
            }
            if(this.user.status == '待处理'){
                return require("../assets/E客群C-17.png")
            }
            return require("../assets/E客群C-14.png")
        }
    }
}
</script>

<style lang="scss" scoped>
.simple {
    width: 0.83rem;
    height: 1.16rem;
    line-height: 1.16rem;
    position: absolute;
    transform: translate(-50%, -100%);

    .img-box {
        width: 100%;
        height: 100%;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}


</style>