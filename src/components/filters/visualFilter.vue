<template>
  <div>
    <p>visual</p>
    <ul id="visual-filters">
      <li v-for="(item, index) in visuals"
          :key="index"
          :data-visual="item"
          :class="{selected: selectedVisual === item}"
          @click="selectVisual">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VisualFilter',
  data () {
    return {
      visuals: ['radial', 'mandala', 'bubble', 'polygon']
    }
  },
  computed: {
    selectedVisual() {
      return this.$store.state.selectedVisual
    }
  },
  methods: {
    selectVisual (event) {
      const visual = event.target.getAttribute('data-visual')

      if (visual !== this.selectedVisual) {
        this.$store.commit('setSelectedVisual', visual)
      }
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 20px;
    font-weight: 700;
  }
  #visual-filters {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #visual-filters li {
    padding: 10px;
    margin-right: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #ff1b73;
    transition: background-color 0.4s;
  }

  #visual-filters li:hover,
  #visual-filters li.selected {
    background-color: rgba(255, 27, 115, 0.3);
  }
</style>
