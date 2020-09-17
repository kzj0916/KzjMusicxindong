export default{
   getNowMusic(state){
       if(state.nowmusic === null){
           state.nowmusic = '';
       }
    //    console.log(state.nowmusic);
       return state.nowmusic;
   },
   getNowMusicMenu(state){
    if(state.nowmusicmenu.al === undefined){
        return {
            al:{
              picUrl:require('assets/img/common/logo.png'),
              name:'歌名',
              pic:0,
              id:0,
            },
            ar:[{
                id:0,
                name:'歌手'
            }],
            dt:0,
          }
    }else{
        return state.nowmusicmenu;
    }
   },
   getUserSonglist(state){
       if(state.userPlayList.length > 0){
        return state.userPlayList
       }
   },
   getMusicListIds(state){
        return state.musiclistId
   },
   getMusicCount(state){  
    //    console.log(state.musicCount);
        return state.musicCount
   },
   getDuration(state){
       return state.musicDuration;
   },
   getIsPlay(state){
       return state.isPlaying;
   },
}