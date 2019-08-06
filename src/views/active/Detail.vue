<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="活动详情"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <h3 class="title">{{title}}</h3>
            <van-cell-group>
                <van-field
                    v-model="startTime"
                    readonly
                    label="开始时间:"
                />
                <van-field
                    v-model="endTime"
                    readonly
                    label="结束时间:"
                />
                <van-field
                    v-model="location"
                    readonly
                    label="活动地点:"
                />
                <van-field
                    v-model="numbers"
                    readonly
                    label="参加人数:"
                />
                <van-field
                    v-model="cost"
                    readonly
                    label="活动费用:"
                />
                <van-field
                    v-model="contact"
                    readonly
                    label="联系人:"
                />
                <van-field
                    v-model="tel"
                    readonly
                    label="联系电话:"
                />
                 <van-field
                    v-model="expiry"
                    readonly
                    label="报名截止:"
                />
                <van-field
                    v-model="content"
                    label="活动详情:"
                    readonly
                    type="textarea"
                    rows="2"
                    autosize
                />
            </van-cell-group>
            <div class="subBtn">
                <van-button type="info" size="large" @click="subInfo">报名参加</van-button>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: "activeDetail",
    data() {
        return {
            title: '长房云西府-亲自手工',
            startTime: '2019-06-01 14:00',
            endTime: '2019-06-01 14:00',
            location: '长房云西府',
            numbers: '60人',
            cost: '60人',
            contact: '黄先生',
            tel: '13888888888',
            expiry: '2019-06-01 14:00',
            content: '大手拉小手的活动开始报名了'
        }
    },
    methods: {
        subInfo(){
            this.$router.push('/active/sub')
        }
        
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    background:#f0f0f0;
    .main-content{
        padding 46px 10px 10px
        .title{
            text-align center;font-size .18rem;padding 10px 0
        }
        .subBtn{
            margin-top 10px;
            .van-button--info{
                background-color #1A6DBD;
                border-color #1a6dbd
            }
        }
    }
}
</style>


