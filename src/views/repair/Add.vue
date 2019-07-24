<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="报修"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-cell-group>
                <van-field
                    v-model="address"
                    required
                    clearable
                    label="维修地点"
                    left-icon="location"
                    placeholder="请输入维修地点"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="timeValue"
                    readonly
                    label="上门时间"
                    placeholder="请选择上门时间"
                    left-icon="clock"
                    right-icon="arrow"
                    @click="timeSelectShow = true"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="username"
                    required
                    clearable
                    left-icon="manager"
                    label="业主姓名"
                    placeholder="请输入姓名"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="mobile"
                    type="tel"
                    label="联系电话"
                    left-icon="phone"
                    placeholder="请输入电话"
                    required
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="emergValue"
                    readonly
                    label="维修类别"
                    placeholder="请选择维修类别"
                    left-icon="label"
                    right-icon="arrow"
                    @click="emergSelectShow = true"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="content"
                    label="问题描述"
                    required
                    type="textarea"
                    left-icon="info"
                    placeholder="请输入您需要报修的具体信息"
                    :error-message="errorContent"
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

            <van-popup v-model="timeSelectShow" position="bottom">
                <van-datetime-picker
                    v-model="startTimePicker"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="confirmStartTime"
                    @cancel="timeSelectShow = false"
                />
            </van-popup>
            
            <van-popup v-model="emergSelectShow" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="repairType"
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
import dateTool from '@/utils/dateformat'
import { mapGetters } from 'vuex'
export default {
    name: "complaintAdd",
    data() {
        return {
            emergValue: '',
            address: '',
            username: '',
            mobile: '',
            content: '',
            fileList: [],
            timeValue: '',
            timeShow: false,
            startTimePicker:new Date(),
            minDate: new Date(),
            maxDate: new Date(2025,1,1),
            timeSelectShow: false,
            emergSelectShow: false,
            errorName: '',
            errorMobile: '',
            errorContent:"",
            currentCar: ''
        }
    },
    created(){
        this.emergValue = this.repairType[0].text
    },
    methods: {
        onConfirm(value, index) {
            this.emergValue = value.text
            this.emergSelectShow = false
        },
        confirmStartTime(value){
            this.timeValue = dateTool.format(value,'yyyy-MM-dd HH:mm')
            this.timeSelectShow = false
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value} 年`;
            } else if (type === 'month') {
                return `${value} 月`
            } else if (type === 'day') {
                return `${value} 日`
            }else if(type === 'hour'){
                return `${value} 时`
            }else if(type === 'minute'){
                return `${value} 分`
            }
            return value;
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
                axios.postFile('job/add.action', data)
                    .then(res => {
                        console.log(res)
                        if(res.resultCode === '0'){
                            this.$dialog.alert({
                                message: res.msg
                            }).then(() => {
                                this.$router.push('/repair')
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
            'repairType'
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
