<template>
  <div class="musiclist">
      <TitleHeader name="最新音乐"> </TitleHeader>
      <NewList> </NewList>
  </div>
</template>

<script>
import TitleHeader from 'components/common/titleheader/TitleHeader'
import NewList from 'components/common/newmusic/NewList'
export default {
    name:'NewMusic',
    data(){
        return{
           
        }
    },
    components:{
        TitleHeader,
        NewList,
    },
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