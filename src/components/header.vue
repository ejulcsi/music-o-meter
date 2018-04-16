<template>
  <header>
    <router-link to="/" :class="menuClass" v-html="title"></router-link>
    <!--<router-link to="/profile" v-else class="button">profile</router-link>-->
  </header>
</template>

<script>
export default {
  name: 'HeaderTitle',
  props: ['menu', 'barmi'],
  computed: {
    menuClass () {
      return this.menu && 'menu'
    },
    title () {
      return this.menu
        ? 'music<br/>-o-<br/>meter'
        : 'music-o-meter'
    }
  }
}
</script>

<style>
  header {
    margin-bottom: 30px;
  }
  header a {
    font-size: 48px;
    font-weight: 700;
    color: #f5f5f5;
    text-decoration: none;
    letter-spacing: 0.09em;
    transition: letter-spacing .3s;
  }

  header a:hover {
    letter-spacing: 0.18em;
  }

  header a.menu {
    font-size: 30px;
  }
</style>
