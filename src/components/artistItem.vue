<template>
  <li class="artist" :key="index">
    <img :src="artist.image">
    <div class="artist-text">
      <h2>{{artist.name}}</h2>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ArtistItem',
  props: ['artist', 'index']
}
</script>

<style>
.artist {
  position: relative;
  width: 220px;
  height: 220px;
  overflow: hidden;
}

.artist img {
  width: 100%;
}

.artist-text {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  background: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s;
}
.artist:hover .artist-text {
  opacity: 1;
}
</style>
