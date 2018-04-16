<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import {getFeatureColor} from '../../utils/index'

export default {
  name: 'MandalaChart',
  props: ['chartData', 'width', 'height'],
  computed: {
    features () {
      return this.$store.state.filteredFeatureList
    },
    ctx () {
      return this.$refs.canvas.getContext('2d')
    },
    center () {
      return {
        x: this.$refs.canvas.width / 2,
        y: this.$refs.canvas.height / 2
      }
    }
  },
  methods: {
    draw () {
      this.features.forEach(feat => {
        let featIndex = feat.index

        feat.data.forEach((value, index) => {
          let initRad = 80
          let size = 2 * Math.PI * initRad / 40
          let radius = initRad + (featIndex * (size + 20))
          this.arc(radius, index, size * value, getFeatureColor(featIndex))
        })
      })
    },
    ring (n, radius) {
      let points = []
      let len = n + 2
      for (let i = 1; i <= len; i++) {
        let angle = (2 * Math.PI * i / len) + 1.73
        let pos = {
          x: Math.cos(angle) * radius + this.center.x,
          y: Math.sin(angle) * radius + this.center.y
        }
        points.push(pos)
      }

      return points
    },
    arc (ringSize, index, size, color) {
      const ringPoints = this.ring(20, ringSize)[index]
      const pos = {
        x: ringPoints.x,
        y: ringPoints.y
      }
      this.ctx.beginPath()
      this.ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = color
      this.ctx.fill()
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
