<template>
  <div>
    <ul class="track-info">
      <li v-bind:key="item.id" v-for="item in featureList">
        <h3>{{item.key}}</h3>
        <p>{{item.value}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Info',
  computed: {
    featureList () {
      return this.$store.state.featureList
    }
  }
}
</script>

<style>
  .track-info {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .track-info li {
    display: flex;
  }
</style>
