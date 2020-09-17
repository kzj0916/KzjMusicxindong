import { request } from './request'

export function getNewSongs(type = 0) {
    return request({
        url: "/top/song",
        params:{
            type,
        }
    })
}
export function getNewAlbum(area,limit=30) {
    return request({
        url: "/top/album",
        params:{
            area,
            limit,
        }
    })
}
export function getNewAlbumComment(id,limit=20,offset=0) {
    return request({
        url: "/comment/album",
        params:{
            id,
            limit,
            offset,
        }
    })
}