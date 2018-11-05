/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const state = {
  Authenticated: window.$cookies.get('token'),
};

const getters = {
  getAuthenticated: state => {
    return !!getters.getToken(state);
  },
  getToken: state => {
    return state.Authenticated;
  },
  getPlace: (state) => (placeId) => {
    const URLConfig = {
      headers : {
        Authorization: `Token ${getters.getToken(state)}`,
      },
    };
    const placesURL = `http://127.0.0.1:8000/api/places/${placeId}`;

    return axios.get(placesURL, URLConfig);
  },
};

const actions = {
  signOut(state) {
    const urlLogOut =
      'http://127.0.0.1:8000/api/users/logout';

    const token = this.getters.getToken;

    state.commit('signOut');

    axios.post(
      urlLogOut,
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }).then((response) => {
        console.log('Signed out');
      }).catch((error) => {
        console.log(error);
      });
  }
};

const mutations = {
  signOut(state) {
    mutations.setAuthenticated(state, false);
    window.$cookies.remove('token');
    window.$cookies.remove('user_id');
  },
  setAuthenticated(state, isAuthenticated) {
    state.Authenticated = isAuthenticated;
  },
  setSelectedPlace(state, newSelectedPlace) {
    state.selectedPlace = newSelectedPlace;
  },
};

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  state,
});
