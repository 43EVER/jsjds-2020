import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rawModules: []
  },
  getters: {
    modulesData: state => {
      let tmp = {}
      JSON.parse(JSON.stringify(state.rawModules)).forEach(v => {
        tmp[v.modulename] = {}
        tmp[v.modulename].data = v.data
      })
      // console.log(tmp)
      return tmp
    },
    modulesPath: state => {
      let tmp = {}
      state.rawModules.forEach(v => {
        if (tmp.hasOwnProperty(v.path))
          tmp[v.path].push(v.modulename)
        else
          tmp[v.path] = [v.modulename]
      })
      return tmp
    }
  },
  mutations: {
  },
  actions: {
    async updateModule({ state, dispatch }, payload) {
      // update
      if (payload._id) {
        // console.log(`store(updateModule, update), payload: ${JSON.stringify(payload)}`)
        const res = await Vue.prototype.$http.put(`module/${payload._id}`, payload)
        // console.log(`store(updateModule, update), payload(result): ${JSON.stringify(res)}`)
      } else {
        // create
        // console.log(`store(updateModule, create), payload: ${JSON.stringify(payload)}`)
        const res = await Vue.prototype.$http.post('module', payload)
        // console.log(`store(updateModule, create), payload(result): ${JSON.stringify(res)}`)
      }
      await dispatch('fetchModules')
    },

    async fetchModules({ state }) {
      const res = await Vue.prototype.$http.get('module')
      // console.log(`store(fetchModules), result: ${JSON.stringify(res)}`)
      state.rawModules = res.data
    },

    async deleteModule({ dispatch }, payload) {
      // console.log(`store(deleteModule), payload: ${JSON.stringify(payload)}`)
      const res = await Vue.prototype.$http.delete(`module/${payload._id}`)
      // console.log(`store(deleteModule), payload(result): ${JSON.stringify(res)}`)
      await dispatch('fetchModules')
    },

    async saveModulesObj({ dispatch, state }, payload) {
      for (let key in payload) {
        // console.log(key)
        let tmp = state.rawModules.find((value) => {
          return value.modulename === key
        })
        if (tmp)
          Vue.prototype.$http.put(`module/${tmp._id}`, {
            _id: tmp._id,
            data: payload[key].data
          })
      }
    }
  },
  modules: {
  }
})
