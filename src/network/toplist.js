import {request} from './request'

export function getTopList(){
    return request({
        url:"/toplist",
    })
}
export function getTopListDetial(){
    return request({
        url:"toplist/detail",
    })
}
