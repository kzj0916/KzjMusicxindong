<template>
  <div class="singcard">
    <div class="sing-img" @click.prevent="getSinger(cards.id)">
      <img :src="cards.picUrl" alt="404" />
    </div>
    <div class="sing-bottom">
      <a href="#" style="color:red" @click.prevent="getSinger(cards.id)">{{cards.name}}</a>
      <a href="#" @click.prevent="getSingerMenu(cards.accountId)">
        <i :class="[cards.accountId === undefined ? '' : 'el-icon-user s-user']" ></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "singcard",
  props: {
    cards: {
      type:Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    //跳转到歌手页
      getSinger(id){
          console.log(id);
          this.$router.push("/singer" + id)
      },
      //跳转到歌手详情页 无接口暂未做
      getSingerMenu(id){
          console.log(id);
      }
  },
};
</script>

<style>
.singcard{
    width: 17%;
    margin-top: 15px;
    margin-right: 5px;
}
.singcard>div{
    width: 100%;
}
.sing-img{
    cursor: pointer;
}
.sing-img img{
    width: 100%;
}
.sing-bottom{
    margin-top: 8px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}
.s-user{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #5292fe;
    text-align: center;
    line-height: 15px;
}
</style>