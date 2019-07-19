<template>
    <section class="box-wrapper">
        <van-nav-bar
            :title="title"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <van-row v-for="(visitor,index) in list" @click="$router.push('/visitor/detail/'+visitor.id)">
                    <van-col span="16">span: 16</van-col>
                    <van-col span="8">span: {{index}}</van-col>
                </van-row>
            </van-list>
            <van-button type="primary" size="large" @click="$router.push('/visitor/add')">添加新邀请</van-button>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "VisitorIndex",
        data(){
            return{
                title:'',
                zindex:999,
                list: [],
                loading: false,
                finished: false,
                page:0,
                pageSize:10,
            }
        },
        created(){
            this.title=this.$route.name
        },
        methods: {
            onLoad() {
                this.page++
                this.getData()
            },
            getData(){
                let params={
                    userId:'4541',
                    pageNo:this.page,
                    pageSize:this.pageSize
                }
                axios.post('getVisitorRecord.action',params).then(
                    res=>{
                        console.log(res)
                        this.list=res.resultList
                        if(this.list.length<10){
                            this.finished=true
                        }
                        this.loading=false
                    }
                ).catch(err=>{
                    console.log(err)
                    this.loading=false
                })
            }
        }
    }
</script>

<style scoped>

</style>
