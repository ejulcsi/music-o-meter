<template>
  <div>
    <p>audio feature</p>
    <ul class="feature-filters">
      <li class="clean" @click="cleanFilters">clean</li>
      <li v-for="(item, index) in labels" :key="index" :data-feature="item" @click="filterFeatures">{{item}}</li>
    </ul>
    </div>
</template>

<script>
import { setSelectedStyle } from '../../utils/index'

export default {
  name: 'FeatureFilter',
  data () {
    return {
      labels: ['danceability', 'energy', 'valence',
        'speechiness', 'acousticness', 'instrumentalness'],
      filtered: new Map()
    }
  },
  computed: {
    features () {
      return this.$store.state.multipleFeatureList
    }
  },
  methods: {
    filterFeatures (event) {
      let filter = event.target.getAttribute('data-feature')

      if (!this.filtered.has(filter)) {
        this.filtered.set(filter, this.features.get(filter))
      } else {
        this.filtered.delete(filter)
      }

      const filtered = this.filtered.size > 0 ? this.filtered : this.features

      setSelectedStyle(event.target)

      this.$store.commit('filterFeatureList', filtered)
    },
    cleanFilters () {
      const filters = document.querySelectorAll('.feature-filters li')
      this.filtered.clear()

      filters.forEach(item => item.classList.remove('selected'))
      this.$store.commit('filterFeatureList', this.features)
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 20px;
    font-weight: 700;
  }

  .feature-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .feature-filters li {
    max-width: 120px;
    padding: 10px;
    margin-right: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #ffe305;
    cursor: pointer;
    transition: background-color 0.4s;
  }

  .feature-filters li:hover,
  .feature-filters li.selected {
    background-color: rgba(255, 227, 5, 0.3);
  }

  .clean {
    text-transform: uppercase;
  }
</style>
