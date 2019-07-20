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
            <van-cell-group>
                <van-field
                    v-model="visitorName"
                    required
                    clearable
                    label="姓    名"
                    placeholder="请输入姓名"
                />
                <van-field
                    v-model="startTime"
                    required
                    readonly
                    label="生效时间"
                    placeholder="请选择生效时间"
                    @click="startShow=true"
                />
                <van-field
                    v-model="endTime"
                    required
                    readonly
                    label="失效时间"
                    placeholder="请选择失效时间"
                    @click="endShow=true"
                />
                <van-field
                    v-model="validCount"
                    readonly
                    label="有效次数"
                    placeholder="有效次数1-4"
                    @click="countShow=true"
                />
            </van-cell-group>
            <van-popup v-model="startShow" position="bottom">
                <van-datetime-picker
                    v-model="startTimePicker"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="confirmStartTime"
                    @cancel="cancelStartTime"
                />
            </van-popup>
            <van-popup v-model="endShow" position="bottom">
                <van-datetime-picker
                    v-model="endTimePicker"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="confirmEndTime"
                    @cancel="cancelEndTime"
                />
            </van-popup>
            <van-popup v-model="countShow" position="bottom">
                <van-picker
                    :columns="['1','2','3','4']"
                    @change="changeValidCount"
                />
            </van-popup>
            <div class="visitor-add">
                <van-button type="primary" size="large" @click="visitorAddSubmit">生成邀请二维码</van-button>
            </div>
        </section>
    </section>
</template>

<script>
    import dateTool from '@/utils/dateformat'
    import axios from '@/utils/fetch'
    export default {
        name: "VisitorAdd",
        data(){
            return{
                zindex:999,
                title:'新邀请',
                visitorName:'',
                startTime:'',
                endTime:'',
                startShow:false,
                endShow:false,
                startTimePicker:new Date(),
                endTimePicker:new Date(),
                minDate: new Date(),
                maxDate: new Date(2030,1,1),
                countShow:false,
                validCount:'',
            }
        },
        methods:{
            confirmStartTime(value){
                this.startTime=dateTool.format(value,'yyyy-MM-dd HH:mm')
                this.startShow=false
            },
            cancelStartTime(){
                this.startTime=''
                this.startShow=false
            },
            confirmEndTime(value){
                this.endTime=dateTool.format(value,'yyyy-MM-dd HH:mm')
                this.endShow=false
            },
            cancelEndTime(){
                this.endTime=''
                this.endShow=false
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
            changeValidCount(picker, value, index){
                this.validCount=value
                this.countShow=false
            },
            visitorAddSubmit(){
                if(this.visitorName===''){
                    this.$toast('请输入访客姓名')
                    return
                }
                if(this.visitorName.length>10){
                    this.$toast('访客姓名过长')
                    return;
                }
                if(this.startTime===''){
                    this.$toast('请选择生效时间')
                    return
                }
                if(this.endTime===''){
                    this.$toast('请选择失效时间')
                    return
                }
                if(this.startTimePicker.getTime()>this.endTimePicker.getTime()){
                    this.$toast('失效时间不能小于生效时间')
                    return
                }
                if(this.endTimePicker.getTime()-this.startTimePicker.getTime()>48*60*60*1000){
                    this.$toast('失效时间和生效时间的间隔不能大于48小时')
                    return
                }
                let param={
                    userId:'',
                    cardNo:'',
                    visitorName:this.visitorName,
                    effectTime:dateTool.format(this.startTimePicker,'yyyyMMddHHmm'),
                    expireTime:dateTool.format(this.endTimePicker,'yyyyMMddHHmm'),
                    openTimes:this.validCount
                }
                console.log(param)
                // axios.post('getHIKVisionVisitorQRcode.action',param).then(
                //     res=>{
                //         console.log(res)
                //     }
                // ).catch(err=>{
                //     console.log(err)
                // })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .visitor-add{
        padding:30px 10px;
    }
</style>
