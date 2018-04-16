<template>
  <div>
    <header-title/>
    <h1>{{ title }}</h1>
    <info-list/>
  </div>
</template>

<script>
import Info from '@/components/trackInfo.vue'
import HeaderTitle from '@/components/header.vue'

export default {
  name: 'Analysis',
  components: {
    'info-list': Info,
    'header-title': HeaderTitle
  },
  data () {
    return {
      title: 'Track Analysis',
    }
  },
  created () {
    console.log(this.$route.params.id)
    let id = this.$route.params.id
    this.$store.dispatch('getFeatureList', id)
  }
}
</script>
