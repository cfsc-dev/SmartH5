<template>
    <van-popup v-model="show"
               :overlay="false"
               position="bottom">
        <div id="KeyboardContent" class="car-plate-keyboard-content">
            <div v-if="data.length>0">
                <div v-for="(rows,index) in numText" class="_plate-keyboard-row">
                    <div v-for="text in rows" v-if="(data.length===1&&index===0)||(data.length>1&&'港澳学'.indexOf(text)!==-1)|| data.length===length"
                         :class="{disable:(data.length===1&&index===0)||(data.length>1&&'港澳学'.indexOf(text)!==-1)|| data.length===length}"
                         :style="{width:(screenWidth-11*5)/10+'px'}" class="_plate-keyboard-city-key">
                        <span v-text="text"></span>
                    </div>
                    <div v-else @click="keyClick(text)" :style="{width:(screenWidth-11*5)/10+'px'}" class="_plate-keyboard-city-key">
                        <span v-text="text"></span>
                    </div>
                    <div v-if="rows.length<10" @click="deleteClick"
                         :style="{width:(2*((screenWidth-11*5)/10)+5)+'px'}" class="_plate-keyboard-city-key delete">
                        <Icon name="iconhuitui"></Icon>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-for="rows in cityText" class="_plate-keyboard-row">
                    <div v-for="text in rows" @click="keyClick(text)"
                         :style="{width:(screenWidth-11*5)/10+'px'}" class="_plate-keyboard-city-key">
                        <span v-text="text"></span>
                    </div>
                    <div v-if="rows.length<10"
                         :style="{width:(2*((screenWidth-11*5)/10)+5)+'px'}" class="_plate-keyboard-city-key delete disable">
                        <Icon name="iconhuitui"></Icon>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import VisitorAdd from "../../visitor/Add";
    export default {
        name: "CarPlateKeyboard",
        components: {VisitorAdd},
        props:['show','plate','length'],
        data(){
            return{
                data:[],
                screenWidth: document.body.clientWidth, // 屏幕尺寸
                cityText:[['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'],
                        ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'],
                        ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'],
                        ['新','临']],
                numText:[['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
                        ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
                        ['W','X','Y','Z','港','澳','学']],
            }
        },
        watch:{
            plate(val){
                this.data=val.split('')
            }
        },
        methods:{
            close(){
                this.$emit('update:show', false)
            },
            keyClick(text){
                this.data.push(text)
                this.$emit('change',this.data.join(''))
            },
            deleteClick(){
                this.data.splice(this.data.length-1,1)
                this.$emit('change',this.data.join(''))
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /*.van-popup{
        height:40%;
        background:rgba(0,0,0,0);
    }*/
.car-plate-keyboard-content{
    padding:10px 0;
    width:100%;
    /*height:300px;*/
    text-align:center;
    background:#f0f0f0;
    /*position: absolute;*/
    /*bottom:10px;*/
    ._plate-keyboard-row{
        margin-top:10px;
        height:36px;
        clear:both;
    }
    ._plate-keyboard-city-key{
        float:left;
        margin-left:5px;
        padding:8px 0;
        border: 1px solid #cccccc;
        border-radius:3px;
        background:#fff;
    }
    ._plate-keyboard-city-key.disable{
        background:#f0f0f0;
    }
    ._plate-keyboard-city-key.delete{
        float:right;
        margin-right:5px;
        height:36px;
        .icon{
            font-size:30px;
            color:#cccccc;
            position:relative;
            top:-7px;
        }
    }
    ._plate-keyboard-city-key:active{
        background:#f0f0f0;
    }
}
</style>
