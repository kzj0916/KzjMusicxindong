import { request } from './request'

export function getVideoTitleList() {
    return request({
        url: "/video/group/list",
    })
}
export function getVideoGroups(id,offset) {
    return request({
        url: "/video/group",
        params:{
            id,
            offset,
        }
    })
}
export function getVideoDetail(id) {
    return request({
        url: "/video/detail",
        params:{
            id,
        }
    })
}
export function getVideoDetailInfo(vid) {
    return request({
        url: "/video/detail/info",
        params:{
            vid,
        }
    })
}
export function getVideoUrl(id) {
    return request({
        url: "/video/url",
        params:{
            id,
        }
    })
}
export function getVideoSimi(id) {
    return request({
        url: "/related/allvideo",
        params:{
            id,
        }
    })
}
export function getVideoComment(id,limit=20,offset=0) {
    return request({
        url: "/comment/video",
        params:{
            id,
            limit,
            offset,
        }
    })
}
export function getVideoAll(area='内地',limit=20,offset=0) {
    return request({
        url: "/mv/all",
        params:{
            area,
            limit,
            offset,
        }
    })
}
