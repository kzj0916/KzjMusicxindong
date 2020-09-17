<template>
  <div class="main">
    <div class="back-img">
        <img
          src="./assets/img/bg/bg.jpg"
          alt="404"
          style="width:100%;filter:blur(80px);"
        />
      </div>
    <div id="app">
      <TopBar></TopBar>
      <CenterAll class="center-m"></CenterAll>
      <BottomBar class="btm-b"></BottomBar>
    </div>
  </div>
</template>

<script>
import TopBar from "components/common/topbar/TopBar";
import BottomBar from "components/common/bottombar/BottomBar";
import CenterAll from "views/center/CenterAll";

// import {get} from 'network/request'
export default {
  name: "APP",
  components: {
    TopBar,
    BottomBar,
    CenterAll,
  },
  data() {
    return {
    };
  },
  created() {
    
  },
  methods: {
  },
};
</script>

<style  scoped>
.center-m {
  position: relative;
}
.btm-b {
  position: relative;
}
#app {
  width: 1400px;
  margin: 0 auto;
  margin-top: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
}
.back-img {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.main{
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.back-img img {
  width: 100%;
}
</style>
