import { request } from './request'

export function getSearchAll(keywords,limit=30,offset=0,type=1000) {
    return request({
        url: "/search",
        params:{
            keywords,
            limit,
            offset,
            type,
        }
    })
}