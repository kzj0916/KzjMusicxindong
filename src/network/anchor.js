import { request } from './request'

export function getAnchorBanner() {
    return request({
        url: "dj/banner",
    })
}
export function getAnchorCateList() {
    return request({
        url: "dj/catelist",
    })
}
export function getAnchorRecommend() {
    return request({
        url: "/dj/recommend",
    })
}
export function getAnchorPay(limit=4) {
    return request({
        url: "/dj/paygift",
        params:{
            limit,
        }
    })
}
export function getAnchorDetail(rid) {
    return request({
        url: "/dj/detail",
        params:{
            rid,
        }
    })
}
export function getAnchorType(typeid) {
    return request({
        url: "/dj/recommend/type",
        params:{
            type:typeid
        }
    })
}
export function getAnchorHot(cateId,limit) {
    return request({
        url: "/dj/radio/hot",
        params:{
            cateId,
            limit,
        }
    })
}
export function getAnchorToplist(type='hot',limit=30) {
    return request({
        url: "/dj/toplist",
        params:{
            type,
            limit,
        }
    })
}
export function getAnchorProgram(rid,asc=false) {
    return request({
        url: "/dj/program",
        params:{
            rid,
            asc,
        }
    })
}
// export function getAnchorSub(rid) {
//     return request({
//         url: "/dj/sub",
//         params:{
//             rid,
//         }
//     })
// }