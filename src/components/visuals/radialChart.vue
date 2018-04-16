<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import {getFeatureColor} from '../../utils/index'
export default {
  name: 'RadialChart',
  props: ['width', 'height'],
  computed: {
    features () {
      return this.$store.state.filteredFeatureList
    },
    ctx () {
      return this.$refs.canvas.getContext('2d')
    }
  },
  methods: {
    draw () {
      this.features.forEach(feat => {
        let featIndex = feat.index

        feat.data.filter(i => i > 0).forEach((value, index) => {
          let x = this.$refs.canvas.width / 2
          let y = this.$refs.canvas.height / 2
          let size = 120 + (featIndex * 30)
          let unit = 2 * Math.PI / (feat.data.length + 2)
          let segment = unit * value
          let start = unit * index + 14.48 * (unit / 2) - (segment / 2)
          let end = start + segment
          this.arc(x, y, size, start, end, getFeatureColor(featIndex))
        })
      })
    },
    arc (x, y, size, start, end, color) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, start, end, false)
      this.ctx.lineWidth = 12
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    },
    clear () {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
  },
  mounted () {
    this.draw()
  },
  watch: {
    features: function () {
      this.clear()
      this.draw()
    }
  }
}
</script>

<style>
  .canvas-wrapper {
    position: relative;
    display: flex;
    left: 340px;
  }
</style>
