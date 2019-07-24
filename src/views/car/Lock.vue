<template>
    <section class="box-wrapper">
        <van-nav-bar 
            title="智能锁车"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-cell-group>
                <van-field
                    v-model="currentCar"
                    readonly
                    label="车辆选择"
                    placeholder="请选择车辆"
                    @click="carSelectClick"
                />
                <van-cell title="锁车状态">
                    <div :class="['_content-switch-lock',{locked:lockedClass}]">
                        <Icon :name="currentCarLockIcon"></Icon>
                        <span v-text="currentCarLockText"></span>
                    </div>
                    <van-switch
                        v-model="currentCarLock"
                        :disabled="lockDisabled"
                        @change="currentCarLockChange"
                        active-color="#07c160"
                        inactive-color="#f44"
                        size="24px"
                    />
                </van-cell>
            </van-cell-group>
            <van-popup v-model="carSelectShow" position="bottom">
                <van-picker
                    :columns="carList"
                    @change="currentCarChange"
                />
            </van-popup>
            <div v-if="currentCar" class="_content-cross-record">
                <div class="cross-record-title">出入记录</div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :finished-text="finishedText"
                    :offset="500"
                    @load="onLoad">
                    <div v-for="(item,index) in currentCarCrossList" class="cross-record-list" :key="index">
                        <div class="_list-li">
                            <label>车牌号码 : </label>
                            <span v-text="item.plateNo"></span>
                        </div>
                        <div class="_list-li">
                            <label>入场时间 : </label>
                            <span v-text="item.vehicleOut===0?IOSTimeFormat(item.crossTime):''"></span>
                        </div>
                        <div class="_list-li">
                            <label>出场时间 : </label>
                            <span v-text="item.vehicleOut===1?IOSTimeFormat(item.crossTime):''"></span>
                        </div>
                        <div class="_list-li">
                            <label>停车时长 : </label>
                            <span v-text="getParkingTime(index)"></span>
                        </div>
                    </div>
                </van-list>
            </div>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "CarLock",
        data(){
            return{
                zindex:999,
                carSelectShow:false,
                lockDisabled:true,
                carList:[],
                currentCar:'',
                currentCarLock:true,
                currentCarLockText:'',
                currentCarLockIcon:'',
                lockedClass:false,
                currentCarAlarmSyscode:'',
                currentCarCrossList:[],
                loading:false,
                finished:false,
                finishedText:'',
                page:0,
                pageSize:6,
            }
        },
        created(){
          this.getCarList()
        },
        methods:{
            //获取车辆信息
            getCarList(){
                let params={
                    ownerid:4541
                }
                axios.post('/vehicleinfo/query.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code==='200'){
                            res.resultList.forEach(car=>{
                                if(car.vehiclestatus === 0){
                                    this.carList.push(car.vehiclecode)
                                }
                            })
                            if(this.carList.length>0){
                                this.currentCar=this.carList[0]
                                this.getCarAlarm()
                                this.lockDisabled=false
                            }
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            },
            //车辆选择点击
            carSelectClick(){
                if(this.carList.length>0){
                    this.carSelectShow=true
                }else{
                    this.$toast('没有获取到车辆信息')
                }
            },
            //车辆选择
            currentCarChange(picker, value, index){
                this.currentCar=value
                this.getCarAlarm()
                this.getCarCrossRecord()
                this.carSelectShow=false
                this.page=1
                this.loading=false
                this.finished=false
            },
            //获取车辆布控信息
            getCarAlarm(){
                let params={
                    searchKey:this.currentCar,
                    pageNo:1,
                    pageSize:100,
                }
                axios.post('/isc/alarmCar/page.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code==='0'){
                            if(res.data.list.length>0){
                                this.currentCarAlarmSyscode=res.data.list[0].alarmSyscode
                                this.carAlarm(false)
                            }else{
                                this.currentCarAlarmSyscode=''
                                this.carAlarm(true)
                            }
                        }else{
                            this.$toast(res.msg)
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            },
            //布控状态切换，flag->false:锁车，true:解锁
            carAlarm(flag){
                this.currentCarLock=flag
                this.lockedClass=!flag
                if(flag){
                    this.currentCarLockText='解锁'
                    this.currentCarLockIcon='iconkaisuo'
                }else{
                    this.currentCarLockText='锁车'
                    this.currentCarLockIcon='iconsuo'
                }
            },
            //车辆出入记录加载更多
            onLoad(){
                this.page++
                this.getCarCrossRecord()
            },
            //获取车辆出入记录
            getCarCrossRecord(){
                this.loading=true
                let params={
                    plateNo:this.currentCar,
                    pageNo:this.page,
                    pageSize:this.pageSize
                }
                axios.post('/isc/crossRecords/page.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code==='0'){
                            this.currentCarCrossList=this.currentCarCrossList.concat(res.data.list)
                            if(this.pageSize*this.page>=res.data.total){
                                this.finished=true
                                if(this.page>1){
                                    this.finishedText='没有更多了'
                                }
                            }
                        }else{
                            this.$toast(res.msg)
                        }
                        setTimeout(()=>{
                            this.loading=false
                        },1000)
                    }
                ).catch(err=>{
                    console.log(err)
                })
            },
            //获取车辆出入记录中出场记录的停车时长
            getParkingTime(index){
                let parkingTimeLength=''
                let crossTime=this.IOSTimeFormat(this.currentCarCrossList[index].crossTime)
                let lastIntime=this.IOSTimeFormat(this.getLastIntime(index))
                if(lastIntime!==''){
                    let in_date=new Date(lastIntime)
                    let out_date=new Date(crossTime)
                    let time=out_date.getTime()-in_date.getTime()
                    if(time/1000/60>=60){
                        parkingTimeLength=(time/1000/60)%60==0?parseInt(time/1000/60/60)+"小时":parseInt(time/1000/60/60)+"小时"+parseInt((time/1000/60)%60)+"分钟"
                    }else{
                        parkingTimeLength=parseInt(time/1000/60)+"分钟"
                    }
                }
                return parkingTimeLength
            },
            //获取车辆出入记录中出场记录对应的入场记录
            getLastIntime(index){
                let result="";
                if(index<this.currentCarCrossList.length-1){
                    if(this.currentCarCrossList[index].vehicleOut===0){
                        result=this.currentCarCrossList[index].crossTime
                    }else{
                        result=this.getLastIntime(index+1)
                    }
                }
                return result
            },
            //IOS标准时间格式转换
            IOSTimeFormat(timeString){
                return timeString.replace('T',' ').replace('+08:00','')
            },
            //布控开关切换
            currentCarLockChange(checked){
                this.carAlarm(checked)
                if(checked){
                    this.carAlarmDeletion(checked)
                }else{
                    this.carAlarmAddition(checked)
                }
            },
            //车辆布控
            carAlarmAddition(flag){
                let params={
                    plateNo:this.currentCar
                }
                axios.post('/isc/alarmCar/addition.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code === '0'){
                            this.currentCarAlarmSyscode=res.data.alarmSyscode
                        }else{
                            this.carAlarm(!flag)
                            this.$toast(res.msg)
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            },
            //车辆取消布控
            carAlarmDeletion(flag){
                let params={
                    alarmSyscodes:this.currentCarAlarmSyscode
                }
                axios.post('/isc/alarmCar/deletion.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code === '0'){
                            this.currentCarAlarmSyscode=''
                        }else{
                            this.carAlarm(!flag)
                            this.$toast(res.msg)
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .box-wrapper{
        background:#f0f0f0;
        ._content-switch-lock{
            display:inline-block;
            position :relative;
            top:-7px;
            font-size :16px;
            margin-right :10px;
            color:#07c160;
            .icon{
                width :1.3em;
                height:1.3em;
                vertical-align :-.25em;
            }
            span{
                margin-left :3px;
            }
        }
        ._content-switch-lock.locked{
            color:#f44;
        }
        ._content-cross-record{
            background:#fff;
            .cross-record-title{
                margin-top:20px;
                text-align:center;
                padding:10px;
                font-size:16px;
                border-bottom:1px solid #f0f0f0;
            }
            .cross-record-list{
                padding:10px;
                border-bottom:1px solid #f0f0f0;
                ._list-li{
                    height:26px;
                    line-height 26px;
                    font-size:14px;
                }
            }
        }
    }

</style>
