import { request } from './request'

export function getSongListCatlist() {
    return request({
        url: "playlist/hot",
    })
}
export function getSongList(limit,offset,cat) {
    return request({
        url: "/top/playlist",
        params: {
            cat,
            limit,
            offset,
        }
    })
}