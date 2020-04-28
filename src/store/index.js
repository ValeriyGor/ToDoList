import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notesList: localStorage.getItem('notesList') == null ? [] : JSON.parse(localStorage.getItem('notesList')),
  },
  getters: {
    notesList(state) {
      return state.notesList
    }
  },
  mutations: {
    ADD_NOTE: (state, payload) => {
      state.notesList.push(payload);
      localStorage.setItem("notesList", JSON.stringify(state.notesList));
    },
    REMOVE_NOTE: (state, index) => {
      if (index !== -1) state.notesList.splice(index, 1);
      localStorage.setItem("notesList", JSON.stringify(state.notesList));
    },
    EDIT_NOTE: (state, payload) => {
      state.notesList[payload.index] = payload.data;
      localStorage.setItem("notesList", JSON.stringify(state.notesList));
    }
  },
  actions: {
    addNote: ({commit, state}, payload) => {
      commit('ADD_NOTE', payload)
      return state.notesList
    },
    removeNote: ({commit, state}, index) => {
      commit('REMOVE_NOTE', index)
      return state.notesList
    },
    editNote: ({commit, state}, payload) => {
      commit('EDIT_NOTE', payload);
      return state.notesList
    },
  },
  modules: {
  }
})
