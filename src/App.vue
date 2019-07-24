<template>
    <div id="app">
        <transition :name="animate">
            <keep-alive exclude="VisitorAdd,newsDetail,VisitorDetail,complaintIndex,complaintAdd,complaintDetail">
                <router-view id="view"></router-view>
            </keep-alive>
        </transition>
        <!-- <div class="test" @click="reward">测试按钮</div> -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                animate: 'slide-top'
            }
        },
        created () {
        },
        methods: {
            reward() {
                this.$bridge.callhandler('showToast', 'ios-app-toast');
            },
            testFun(msg) {
                alert(msg)
            }
        },
        watch: {
            $route (to, from) {
                /*
                0: no animate
                1: left animate
                2: right animate
                3: top animate
                4: bottom animate
                 */
                let animate = this.$router.animate || to.meta.slide
                if (!animate) {
                    this.animate = '' 
                } else {
                    this.animate = animate === 1 ?  'slide-left' :
                        animate === 2 ?  'slide-right' :
                        animate === 3 ?  'slide-top' :
                        animate === 4 ?  'slide-bottom' : ''
                }
                this.$router.animate = 0
            }
        },
        mounted () {
            window['testFun'] = this.testFun
            
        }
    }
</script>

<style lang="stylus">
#app{
    width: 100%;
    min-height 100vh;
}
#view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height 100vh;
    -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform:  translate(100%, 0);
    transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
}
.slide-top-enter,
.slide-bottom-leave-active {
    opacity: 0;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
}
.slide-top-leave-active,
.slide-bottom-enter {
    opacity: 0;
    -webkit-transform: translate(0, -100%);
    transform: translate(0, -100%);
}
</style>
