import {request} from './request'

export function getSwiper(){
    return request({
        url:"/banner",
    })
}

export function getMusicUrl(musicId){
    return request({
        url:"song/url",
        params:{
           id:musicId,
        }
    })
}
export function getMusicMenu(musicId){
    return request({
        url:"song/detail",
        params:{
           ids:musicId,
        }
    })
}
export function getMusicList(){
    return request({
        url:"/top/playlist",
        params: {
            offset: (Math.random() * 1297).toFixed(0) - 12,
            limit: 12
        }
    })
}
export function getOnlyList(){
    return request({
        url:"/personalized/privatecontent",
    })
}
export function getNewList(){
    return request({
        url:"personalized/newsong",
    })
}
export function getSongListInfo(songsid){
    return request({
        url:"playlist/detail",
        params: {
            id:songsid
        }
    })
}
export function getSongListInfoSongs(songsid){
    return request({
        url:"song/detail",
        params: {
            ids:songsid
        }
    })
}
export function getSongListCollect(songsid){
    return request({
        url:"playlist/subscribers",
        params: {
            id:songsid
        }
    })
}
export function getSongListComment(songsid){
    return request({
        url:"comment/playlist",
        params: {
            id:songsid
        }
    })
}
export function getSongLyric(id){
    return request({
        url:"/lyric",
        params: {
            id,
        }
    })
}
export function getSongSimi(id){
    return request({
        url:"/simi/song",
        params: {
            id,
        }
    })
}
export function getSongLyricComment(id,limit=20,offset=0){
    return request({
        url:"/comment/music",
        params: {
            id,
            limit,
            offset,
        }
    })
}

