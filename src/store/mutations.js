import { NOW_MUSICMENU, NOW_MUSIC, USER_SONGLIST, MUSIC_LISTIDS, ADD_COUNT, SUB_COUNT, CLEAR_COUNT, SET_COUNT, SET_DURATION, SET_PLAY } from './mutationType'
export default {
    [NOW_MUSIC](state, url) {
        state.nowmusic = url;
    },
    [NOW_MUSICMENU](state, menu) {
        state.nowmusicmenu = { ...menu };
    },
    [USER_SONGLIST](state, list) {
        state.userPlayList = [...list];
    },
    [MUSIC_LISTIDS](state, list) {
        state.musiclistId = [...list];
    },
    [ADD_COUNT](state) {
        if (state.musiclistId.length > 0 && state.musicCount + 1 < state.musiclistId.length) {
            state.musicCount++;
        }
    },
    [SUB_COUNT](state) {
        if (state.musiclistId.length > 0 && state.musicCount > 0) {
            state.musicCount--;
        }
    },
    [CLEAR_COUNT](state) {
        if (state.musiclistId.length > 0) {
            state.musicCount = 0;
        }
    },
    [SET_COUNT](state, num) {
        if (state.musiclistId.length > 0) {
            // console.log(num);
            state.musicCount = num;
        }
    },
    [SET_DURATION](state, num) {
        // console.log(num);
        state.musicDuration = num;
    },
    [SET_PLAY](state, flag) {
        state.isPlaying = flag;
    },

}