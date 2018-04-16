<template>
  <div>
    <filter-menu>
      <visual-filter/>
      <feature-filter/>
    </filter-menu>
    <features-list/>
  </div>
</template>

<script>
import TrackList from '@/components/trackList.vue'
import TracksInfo from '@/components/tracksInfo.vue'
import FilterMenu from '@/components/filterMenu'
import FeatureFilter from '@/components/filters/featureFilter'
import VisualFilter from '@/components/filters/visualFilter'

export default {
  name: 'MultipleFeatures',
  components: {
    'track-list': TrackList,
    'filter-menu': FilterMenu,
    'feature-filter': FeatureFilter,
    'features-list': TracksInfo,
    'visual-filter': VisualFilter
  },
  data () {
    return {
      title: 'Features of the recently played tracks'
    }
  },
  created () {
    this.$store.dispatch('getMultipleFeatureList')
  }
}
</script>
