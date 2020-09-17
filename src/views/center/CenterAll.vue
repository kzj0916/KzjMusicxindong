<template>
  <div class="centerall">
    <el-container class="ct-container">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
        <LeftMenu></LeftMenu>
      </el-aside>
      <div class="con-all" v-loading="false">
        <!-- <RightTop> </RightTop> -->
        <transition :name="transitionName">
          <keep-alive exclude="SongList,AnchorList,SingerMenu,SingerMvVideo,AlbumList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "views/left/LeftMenu";
// import RightTop from "views/right/RightTop";
export default {
  name: "CenterAll",
  components: {
    LeftMenu,
  },
  data() {
    return {
      transitionName: "",
    };
  },
  methods: {},
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to.meta.index,from.meta.index);
      if (from.meta.index == 0 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
        return;
      } 
      if(to.meta.index == 0 && to.meta.index < from.meta.index){
        this.transitionName = "slide-right";
      }
      if (to.meta.index > 1 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-com";
        }
      if (to.meta.index > 1 && to.meta.index < from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-back";
        }
      // } else {
      //   this.transitionName = "slide-back";
      // }
    },
  },
};
</script>
<style >
/* 动画效果 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-com-enter-active,
.slide-com-leave-active,
.slide-back-enter-active,
.slide-back-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-com-enter {
  opacity: 0;
  transform: translate3d(0,-100%,0);
}
.slide-com-leave-active {
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.slide-back-enter {
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.slide-back-leave-active {
  opacity: 0;
  transform: translate3d(0,-100%, 0);
}
</style>
<style scoped>
.con-all {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 680px;
  /* border-bottom: 1px solid red; */
  /* justify-content: space-between; */
}
/* .rt-top{
    position: absolute;
    top: -43px;
    
} */
.centerall {
  position: relative;
  width: 100%;
  max-height: 680px;
  height: 680px;
}
.ct-container {
  width: 100%;
  height: 680px;
  border: 1px solid #eee;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>