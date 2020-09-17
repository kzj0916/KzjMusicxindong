import Vue from 'vue'
import Vuex from 'vuex'
// import * as type from './mutationType'
import modulesOne from './modules/modulesOne'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
  musiclistId:[],
  musicCount:0,
  nowmusic:'',
  nowmusicmenu:{},
  musicmenus:[],
  userPlayList:[],
  musicDuration: 0,
  isPlaying:true,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    modulesOne,
  }
})
