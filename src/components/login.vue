<template>
  <div class="button-wrapper">
    <button class="button" @click="login">login</button>
  </div>
</template>

<script>
import { openWindow } from '../utils'

export default {
  name: 'Login',
  methods: {
    open () {
      openWindow('/auth-spotify')
    },
    generateRandomString (length) {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },
    login () {
      const clientId = '7af084d1a5e342479af908d281c01e01' // Your client id
      const redirectUri = 'http://localhost:8080'
      const stateKey = 'spotify_auth_state'
      let state = this.generateRandomString(16)
      localStorage.setItem(stateKey, state)
      const scope = 'user-read-private user-read-email user-top-read user-read-recently-played'
      let url = `https://accounts.spotify.com/authorize` +
        `?response_type=token` +
        `&client_id=${encodeURIComponent(clientId)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${encodeURIComponent(state)}`
      window.location = url
    }
  }
}
</script>

<style>
  .button-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
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
