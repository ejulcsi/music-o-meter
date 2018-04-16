<template>
  <ul class="artist-list">
    <slot name="artist" v-for="item in artists" :index="index" :item="item"></slot>
  </ul>
</template>

<script>
export default {
  name: 'ArtistList',
  computed: {
    artists () {
      return this.$store.getters.artistsToShow
    }
  }
}
</script>

<style scoped>
  .artist-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 300px);
    padding: 20px;
    left: 300px;
    list-style: none;
    margin: 0;
    box-sizing: border-box;
  }
</style>
