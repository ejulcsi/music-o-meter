import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from '@/views/home'
import Profile from '@/views/profile'
import Artists from '@/views/artists.vue'
import Tracks from '@/views/tracks.vue'
import Analysis from '@/views/singleFeature.vue'
import MultipleFeatures from '@/views/multipleFeatures.vue'

// import {getHashParams} from './utils'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        chkauth: true
      }
    },
    {
      path: '/auth*',
      name: 'Auth',
      meta: {
        chkauth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        chkuser: true
      }
    },
    {
      path: '/top-artists',
      name: 'Artists',
      component: Artists,
      meta: {
        chkuser: true
      }
    },
    {
      path: '/top-tracks',
      name: 'Tracks',
      component: Tracks,
      meta: {
        chkuser: true
      }
    },
    {
      path: '/mood-map',
      name: 'MultipleFeatures',
      component: MultipleFeatures,
      meta: {
        chkuser: true
      }
    }
  ]
})
