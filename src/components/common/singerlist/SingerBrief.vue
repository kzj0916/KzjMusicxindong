<template>
  <div class="singerbrief">
      <div class="s-brief">
          <h2>歌手简介</h2>
          <p class="t-txt">{{self}}</p>
      </div>
      <div class="s-content" v-for="(item,index) in contents" :key="index">
          <h2>{{item.ti}}</h2>
          <p v-html="item.txt" class="t-txt"></p>
      </div>
  </div>
</template>

<script>
export default {
    name:'SingerBrief',
    data(){
        return{}
    },
    props:{
        contents:{
            type:Array,
            default(){
                return []
            }
        },
        self:{
            type:String,
            default:'',
        }
    }
}
</script>

<style scped>
.singerbrief{
    line-height: 1.5;
    color: #666;
    font-size: 15px;
}
h2{
    font-size: 20px;
    margin: 10px 0;
    font-weight: bold;
    color: #333;
}
.t-txt{
text-indent:24px
}
</style>