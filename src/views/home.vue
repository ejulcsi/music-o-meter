<template>
  <div id="home">
    <header-title/>
    <login-button/>
  </div>
</template>

<script>
import HeaderTitle from '../components/header.vue'
import Login from '@/components/login.vue'

export default {
  name: 'Home',
  components: {
    'header-title': HeaderTitle,
    'login-button': Login
  },
  data () {
    return {
      title: 'music-o-meter'
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
</style>
