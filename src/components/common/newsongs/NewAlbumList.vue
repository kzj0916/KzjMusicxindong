<template>
  <div class="album-item" @click="toListPage(item.id)" :style="{width:wth+'%'}">
    <div class="album-img">
      <img :src='item.picUrl' alt="404" />
      <div class="album-play">
        <i class="el-icon-caret-right"></i>
      </div>
    </div>
    <div class="namet">
      <span style="fontSize:13px">{{item.name}}</span>
    </div>
    <p class="album-nickname" style="fontSize:13px;color:#888;">{{item.artist.name}}</p>
  </div>
</template>

<script>
export default {
  name: "NewAlbumList",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    wth: {
      type: Number,
      default: 18,
    },
  },
  created() {
    // console.log(this.item);
  },
  methods: {
    toListPage(id) {
      console.log( id);
      this.$router.push('/album' + id);
    },
  },
};
</script>

<style scoped>
.album-item{
  margin-top: 15px;
  cursor: pointer;
  overflow: hidden;
}
.album-img{
  position: relative;
}
.album-img img{
  width: 100%;
}
.album-play{
  border-radius: 50%;
  border: 1px solid #f5f5f7;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  position: absolute;
  padding: 4px;
  transform: translateX(50px);
  transition: transform .5s;
  right: 3px;
  bottom: 6px;
}
.album-play:hover{
  background: rgba(0, 0, 0, 0.5);
}
.album-img:hover .album-play{
  transform: translateX(0);
}
.namet{
  margin: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>