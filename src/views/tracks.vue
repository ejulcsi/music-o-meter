<template>
  <div>
    <h1>{{ title }}</h1>
    <filter-menu>
      <time-filter api="tracks"/>
    </filter-menu>
    <track-list/>
  </div>
</template>

<script>
import TrackList from '@/components/trackList.vue'
import FilterMenu from '@/components/filterMenu'
import PeriodFilter from '@/components/filters/periodFilter'

export default {
  name: 'Artists',
  components: {
    'track-list': TrackList,
    'time-filter': PeriodFilter,
    'filter-menu': FilterMenu
  },
  data () {
    return {
      title: 'My Top Tracks'
    }
  },
  created () {
    this.$store.dispatch('getTrackList', 'short')
  }
}
</script>
