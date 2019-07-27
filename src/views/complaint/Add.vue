<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="投诉"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-cell-group>
                <van-field
                    v-model="emergValue"
                    readonly
                    label="紧急程度"
                    placeholder="请选择紧急程度"
                    left-icon="fire"
                    right-icon="arrow"
                    @click="emergSelectShow = true"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="content"
                    label="投诉内容"
                    required
                    type="textarea"
                    left-icon="info"
                    placeholder="请输入您需要投诉的具体信息"
                    :error-message="errorMessage"
                    rows="2"
                    autosize
                />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="上传照片" icon="photograph" />
                <van-uploader v-model="fileList" multiple />
            </van-cell-group>
            <div class="subBtn" @click="subInfo">
                <van-button type="info" size="large">提交</van-button>
            </div>

            <van-popup v-model="emergSelectShow" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="complainEmerg"
                    :default-index="0"
                    @cancel="emergSelectShow = false"
                    @confirm="onConfirm"
                    ref="emerg"
                />
            </van-popup>
        </section>
    </section>
</template>
<script>
import axios from '@/utils/fetch'
import { mapGetters } from 'vuex'
export default {
    name: "complaintAdd",
    data() {
        return {
            emergValue: '',
            content: '',
            fileList: [],
            emergSelectShow: false,
            errorMessage:"",
            currentCar: ''
        }
    },
    created(){
        this.emergValue = this.complainEmerg[0].text
    },
    methods: {
        onConfirm(value, index) {
            this.emergValue = value.text
            this.emergSelectShow = false
        },
        subInfo() {
            if(this.content) {
                this.errorMessage = ''
                let pic = []
                let data = new FormData()
                let params = {
                    roomid: this.userInfo.roominfo[0].roomId,
                    ownerId: this.userInfo.userInfo.userId,
                    content: this.content,
                    emerg: this.emergValue === '紧急' ?  2 :
                        this.emergValue === '一般' ?  3 :
                        this.emergValue === '低' ?  4 :
                        this.emergValue === '可以忽略'?  5 : 1
                }
                if(this.fileList.length > 0){
                    this.fileList.forEach(item => {
                        data.append('pic', item.file)
                    })
                }
                data.append('roomid',params.roomid);
                data.append('ownerId',params.ownerId);
                data.append('content',params.content);
                data.append('emerg',params.emerg);
                axios.postFile('owner/complains/complainInfoCommit.action', data)
                    .then(res => {
                        console.log(res)
                        if(res.resultCode === '0'){
                            this.$dialog.alert({
                                message: res.msg
                            }).then(() => {
                                this.$router.push('/complaint')
                            })
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })

            } else {
                this.errorMessage = '投诉内容不能为空'
            }
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'complainEmerg'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    background:#f0f0f0;
    .main-content{
        padding 46px 10px 10px
        .van-cell-group{
            margin-top 10px;
        }
        .van-uploader{
            padding 10px 15px
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
