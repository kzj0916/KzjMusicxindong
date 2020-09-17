import {request} from './request'
export function getSinger(area=-1,type=-1,initial=-1,limit=30){
    return request({
        url:"/artist/list",
        params:{
            type,
            initial,
            area,
            limit,
        }
    })
}
export function getSingerDesc(id){
    return request({
        url:"/artist/desc",
        params:{
            id,
        }
    })
}
export function getSingerArt(id){
    return request({
        url:"/artists",
        params:{
            id,
        }
    })
}
export function getSingerAlbum(id,limit=30){
    return request({
        url:"/artist/album",
        params:{
            id,
            limit,
        }
    })
}
export function getSingerAlbumAll(id){
    return request({
        url:"/album",
        params:{
            id,
        }
    })
}
export function getSingerMv(id,limit=20,offset=0){
    return request({
        url:"/artist/mv",
        params:{
            id,
            limit,
            offset,
        }
    })
}
export function getSingerSimi(id){
    return request({
        url:"/simi/artist",
        params:{
            id,
        }
    })
}
export function getMvUrl(id){
    return request({
        url:"/mv/url",
        params:{
            id,
        }
    })
}
export function getMvDetail(mvid){
    return request({
        url:"/mv/detail",
        params:{
            mvid,
        }
    })
}
export function getMvDetailInfo(mvid){
    return request({
        url:"/mv/detail/info",
        params:{
            mvid,
        }
    })
}
export function getMvSimi(mvid){
    return request({
        url:"/simi/mv",
        params:{
            mvid,
        }
    })
}
export function getMvComment(id,limit=20,offset=0){
    return request({
        url:"/comment/mv",
        params:{
            id,
            limit,
            offset,
        }
    })
}
