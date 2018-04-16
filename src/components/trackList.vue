<template>
  <ul class="track-list">
    <li
      :key="index"
      v-for="(item, index) in tracks"
    class="track">
      <img v-bind:src="item.image">
      <div class="track-text">
        <h2>{{item.name}}</h2>
        <p>{{item.artist}}</p>
        <p>{{item.album}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TrackList',
  computed: {
    tracks () {
      return this.$store.state.trackList
    }
  }
}
</script>

<style>
  .track-list {
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

  .track {
    position: relative;
    width: 160px;
    height: 160px;
    overflow: hidden;
  }

  .track img {
    width: 100%;
  }

  .track-text {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
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

  .track:hover .track-text {
    opacity: 1;
  }

  .track-text a {
    padding: 5px;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #fff;
    text-decoration: none;
  }

  .track-text h2, p {
    width: 100%;
    margin: 0 0 10px;
  }
  .track-text h2 {
    font-size: 18px;
  }
</style>
