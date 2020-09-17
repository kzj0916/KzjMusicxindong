<template>
  <div class="rt-style">
    <Swiper> </Swiper>
    <MusicList> </MusicList>
    <OnlyOne> </OnlyOne>
    <NewMusic> </NewMusic>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import MusicList from 'components/common/musiclist/MusicList'
import OnlyOne from 'components/common/onlyone/OnlyOne'
import NewMusic from 'components/common/newmusic/NewMusic'
import RightTop from "views/right/RightTop";
export default {
  name:'RightStyle',
  components:{
    Swiper,
    MusicList,
    OnlyOne,
    NewMusic,
    RightTop,
  }
};
</script>
<style scoped>
.rt-style {
  width: 100%;
  max-height: 600px;
  overflow: auto;
}
</style>