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
                    clearable
                    label="联系电话"
                    left-icon="phone"
                    placeholder="请输入电话"
                    required
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="repairValue"
                    readonly
                    label="维修类别"
                    placeholder="请选择维修类别"
                    left-icon="label"
                    right-icon="arrow"
                    @click="repairSelectShow = true"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="content"
                    label="问题描述"
                    required
                    clearable
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
            
            <van-popup v-model="repairSelectShow" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="repairType"
                    :default-index="0"
                    @cancel="repairSelectShow = false"
                    @confirm="onConfirm"
                    ref="repairType"
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
            repairValue: '',
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
            repairSelectShow: false,
            errorName: '',
            errorMobile: '',
            errorContent:"",
            currentCar: ''
        }
    },
    created(){
        this.$store.dispatch('getRepairType',{appMobile: this.userInfo.userInfo.mobileNumber})
        setTimeout(() => {
            this.repairValue = this.repairType[0].text
            this.address = this.userInfo.roominfo[0].address
            this.username = this.userInfo.userInfo.userName
            this.mobile = this.userInfo.userInfo.mobileNumber
        },500)
    },
    methods: {
        onConfirm(value, index) {
            this.repairValue = value.text
            this.repairSelectShow = false
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
                this.errorContent = ''
                let pic = []
                let data = new FormData()
                let params = {
                    userId: this.userInfo.userInfo.userId,
                    roomid: this.userInfo.roominfo[0].roomId,
                    projectId: this.userInfo.userInfo.projectId,
                    address: this.address,
                    plandate: this.timeValue,
                    appMobile: this.userInfo.userInfo.mobileNumber,
                    mobile: this.mobile,
                    problemdesc: this.content,
                    ownerName: this.username,
                    createusertype: 0,
                    jobtypeid: this.emergValue === '公共区域维修' ?  5 :
                        this.emergValue === '遗留问题' ?  9 :
                        this.emergValue === '其他类'?  14 : 1
                }
                console.log(params)
                for(let i in params){
                    data.append(i, params[i])
                }
                if(this.fileList.length > 0){
                    this.fileList.forEach(item => {
                        data.append('pic', item.file)
                    })
                }
                
                axios.postFile('job/add.action', data)
                    .then(res => {
                        this.$dialog.alert({
                            message: res.msg
                        }).then(() => {
                            this.repairList.reLoading = true
                            this.$router.replace('/repair')
                        })
                    }
                ).catch(err => {
                    console.log(err)
                })
                
            } else {
                this.errorContent = '投诉内容不能为空'
            }
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'repairType',
            'repairList'
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
