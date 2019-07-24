<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="投诉详情"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)">
            <span class="r-text" slot="right" @click="stepShow = true">进度</span>
        </van-nav-bar>
        <section class="main-content">
            <div class="complainList">
                <van-row gutter="10">
                    <van-col span="4">
                        <div class="headFace"><img :src="userInfo.userInfo.headImageUrl" alt=""></div>
                    </van-col>
                    <van-col span="16">
                        <div class="userName">业主5</div>
                        <p class="userLocation"><van-icon name="location" color="#1A6DBD"/>一栋一单元</p>
                    </van-col>
                    <van-col span="4">
                        <a :href="'tel:' + userInfo.userInfo.mobileNumber">
                            <van-icon name="phone" color="#1A6DBD" size="0.4rem"/>
                        </a>
                    </van-col>
                </van-row>
            </div>
            <!-- 进度 -->
            <van-popup
                v-model="stepShow"
                position="right"
                :duration=0.4
                :style="{ width: '70%', minHeight:'100vh' }">
                <van-steps direction="vertical" :active="complainDetailSteps.length - 1" active-color="#1A6DBD">
                    <van-step v-for="(item, index) in complainDetailSteps" :key="index">
                        <h4>{{item.planName}}</h4>
                        <p>{{item.planDateTime}}</p>
                    </van-step>
                </van-steps>
            </van-popup>
        </section>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'complaintDetail',
    data() {
        return {
            stepShow: false
        }
    },
    created() {
        this.$store.dispatch('getComplainSteps',{complainId: this.$route.params.id})
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'complainDetailSteps'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.main-content{
    padding 46px 10px 10px
    .complainList{
        margin-top 10px;line-height .24rem
        .headFace{
            img{
                width .5rem;
                height .5rem;
                border-radius 50%
            }
        }
        .userName{
            font-size .16rem
        }
        .userLocation{
            font-size .14rem;color #1A6DBD
        }
    }
    .van-step__title{
        h4{
            font-size 14px;
        }
        p{
            font-size 12px
        }
    }
}
</style>

