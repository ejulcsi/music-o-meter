<template>
  <div>
    <p>genres</p>
    <ul class="genre-list">
      <li @click="clear" id="clear">clear filters</li>
      <li
        :key="index"
        v-for="(item, index) in genres"
        @click="filtered"
      :data-genre="item"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import { setSelectedStyle } from '../../utils/index'

export default {
  name: 'GenreFilter',
  props: ['filters'],
  computed: {
    genres () {
      return Array.from(this.$store.state.genreList)
    }
  },
  methods: {
    filtered (event) {
      let artists = this.$store.state.artistList
      let filteredArtists = this.$store.state.filteredArtistList
      let genre = event.target.getAttribute('data-genre')

      if (filteredArtists.length > 0) {
        if (filteredArtists.some(item => item.genres.has(genre))) {
          filteredArtists = filteredArtists.filter(item => !item.genres.has(genre))
        } else {
          filteredArtists = filteredArtists.concat(artists.filter(item => item.genres.has(genre)))
        }
      } else {
        filteredArtists = artists.filter(item => item.genres.has(genre))
      }

      setSelectedStyle(event.target)

      this.$store.commit('filterArtistList', filteredArtists)
    },
    clear () {
      const filters = document.querySelectorAll('.genre-list li')

      filters.forEach(item => item.classList.remove('selected'))
      this.$store.commit('filterArtistList', [])
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 20px;
    font-weight: 700;
  }

  .genre-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 0;
    padding: 20px 0;
    list-style: none;
  }

  .genre-list li {
    position: relative;
    padding: 3px 6px;
    margin: 0 5px 10px;
    border: 1px solid #77f5b5;
    cursor: pointer;
  }

  .genre-list li::after {
    position: absolute;
    content: '';
    width: 100%;
    max-width: 0;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(119, 245, 181, 0.3);
    transition: max-width .4s, opacity .4s;
  }

  .genre-list li:hover::after {
    max-width: 100%;
    opacity: 1;
  }

  .genre-list li.selected {
    background: rgba(119, 245, 181, 0.3);
  }

  #clear {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    border-width: 2px;
  }
</style>
