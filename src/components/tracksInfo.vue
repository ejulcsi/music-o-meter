<template>
  <div>
    <bubble-chart :width="canvasWidth" :height="canvasHeight" v-if="selectedVisual === 'bubble'"></bubble-chart>
    <poly-chart :width="canvasWidth" :height="canvasHeight" v-if="selectedVisual === 'polygon'"></poly-chart>
    <radial-chart :width="canvasWidth" :height="canvasHeight" v-if="selectedVisual === 'radial'"></radial-chart>
    <mandala-chart :width="canvasWidth" :height="canvasHeight" v-if="selectedVisual === 'mandala'"></mandala-chart>
    <!--<line-chart :width="canvasWidth" :height="narrowCanvasHeight" v-if="selectedVisual === 'line'"></line-chart>-->
  </div>
</template>

<script>
import LineChart from '@/components/visuals/lineChart.vue'
import BubbleChart from '@/components/visuals/bubbleChart.vue'
import PolyChart from '@/components/visuals/polyChart.vue'
import RadialChart from '@/components/visuals/radialChart.vue'
import MandalaChart from '@/components/visuals/mandalaChart.vue'

export default {
  name: 'TracksInfo',
  components: {
    'line-chart': LineChart,
    'bubble-chart': BubbleChart,
    'radial-chart': RadialChart,
    'poly-chart': PolyChart,
    'mandala-chart': MandalaChart
  },
  data () {
    return {
      canvasWidth: window.innerWidth / 3 * 2,
      canvasHeight: window.innerHeight - 100,
      narrowCanvasHeight: window.innerHeight / 2
    }
  },
  computed: {
    selectedVisual() {
      return this.$store.state.selectedVisual
    }
  }
}
</script>
