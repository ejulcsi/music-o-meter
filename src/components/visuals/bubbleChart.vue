<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import {getFeatureColor} from '../../utils/index'

export default {
  name: 'BubbleChart',
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
          let size = this.width / 40
          let x = (index * size * 2) + size
          let y = (featIndex * size * 2) + size
          let color = getFeatureColor(featIndex)
          this.circle(x, y, size * value, color)
        })
      })
    },
    circle (x, y, size, color) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, 2 * Math.PI)
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
