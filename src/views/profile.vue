<template>
  <div id="home">
    <header-title/>
    <router-link class="button" to="/top-artists">See my Top Artists</router-link>
    <router-link class="button" to="/top-tracks">See my Top Tracks</router-link>
    <router-link class="button" to="/mood-map">See my MoodMap</router-link>
    <a href="/logout" class="button">logout</a>
  </div>
</template>

<script>
import HeaderTitle from '../components/header.vue'
import axios from 'axios'

export default {
  name: 'Profile',
  components: {HeaderTitle},
  data () {
    return {
      title: 'music-o-meter'
    }
  },
  computed: {
    token () {
      return this.$store.state.accessToken
    }
  },
  methods: {
    refreshToken () {
      const token = this.$store.state.refreshToken
      axios.get(`/refresh_token/${token}`).then(response => {
        this.$store.commit('updateAccessToken', response.data['access_token'])
        console.log('refresh', this.$store.state.accessToken)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  #home {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .button {
    display: block;
    max-width: 200px;
    padding: 8px 15px;
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 0.01em;
    color: #f5f5f5;
    text-decoration: none;
    border: 1px solid #4ce8a7;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color .4s;
  }

  .button:hover {
    background-color: rgba(76, 232, 167, 0.2);
  }
</style>
