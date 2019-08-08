<template>
    <section class="box-wrapper">
        <van-nav-bar swipeable
                     title="附件"
                     left-arrow
                     fixed
                     :z-index=zindex
                     @click-left="back($router)"
        />
        <section class="main-content">
            <van-cell v-for="item in fileList" @click="openFile(item)" :title="item.resourceRealName" is-link />
        </section>
    </section>
</template>

<script>
    export default {
        name: "Appendix",
        data(){
            return{
                zindex:999,
                fileList:[]
            }
        },
        created(){
            console.log(this.$route.params.fileList)
            if(this.$route.params.fileList){
                this.fileList=this.$route.params.fileList
            }else{
                this.back(this.$router)
            }
        },
        methods:{
            openFile(item){
                // window.location.href=`http://222.240.37.83:9082/smartxd${item.url}`
                window.location.href=item.url
            }
        }
    }
</script>

<style scoped>

</style>
