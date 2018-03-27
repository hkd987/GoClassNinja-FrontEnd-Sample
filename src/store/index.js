import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/*
 global localStorage: false
*/
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    session: (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : null || null,
    status: (localStorage.getItem('token')) ? true : false,
    studentsArray: []
  },
  getters: {
    authStatus: state => state.status,
    userStatus: state => state.user,
    isAuthenticated: state => !!state.token,
    userSession: state => state.session,
    headerToken: state => state.token,
    userRole: state => (state.user !== null) ? state.user.role : state.user,
    studentsArray: state => state.studentsArray
  },
  mutations: {
    logout (state) {
      state.user = null
      state.token = null
      state.status = false
      state.session = null
      state.studentsArray = []
    },
    login (state) {
      state.session = JSON.parse(localStorage.getItem('user')).username
      state.status = true
      state.user = JSON.parse(localStorage.getItem('user'))
      state.token = JSON.parse(localStorage.getItem('token'))
    },
    assignStudentArray (state, payload) {
      state.studentsArray.push(...payload)
    },
    emptyStudentsArray (state) {
      while (state.studentsArray.length > 0) {
        state.studentsArray.pop()
      }
    }
  },
  actions: {
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit('logout')
    },
    login ({ commit }, payload) {
      localStorage.setItem('token', JSON.stringify(payload.token))
      localStorage.setItem('user', JSON.stringify(payload.user))
      commit('login')
    },
    fillStudentArray ({ commit }, payload) {
      commit('emptyStudentsArray')
      commit('assignStudentArray', payload)
    },
    cleanStudentsArray ({ commit }) {
      commit('emptyStudentsArray')
    }
  }
})
