import { request } from './request'

export function getPhoneLogin(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone,
            password,
        }
    })
}

export function getPhoneLoginOut(){
    return request({
        url:'logout',
    })
}
export function getUserSonglist(uid){
    return request({
        url:'user/playlist',
        params:{
            uid,
        }
    })
}
export function getUserAnchor(uid){
    return request({
        url:'/user/dj',
        params:{
            uid,
        }
    })
}
export function getUserFollows(uid){
    return request({
        url:'/user/follows',
        params:{
            uid,
        }
    })
}