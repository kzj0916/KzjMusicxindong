<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in swipers" :key="index">
        <el-image
          @click="changeUrl(item.targetId)"
          :src="item.imageUrl"
          fit="contain"
          style="height: 100%;"
        ></el-image>
        <el-tag
          :type="item.typeTitle === '独家' ? 'danger' : 'primary'"
          effect="dark"
          style="position: absolute; top:76%;right:0;border-radius: 10px 0 0 10px;height:19px;lineHeight:19px"
        >{{item.typeTitle}}</el-tag>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSwiper,getMusicUrl,getMusicMenu } from "network/home";
import {NOW_MUSICMENU, NOW_MUSIC} from '@/store/mutationType'

export default {
  name:'Swiper',
  data() {
    return {
      swipers: [],
      musicUrl:'',
      musicMenu:{},
    };
  },
  created() {
    this.getSwiper();
  },
  methods: {
    //获取轮播图数据
    getSwiper() {
      getSwiper().then((res) => {
        // console.log(res.banners);
        this.swipers = res.banners;
      });
    },
    changeUrl(id) {
        // console.log(id);
        if(id === null) return
        this.getMusicUrl(id);
        this.getMusicMenu(id);
    },
    getMusicUrl(id){
        getMusicUrl(id).then(res => {
            // console.log(res.data[0]);
            this.musicUrl = res.data[0].url;
            this.$store.commit(NOW_MUSIC,this.musicUrl);
            // console.log(this.musicUrl);
        })
    },
    getMusicMenu(id){
        getMusicMenu(id).then(res =>{
            // console.log(res);
            this.musicMenu = res.songs[0];
            this.$store.commit(NOW_MUSICMENU,this.musicMenu);
            // console.log(this.musicMenu);
        })
    }
  },
};
</script>

<style>
.swiper {
  width: 1000px;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>