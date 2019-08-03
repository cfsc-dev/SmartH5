<template>
    <div class="car-plate-cell" :style="getCellStyle()">
        <div v-for="index in 8" class="_cell-box"
             :class="{active:focus&&index-1===data.length,energy:index===8}"
             :style="getCellBoxStyle()">
            <div v-if="data.length<7&&index===8">
                <img :src="`${require('@/assets/img/bg_xly.png')}`">
            </div>
            <div v-else>
                <span v-text="data[index-1]"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CarPlateCell",
        props:['carPlate','focus'],
        data(){
            return{
                data:[],
                screenWidth: document.body.clientWidth, // 屏幕尺寸
            }
        },
        watch:{
            carPlate(val){
                this.data=val.split('')
            }
        },
        methods:{
            getCellBoxStyle(){
                let value=((this.screenWidth-5)/8-5)+'px'
                return {
                    width: value,
                    height: value,
                    lineHeight:value
                }
            },
            getCellStyle(){
                let value=((this.screenWidth-5)/8+15)+'px'
                return {
                    height: value,
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>
    .car-plate-cell{
        padding:10px 0;
        clear: both;
        ._cell-box{
            float:left;
            text-align:center;
            border:1px solid #cccccc;
            margin-left:5px;
        }
        ._cell-box.active,._cell-box.active.energy{
            border:1px solid #07c160;
        }
        ._cell-box.energy{
            border:1px dotted #cccccc;
        }
        ._cell-box img{
            width:90%;
            margin-top:5%;
        }
    }
</style>
