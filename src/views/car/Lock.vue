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
                <van-switch-cell v-model="currentCarLock" active-color="#07c160"
                                 inactive-color="#f44" :disabled="lockDisabled" title="锁车状态" />
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
                currentCarAlarmSyscode:'',
                currentCarCrossList:[],
                loading:false,
                finished:false,
                finishedText:'',
                page:0,
                pageSize:10,
            }
        },
        created(){
          this.getCarList()
        },
        methods:{
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
            carSelectClick(){
                if(this.carList.length>0){
                    this.carSelectShow=true
                }else{
                    this.$toast('没有获取到车辆信息')
                }
            },
            currentCarChange(picker, value, index){
                this.currentCar=value
                this.getCarAlarm()
                this.getCarCrossRecord()
                this.carSelectShow=false
            },
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
                                this.currentCarLock=false
                            }else{
                                this.currentCarAlarmSyscode=''
                                this.currentCarLock=true
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
            onLoad(){
                this.page++
                this.getCarCrossRecord()
            },
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
            getParkingTime(index){
                let parkingTimeLength=''
                let crossTime=this.IOSTimeFormat(this.currentCarCrossList[index].createTime)
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
            getLastIntime(index){
                let result="";
                if(index<this.currentCarCrossList.length-1){
                    if(this.currentCarCrossList[index].vehicleOut===0){
                        result=this.currentCarCrossList[index].createTime
                    }else{
                        result=this.getLastIntime(index+1)
                    }
                }
                return result
            },
            IOSTimeFormat(timeString){
                return timeString.replace('T',' ').replace('+08:00','')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .box-wrapper{
        background:#f0f0f0;
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
