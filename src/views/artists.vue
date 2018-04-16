<template>
  <div id="artists-page">
    <h1>{{ title }}</h1>
    <main>
      <filter-menu>
        <time-filter api="artists"/>
        <genre-filter/>
      </filter-menu>
      <artist-list>
        <artist-item
          slot="artist"
          slot-scope="{ item }"
          :artist="item"/>
      </artist-list>
    </main>
  </div>
</template>

<script>
import ArtistList from '@/components/artistList.vue'
import ArtistItem from '@/components/artistItem'
import FilterMenu from '@/components/filterMenu'
import GenreFilter from '@/components/filters/genreList.vue'
import PeriodFilter from '@/components/filters/periodFilter'

export default {
  name: 'Artists',
  components: {
    'artist-list': ArtistList,
    'artist-item': ArtistItem,
    'filter-menu': FilterMenu,
    'genre-filter': GenreFilter,
    'time-filter': PeriodFilter
  },
  data () {
    return {
      title: 'My Top Artists'
    }
  },
  created () {
    this.$store.dispatch('getArtistList', 'short')
  }
}
</script>

<style>
  #artists-page main {
    display: flex;
  }
</style>
