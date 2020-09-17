<template>
  <div class="rt-new">
    <div class="new-main">
      <div class="new-tog">
        <el-button :class="[isTog ? 'active' : '']" size="small" round @click.native="togList">新歌速递</el-button>
        <el-button
          :class="[isTog ? '' : 'active']"
          size="small"
          round
          @click.native="togAnchor"
        >新碟上架</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <SingerAlbum
            :wth="95"
            :imgShow="false"
            :tableList="songsList"
            topTitle="热门歌曲"
            v-show="togShow"
            :images="true"
            :nicknameshow="true"
          >
            <template v-slot:tableicon="poce">
              <img :src="poce.item" alt="404" style="width:30px" />
            </template>
            <template v-slot:tablesinger="poces">
              <span v-if="poces.item.length === 1">{{poces.item[0].name}}</span>
              <span v-else>
                <i
                  v-for="(item,index) in poces.item"
                  :key="item.id"
                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
              </span>
            </template>
          </SingerAlbum>
          <div class="new-album" v-show="!togShow">
            <NewAlbumList v-for="item in albumList" :item="item" :key="item.id" :wth="18"></NewAlbumList>
          </div>
        </el-tab-pane>
        <el-tab-pane label="华语" name="second">
          <SingerAlbum
            :wth="95"
            :imgShow="false"
            :tableList="huayuList"
            topTitle="华语歌曲"
            :images="true"
            :nicknameshow="true"
            v-show="togShow"
          >
            <template v-slot:tableicon="poce">
              <img :src="poce.item" alt="404" style="width:30px" />
            </template>
            <template v-slot:tablesinger="poces">
              <span v-if="poces.item.length === 1">{{poces.item[0].name}}</span>
              <span v-else>
                <i
                  v-for="(item,index) in poces.item"
                  :key="item.id"
                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
              </span>
            </template>
          </SingerAlbum>
          <div class="new-album" v-show="!togShow">
            <NewAlbumList v-for="item in huayualbum" :item="item" :key="item.id" :wth="18"></NewAlbumList>
          </div>
        </el-tab-pane>
        <el-tab-pane label="欧美" name="third">
          <SingerAlbum
            :wth="95"
            :imgShow="false"
            :tableList="oulist"
            topTitle="欧美歌曲"
            :images="true"
            :nicknameshow="true"
            v-show="togShow"
          >
            <template v-slot:tableicon="poce">
              <img :src="poce.item" alt="404" style="width:30px" />
            </template>
            <template v-slot:tablesinger="poces">
              <span v-if="poces.item.length === 1">{{poces.item[0].name}}</span>
              <span v-else>
                <i
                  v-for="(item,index) in poces.item"
                  :key="item.id"
                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
              </span>
            </template>
          </SingerAlbum>
          <div class="new-album" v-show="!togShow">
            <NewAlbumList v-for="item in oualbum" :item="item" :key="item.id" :wth="18"></NewAlbumList>
          </div>
        </el-tab-pane>
        <el-tab-pane label="韩国" name="fourth">
          <SingerAlbum
            :wth="95"
            :imgShow="false"
            :tableList="hanlist"
            topTitle="韩国歌曲"
            :images="true"
            :nicknameshow="true"
            v-show="togShow"
          >
            <template v-slot:tableicon="poce">
              <img :src="poce.item" alt="404" style="width:30px" />
            </template>
            <template v-slot:tablesinger="poces">
              <span v-if="poces.item.length === 1">{{poces.item[0].name}}</span>
              <span v-else>
                <i
                  v-for="(item,index) in poces.item"
                  :key="item.id"
                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
              </span>
            </template>
          </SingerAlbum>
          <div class="new-album" v-show="!togShow">
            <NewAlbumList v-for="item in hanalbum" :item="item" :key="item.id" :wth="18"></NewAlbumList>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日本" name="five">
          <SingerAlbum
            :wth="95"
            :imgShow="false"
            :tableList="rilist"
            topTitle="日本歌曲"
            :images="true"
            :nicknameshow="true"
            v-show="togShow"
          >
            <template v-slot:tableicon="poce">
              <img :src="poce.item" alt="404" style="width:30px" />
            </template>
            <template v-slot:tablesinger="poces">
              <span v-if="poces.item.length === 1">{{poces.item[0].name}}</span>
              <span v-else>
                <i
                  v-for="(item,index) in poces.item"
                  :key="item.id"
                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
              </span>
            </template>
          </SingerAlbum>
          <div class="new-album" v-show="!togShow">
            <NewAlbumList v-for="item in rialbum" :item="item" :key="item.id" :wth="18"></NewAlbumList>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SingerAlbum from "components/common/singerlist/SingerAlbum";
import NewAlbumList from "components/common/newsongs/NewAlbumList";
import { getNewSongs, getNewAlbum } from "network/newSongs";
export default {
  name: "RightNewsing",
  components: {
    SingerAlbum,
    NewAlbumList,
  },
  data() {
    return {
      isTog: true,
      activeName: "first",
      songsList: [],
      huayuList: [],
      oulist: [],
      rilist: [],
      hanlist: [],
      albumList: [],
      huayualbum: [],
      oualbum: [],
      rialbum: [],
      hanalbum: [],
      togShow: true,
    };
  },
  methods: {
    //根据切换了不同标签栏来获取数据
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.name);
      if (this.togShow) {
        switch (tab.name) {
          case "second":
            this.getNewSongs(7);
            break;
          case "third":
            this.getNewSongs(96);
            break;
          case "fourth":
            this.getNewSongs(8);
            break;
          case "five":
            this.getNewSongs(16);
            break;
          default:
            this.getNewSongs(0);
        }
      } else {
        switch (tab.name) {
          case "second":
            this.getNewAlbum("ZH");
            break;
          case "third":
            this.getNewAlbum("EA");
            break;
          case "fourth":
            this.getNewAlbum("KR");
            break;
          case "five":
            this.getNewAlbum("JP");
            break;
          default:
            this.getNewAlbum("ALL");
        }
      }
    },
    togList() {
      if (this.isTog) return;
      this.togShow = true;
      console.log("切换了歌单");
      this.isTog = true;
    },
    togAnchor() {
      if (!this.isTog) return;
      this.togShow = false;
      console.log("切换了专辑");
      this.isTog = false;
    },
    getNewSongs(type) {
      getNewSongs(type).then((res) => {
        // console.log(res.data);
        switch (type) {
          case 7:
            this.huayuList = res.data;
            break;
          case 96:
            this.oulist = res.data;
            break;
          case 8:
            this.rilist = res.data;
            break;
          case 16:
            this.hanlist = res.data;
            break;
          default:
            this.songsList = res.data;
        }
      });
    },
    getNewAlbum(area) {
      getNewAlbum(area).then((res) => {
        console.log(res);
        // this.albumList = res.albums;
        switch (area) {
          case "ZH":
            this.huayualbum = res.albums;
            break;
          case "EA":
            this.oualbum = res.albums;
            break;
          case "KR":
            this.rialbum = res.albums;
            break;
          case "JP":
            this.hanalbum = res.albums;
            break;
          default:
            this.albumList = res.albums;
        }
      });
    },
  },
  created() {
    this.getNewSongs();
    this.getNewAlbum("ALL");
  },
};
</script>
<style scoped>
.new-album {
  display: flex;
  width: 95%;
  margin: 0 auto;
  justify-content: space-around;
  flex-wrap: wrap;
}
.active {
  background: skyblue;
  color: #f5f5f7;
}
.rt-new {
  width: 100%;
  max-height: 620px;
  overflow: auto;
}
.new-main {
  width: 80%;
  margin: 0 auto;
}
.new-tog {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>