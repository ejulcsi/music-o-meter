<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import {getFeatureColor} from '../../utils/index'

export default {
  name: 'PolyChart',
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

        feat.data.forEach((value, index) => {
          let size = this.width / 40
          let x = (index * size * 2) + size
          let y = (featIndex * size * 2) + size
          let color = getFeatureColor(featIndex)
          this.polygon(x, y, 7, size * value, color)
        })
      })
    },
    ring (x, y, size, n) {
      let points = []

      for (let i = 1; i <= n; i++) {
        let pos = {
          x: Math.cos(2 * Math.PI * i / n) * size + x,
          y: Math.sin(2 * Math.PI * i / n) * size + y
        }
        points.push(pos)
      }

      return points
    },

    polygon (x, y, points, length, color) {
      const positions = this.ring(x, y, length, points)

      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
      for (let i = 0; i < positions.length; i++) {
        this.ctx.lineTo(positions[i].x, positions[i].y)
      }
      this.ctx.lineTo(positions[0].x, positions[0].y)
      this.ctx.fillStyle = color
      this.ctx.fill()
      this.ctx.closePath()
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
