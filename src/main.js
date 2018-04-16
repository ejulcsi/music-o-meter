import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import {getHashParams} from './utils'

Vue.config.productionTip = true

let params = getHashParams()

if (Object.keys(params).length > 0 && params.access_token) {
  store.commit('updateAccessToken', params.access_token)
  store.commit('updateSignedIn', true)
  router.replace({name: 'Profile'})
}

router.beforeEach((to, from, next) => {
  if (store.state.isSignedIn && to.matched.some(record => record.meta.chkauth)) {
    next({name: 'Profile', replace: true})
    return
  }

  if (!store.state.isSignedIn && to.matched.some(record => record.meta.chkuser)) {
    next({name: 'Home', replace: true})
    return
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
