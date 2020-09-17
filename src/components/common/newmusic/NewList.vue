<template>
  <div class="newlist">
    <el-row style="margin-top: 25px;">
      <!--左侧-->
      <el-col :span="12">
        <el-table
          :data="newMusicList.slice(0,5)"       
          @row-dblclick="dblclickPlayMusic"
          :show-header="false"
        >
          <el-table-column type="index">
            <template scope="scope">{{'0'+(scope.$index+1).toString()}}</template>
          </el-table-column>
          <el-table-column  style="position: prelative">
            <template scope="scope">
              <i
                class="el-icon-video-play"
                @click.stop="changeUrl(scope.row.id)"
                style="position: absolute;font-size: 25px;bottom: 17px;left:60px;z-index:10;color:orange;cursor:pointer;"
              ></i>

              <el-image
                :src="scope.row.picUrl"
                @click="changeUrl(scope.row.id)"
                style="width: 75px;height: 75px;cursor:pointer;"
              ></el-image>
              <span
                style="position: absolute;top: 25px;left:100px;font-size: 14px;font-weight: 500;"
              >{{scope.row.name}}</span>
              <span
                @click="toSingerPage(scope.row)"
                style="cursor:pointer;position: absolute;bottom: 25px;left:108px;font-size: 12px;font-weight: 500"
              >{{scope.row.song.artists[0].name}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--右侧-->
      <el-col :span="12">
        <el-table
          :data="newMusicList.slice(5,10)"  
          @row-dblclick="dblclickPlayMusic"
          stripe
          :show-header="false"
        >
          <el-table-column type="index">
            <template
              scope="scope"
            >{{scope.$index >= 4 ? scope.$index+6 : '0'+(scope.$index+6).toString()}}</template>
          </el-table-column>
          <el-table-column  style="position: prelative">
            <template scope="scope">
              <el-image
                :src="scope.row.picUrl"
                @click="changeUrl(scope.row.id)"
                style="width: 75px;height: 75px;cursor:pointer;"
              ></el-image>
              <i
                class="el-icon-video-play"
                @click="changeUrl(scope.row.id)"
                style="position: absolute;font-size: 25px;bottom: 17px;left:60px;color:orange;z-index: 10;cursor:pointer;"
              ></i>

             <span
                style="position: absolute;top: 25px;left:100px;font-size: 14px;font-weight: 500;"
              >{{scope.row.name}}</span>
              <span
                @click="toSingerPage(scope.row)"
                style="cursor:pointer;position: absolute;bottom: 25px;left:108px;font-size: 12px;font-weight: 500"
              >{{scope.row.song.artists[0].name}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNewList,getMusicUrl,getMusicMenu} from "network/home";
import {NOW_MUSICMENU, NOW_MUSIC} from '@/store/mutationType'
export default {
  name:'NewList',
    data(){
        return{
            newMusicList:[],
        }
    },
    methods:{
      //获取最新音乐
        getNewList(){
            getNewList().then(res => {
                this.newMusicList = res.result
            })
        },
        getMusicUrl(id){
            getMusicUrl(id).then(res => {
              this.$store.commit(NOW_MUSIC,res.data[0].url);
            })
        },
         getMusicMenu(id){
            getMusicMenu(id).then(res => {
              this.$store.commit(NOW_MUSICMENU,res.songs[0]);
            })
        },
        dblclickPlayMusic(row){
            this.changeUrl(row.id)
        },
        changeUrl(id){
            this.getMusicUrl(id);
            this.getMusicMenu(id);
        },
        //跳转到歌手页面
        toSingerPage(row){
            console.log(row);
        }
    },
    created(){
        this.getNewList();
    },
};
</script>

<style scoped>
.newlist{
    width: 100%;
}
</style>