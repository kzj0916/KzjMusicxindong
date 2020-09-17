

export default {
    routes: [
        {
            path: '/',
            redirect: '/home/rtstyle',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home/Home'),
            meta:{index:7},
            children: [
                {
                    path: 'rtstyle',
                    name: 'style',
                    component: () => import('@/views/right/menu/RightStyle'),
                    meta:{index:7}
                },
                {
                    path: 'rtsongs',
                    name: 'songs',
                    component: () => import('@/views/right/menu/RightSongs'),
                    meta:{index:8}
                },
                {
                    path: 'rtanchor',
                    name: 'anchor',
                    component: () => import('@/views/right/menu/RightAnchor'),
                    meta:{index:9}
                },
                {
                    path: 'rtlist',
                    name: 'list',
                    component: () => import('@/views/right/menu/RightList'),
                    meta:{index:10}
                },
                {
                    path: 'rtnewsing',
                    name: 'newsing',
                    component: () => import('@/views/right/menu/RightNewsing'),
                    meta:{index:11}
                },
                {
                    path: 'rtsinger',
                    name: 'singer',
                    component: () => import('@/views/right/menu/RightSinger'),
                    meta:{index:12}
                },
            ]
        },
        {
            path: '/songs:id',
            name: 'songslist',
            component: () => import('components/common/songlist/SongList'),
            meta:{index:2}
        },
        {
            path: '/anchor:id',
            name: 'anchorlist',
            component: () => import('components/common/anchor/AnchorList'),
            meta:{index:2}
        },
        {
            path: '/singer:id',
            name: 'singerlist',
            component: () => import('components/common/singerlist/SingerMenu'),
            meta:{index:2}
        },
        {
            path: '/mvvideo:id',
            name: 'videolist',
            component: () => import('components/common/singerlist/SingerMvVideo'),
            meta:{index:2}
        },
        {
            path: '/videos:id',
            name: 'videos',
            component: () => import('components/common/musicvideo/VideoDetail'),
            meta:{index:2}
        },
        {
            path: '/album:id',
            name: 'albumlist',
            component: () => import('components/common/album/AlbumList'),
            meta:{index:2}
        },
        {
            path: '/search:keywords',
            name: 'search',
            component: () => import('components/common/search/SearchMain'),
            meta:{index:2}
        },
        {
            path: '/hotAnchor',
            name: 'anchorHot',
            component: () => import('components/common/anchor/AnchorListHot'),
            meta:{index:2}
        },
        {
            path: '/payAnchor',
            name: 'anchorPay',
            component: () => import('components/common/anchor/AnchorListPay'),
            meta:{index:2}
        },
        {
            path: '/friends',
            name: 'friends',
            component: () => import('components/common/friend/Friends'),
            meta:{index:3}
        },
        {
            path: '/musicvideo',
            name: 'musicVideo',
            component: () => import('components/common/musicvideo/MusicVideo'),
            meta:{index:4}
        },
        {
            path: '/myseilffm',
            name: 'myseilffm',
            component: () => import('components/common/myseilfFM/MyseilfFM'),
            meta:{index:5}
        },
        {
            path: '/livestreaming',
            name: 'livestreaming',
            component: () => import('components/common/liveStreaming/LiveStreaming'),
            meta:{index:6}
        },
        {
            path: '/singel',
            name: 'singel',
            component: () => import('components/common/singel/Singel'),
            meta:{index:0}
        },
        {
            path: '/listAnchor:id',
            name: 'anchorList',
            component: () => import('components/common/anchorlist/AnchorListMenu'),
            meta:{index:2}
        },
    ],
    mode: 'history',
}