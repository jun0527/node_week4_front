import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      _id: '6293af72dd10c9eb7ac981d3',
      name: 'John',
      photo: 'https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg',
    },
    dropdown: {
      sort: false,
    },
  },
  getters: {
  },
  mutations: {
    openDropdown(state, payload) {
      state.dropdown[payload] = true;
    },
    closeDropdown(state, payload) {
      state.dropdown[payload] = false;
    },
  },
  actions: {
  },
  modules: {
  },
});
