import Vue from 'vue'
import Vuex from 'vuex'
import { getArtistInfo, getTrackListInfo, getMultipleTrackFeatures, getRecentlyPlayedTracks } from './utils/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isSignedIn: false,
    accessToken: null,
    refreshToken: null,
    hasLoaded: false,
    artistList: [],
    filteredArtistList: [],
    trackList: [],
    genreList: [],
    multipleFeatureList: [],
    filteredFeatureList: [],
    recentTrackList: [],
    selectedVisual: 'radial'
  },
  getters: {
    artistsToShow (state) {
      const artistsToShow = state.filteredArtistList.length > 0
        ? state.filteredArtistList
        : state.artistList
      return artistsToShow
    },
    getTrackById: (state) => (id) => {
      return state.recentTrackList.filter(item => item.id === id).pop()
    }
  },
  mutations: {
    updateSignedIn (state, isSignedIn) {
      state.isSignedIn = isSignedIn
    },
    updateAccessToken (state, token) {
      state.accessToken = token
    },
    setArtistList (state, list) {
      state.artistList = list
    },
    filterArtistList (state, list) {
      state.filteredArtistList = list
    },
    setTrackList (state, list) {
      state.trackList = list
    },
    setRecentTrackList (state, list) {
      state.recentTrackList = list
    },
    setGenreList (state, list) {
      state.genreList = list
    },
    setMultipleFeatureList (state, map) {
      state.multipleFeatureList = map
    },
    filterFeatureList (state, map) {
      state.filteredFeatureList = Array.from(map).map(item => {
        const [label, object] = item
        const {index, data} = object

        return {
          index,
          label,
          data
        }
      })
    },
    setSelectedVisual (state, value) {
      state.selectedVisual = value
    }
  },
  actions: {
    getArtistList ({state, commit}, term) {
      getArtistInfo(state.accessToken, term).then(response => {
        commit('setArtistList', response.artists)
        commit('setGenreList', response.genres)
      })
    },
    getTrackList ({state, commit}, term) {
      getTrackListInfo(state.accessToken, term).then(response => {
        commit('setTrackList', response.tracks)
      })
    },
    getMultipleFeatureList ({state, commit}, term = 'short') {
      getRecentlyPlayedTracks(state.accessToken, term).then(response => {
        const trackIDs = response.tracks.map(item => item.id)

        getMultipleTrackFeatures(state.accessToken, trackIDs).then((data) => {
          commit('setMultipleFeatureList', data)
          commit('filterFeatureList', data)
        })
      })
    }
  }
})

export default store
