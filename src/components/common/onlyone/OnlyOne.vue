<template>
  <div class="onlyone">
    <TitleHeader name="独家放送"></TitleHeader>
    <MusicListItem v-for="(item,index) in onlylist" :key="index" :item="item" :wth="28">
      <div slot="music-t"></div>
    </MusicListItem>
  </div>
</template>

<script>
import TitleHeader from "components/common/titleheader/TitleHeader";
import MusicListItem from "components/common/musiclist/MusicListItem";
import { getOnlyList } from "network/home";
export default {
  name:'OnlyOne',
  components: {
    TitleHeader,
    MusicListItem,
  },
  data() {
    return {
      onlylist: {},
    };
  },
  methods: {
    //获取独家放送信息
    getOnlyList() {
      getOnlyList().then((res) => (this.onlylist = res.result));
    },
  },
  created() {
    this.getOnlyList();
  },
};
</script>

<style scoped>
.onlyone {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>