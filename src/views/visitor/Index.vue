<template>
    <section class="box-wrapper">
        <van-nav-bar
            :title="title"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)">
            <van-icon name="plus" slot="right" @click="$router.push('/visitor/add')"/>
        </van-nav-bar>
        <section class="main-content">
            <div :style="{height:listHeight}">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        :finished-text="finishedText"
                        :offset="80"
                        @load="onLoad">
                        <van-row v-for="(item, index) in list" @click.native="$router.push({name:'访客详情',params:{visitor:item}})" :key="index" class="visitor-list">
                            <van-col span="16">
                                <div class="_list-li">{{item.visitorName}}</div>
                                <div class="_list-li">{{item.applyTime}}</div>
                            </van-col>
                            <van-col span="8">
                                <div class="_list-li-arrow">
                                    <span v-text="isValid(item)"></span>
                                    <Icon name="iconnext"></Icon>
                                </div>
                            </van-col>
                        </van-row>
                    </van-list>
                </van-pull-refresh>
            </div>
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
                listHeight:0,
                finishedText:'',
                refreshing:false,
                list: [],
                loading: false,
                finished: false,
                page:0,
                pageSize:8,
            }
        },
        created(){
            this.title=this.$route.name
            this.listHeight=(document.documentElement.clientHeight-116)+'px'
        },
        methods: {
            //下拉刷新
            onRefresh(){
                this.list.splice(0,this.list.length)
                this.page=1
                this.finished=false
                this.getData()
            },
            //上拉加载---自动加载，默认进来就要加载一次
            onLoad() {
                this.page++
                this.getData()
            },
            //获取访客列表
            getData(){
                this.loading=true
                let params={
                    userId:'4541',
                    pageNo:this.page,
                    pageSize:this.pageSize
                }
                console.log(params)
                axios.post('getVisitorRecord.action',params).then(
                    res=>{
                        console.log(res)
                        this.list=this.list.concat(res.resultList)
                        if(this.pageSize*this.page>=res.resultCount){
                            this.finished=true
                            if(this.page>1){
                                this.finishedText='没有更多了'
                            }
                        }
                        setTimeout(()=>{
                            this.loading=false
                            this.refreshing=false
                        },1000)
                    }
                ).catch(err=>{
                    console.log(err)
                    this.loading=false
                })
            },
            //是否失效
            isValid(item){
                let expireTime=new Date(item.expireTime).getTime()
                let now=new Date().getTime()
                return now>expireTime?'已作废':''
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .main-content{
        .visitor-list{
            padding:10px;
            border-bottom:1px solid #f0f0f0;
            ._list-li{
                height:30px;
                line-height 30px;
            }
            ._list-li-arrow{
                text-align:right;
                height:60px;
                line-height:60px;
                .icon{
                    margin-left:5px;
                }
            }
        }
    }
</style>
