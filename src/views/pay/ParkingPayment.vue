<template>
    <section class="box-wrapper" @click="mainClick($event)">
        <van-nav-bar
            :title="title"
            left-arrow
            right-text="查询"
            fixed
            :z-index=zindex
            @click-left="back($router)"
            @click-right="paymentSearch"
        />
        <section class="main-content">
            <div class="__content-car-plate-tip">请输入车牌</div>
            <car-plate-cell id="CarPlate" :car-plate="carPlate"
                            :focus="keyboardShow"
                            @click.native="keyboardShow=true"
                            class="_content-car-plate"/>
            <div v-if="payment.plateNo" class="_content-parking-payment">
                <div v-if="carPlate!==payment.plateNo" class="search-fail">
                    <div class="fail-msg">没有查到停车信息</div>
                    <div class="alike">
                        <label>相似车牌 : </label>
                        <div class="plate" @click="alikePlateClick">
                            <span v-text="payment.plateNo"></span>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <div class="payment-list">
                        <label>入场时间 : </label>
                        <span v-text="payment.enterTime"></span>
                    </div>
                    <div class="payment-list">
                        <label>停车总时 : </label>
                        <span v-text="payment.parkTime+'分钟'"></span>
                    </div>
                    <div class="payment-list">
                        <label>应付金额 : </label>
                        <span v-text="payment.supposeCost+'元'"></span>
                    </div>
                    <div class="payment-list">
                        <label>实付金额 : </label>
                        <span v-text="payment.paidCost+'元'"></span>
                    </div>
                    <van-button type="primary" size="large" class="payment-btn" @click="pay">立即支付</van-button>
                </div>
            </div>
            <car-plate-keyboard id="CarPlateKeyboard" :show.sync="keyboardShow"
                                :length="8"
                                :plate="carPlate"
                                @change="carPlateChange"/>
        </section>
    </section>
</template>

<script>
    import carPlateKeyboard from './component/CarPlateKeyboard'
    import carPlateCell from './component/CarPlateCell'
    import axios from '@/utils/fetch'
    export default {
        name: "ParkingPayment",
        components:{
            carPlateKeyboard,
            carPlateCell
        },
        data(){
            return{
                title:'停车缴费',
                zindex:999,
                keyboardShow:false,
                carPlate:'',
                payment:{}
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$router.animate = 2
            next();
        },
        methods:{
            //组件点击事件--当点击虚拟键盘或车牌窗口之外关闭虚拟键盘
            mainClick(event){
                let _keyboard=document.getElementById('CarPlateKeyboard')
                let _plate=document.getElementById('CarPlate')
                if(this.keyboardShow&&(!_keyboard.contains(event.target)&&!_plate.contains(event.target))){
                    this.keyboardShow=false
                }
            },
            //车牌号变化
            carPlateChange(val){
                this.carPlate=val
                this.payment={}
            },
            //点击相似车牌
            alikePlateClick(){
                this.carPlate=this.payment.plateNo
            },
            //查询停车账单
            paymentSearch(){
                console.log(this.carPlate)
                let param={
                    plateNo:this.carPlate
                }
                axios.post('/isc/pay/quickPreBill.action',param).then(
                    res=>{
                        console.log(res)
                        if(res.code==='0'){
                            this.payment=res.data
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
            //支付
            pay(){
                let params={
                    billSyscode:this.payment.billSyscode,
                    actualCost:this.payment.supposeCost
                }
                axios.post('/isc/pay/receipt.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.code==='0'){
                            this.$toast('支付成功')
                        }else{
                            this.$toast(res.msg)
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            }

        }
    }
</script>

<style lang="stylus" scoped>
    .__content-car-plate-tip{
        margin-top:10px;
        text-align:center;
        font-size:12px;
        color:#2c2c2c;
    }
    ._content-parking-payment{
        padding:10px;
        .payment-list{
            margin:10px 0;
        }
        .payment-btn{
            margin-top:50px;
        }
        .search-fail{
            .fail-msg{
                text-align:center;
                font-size:18px;
                margin:20px 0;
            }
            .alike{
                height:42px;
                color:#cccccc;
                .plate{
                    display:inline-block;
                    border:1px solid #7d7e80;
                    padding:8px;
                    color:#2c2c2c;
                    border-radius:3px;
                }
            }
        }
    }
</style>
