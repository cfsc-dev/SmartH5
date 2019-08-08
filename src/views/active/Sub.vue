<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="填写报名信息"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <div class="item">
                <van-row gutter="10">
                    <van-col span="6">
                        <img :src="`${require('@/assets/img/1.jpg')}`" alt="">
                    </van-col>
                    <van-col span="18">
                        <h4>长房云西府-亲自手工</h4>
                        <p>2019-06-01 14:00</p>
                        <p>长房云西府</p>
                    </van-col>
                </van-row>
            </div>
            <van-cell-group>
                <van-field
                    v-model="name"
                    required
                    clearable
                    label="姓名:"
                    placeholder="请输入姓名"
                    :error-message="errorName"
                />
                 <van-field
                    v-model="name"
                    required
                    clearable
                    label="电话:"
                    placeholder="请输入电话"
                    :error-message="errorTel"
                />
            </van-cell-group>
            <div class="subBtn">
                <van-button type="info" :disabled="disabled" size="large" @click="subInfo">确认报名</van-button>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'activeSub',
    data(){
        return {
            name: '',
            tel: '',
            disabled: false,
            errorName: '',
            errorTel: ''
        }
    },
    methods: {
        subInfo(){

        }
    }
}
</script>

<style lang="stylus" scoped>
.box-wrapper{
    background:#f0f0f0;
    .main-content{
        padding 46px 10px 10px
        .subBtn{
            margin-top 10px;
            .van-button--info{
                background-color #1A6DBD;
                border-color #1a6dbd
            }
        }
    }
    .item {
        padding: 0.1rem 0;
        h4 {
            color: black;
            font-size: 0.16rem;
            word-break: break-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p {
            font-size: 0.16rem;
            line-height: 0.2rem;
            color #BBBBBB;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        img {
            width: 100%;height .58rem
        }
    }
}
</style>
