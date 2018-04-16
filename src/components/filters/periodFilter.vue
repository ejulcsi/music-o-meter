<template>
  <div>
    <p>time range</p>
    <ul class="period-list">
      <li
        :key="index"
        v-for="(item, index) in periods"
        @click="filterPeriod"
        :class="{'selected':(item.value === 'short')}"
      :data-period="item.value">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Periods',
  props: ['api'],
  data () {
    return {
      periods: [
        {
          value: 'short',
          text: 'last month'
        },
        {
          value: 'medium',
          text: 'last 6 months'
        },
        {
          value: 'long',
          text: 'several years'
        }
      ]
    }
  },
  methods: {
    filterPeriod (event) {
      let period = event.target.getAttribute('data-period')

      if (this.api === 'artists') {
        this.$store.dispatch('getArtistList', period)
      }

      if (this.api === 'tracks') {
        this.$store.dispatch('getTrackList', period)
      }

      this.setStyle(event.target)
    },
    setStyle (el) {
      const allFilters = document.querySelectorAll('.period-list li')
      allFilters.forEach(item => item.classList.remove('selected'))
      el.classList.add('selected')
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 20px;
    font-weight: 700;
  }

  .period-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 0;
    padding: 20px 0;
    list-style: none;
  }

  .period-list li {
    position: relative;
    padding: 3px 6px;
    margin: 0 5px 10px;
    border: 1px solid #d7ff5b;
    cursor: pointer;
  }

  .period-list li::after {
    position: absolute;
    content: '';
    width: 100%;
    max-width: 0;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(215, 255, 91, 0.3);
    transition: max-width .4s, opacity .4s;
  }

  .period-list li:hover::after {
    max-width: 100%;
    opacity: 1;
  }

  .period-list li.selected {
    background: rgba(215, 255, 91, 0.3);
  }
</style>
