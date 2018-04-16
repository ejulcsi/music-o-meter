<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['height'],
  name: 'LineChart',
  data () {
    return {
      options: {
        layout: {
          padding: {
            top: 0,
            bottom: 0
          }
        },
        showScale: false,
        scales: {
          xAxes: [
            {
              ticks: {
                display: false
              }
            }],
          yAxes: [
            {
              ticks: {
                display: false
              }
            }]
        },
        legend: {
          display: false
        },
        responsive: false,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    features () {
      return this.$store.state.filteredFeatureList
    },
    dataSet () {
      return {
        labels: this.getLabels(),
        datasets: this.getDatasets()
      }
    }
  },
  methods: {
    getLabels () {
      return this.features[0].data.map((item, index) => index)
    },
    getColors (feature) {
      const COLOR = {
        energy: [201, 205, 13],
        danceability: [205, 41, 103],
        valence: [3, 205, 141],
        instrumentalness: [43, 103, 141],
        speechiness: [3, 141, 205],
        acousticness: [13, 301, 41]
      }

      const rgb = COLOR[feature].join(',')

      const gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, this.height)
      gradient.addColorStop(0, `rgba(${rgb}, 0.6)`)
      gradient.addColorStop(0.5, `rgba(${rgb}, 0)`)
      gradient.addColorStop(1, `rgba(${rgb}, 0.6)`)

      return {
        borderColor: `rgb(${rgb})`,
        backgroundColor: gradient
      }
    },
    getDatasets () {
      return this.features.map(item => {
        let {borderColor, backgroundColor} = this.getColors(item.label)

        return {
          label: item.label,
          data: item.data,
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          tension: 0.6,
          borderColor,
          backgroundColor
        }
      })
    }
  },
  mounted () {
    this.renderChart(this.dataSet, this.options)
  },
  watch: {
    features: function() {
      this.renderChart(this.dataSet, this.options)
    }
  }
}
</script>
