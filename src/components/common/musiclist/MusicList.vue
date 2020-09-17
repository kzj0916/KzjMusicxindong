<template>
  <div class="musiclist">
      <TitleHeader name="推荐歌单"> </TitleHeader>
      <MusicListItem v-for="(item,index) in musiclist" :key="index" :item='item'></MusicListItem>
  </div>
</template>

<script>
import MusicListItem from 'components/common/musiclist/MusicListItem'
import TitleHeader from 'components/common/titleheader/TitleHeader'
import { getMusicList } from "network/home";
export default {
    name:'MusicList',
    data(){
        return{
            musiclist:{},
        }
    },
    components:{
        MusicListItem,
        TitleHeader,
    },
    created(){
        this.getMusicList();
        console.log(this.musiclist);
    },
    methods:{
        //获取十条数据来展示
        getMusicList(){
            getMusicList().then(res => this.musiclist = res.playlists.slice(0,10))
        }
    }
}
</script>

<style scoped>
.musiclist{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>