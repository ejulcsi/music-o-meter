<template>
  <div id="filter-menu">
    <header-title barmi="vala" menu="true"/>
    <div id="filter-wrapper">
      <h3>filter by:</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/header.vue'

export default {
  name: 'FilterMenu',
  components: {
    'header-title': HeaderTitle
  }
}
</script>

<style scoped>
  #filter-menu {
    position: absolute;
    width: 300px;
    height: 100%;
    min-height: 100vh;
    padding: 40px 20px 0;
    top: 0;
    left: 0;
    overflow-y: auto;
    background-color: rgba(19, 19, 23, 0.7);
    box-sizing: border-box;
  }

  #filter-wrapper {
    display: flex;
    flex-direction: column;
  }

  h3 {
    padding: 8px;
    font-size: 20px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 2px solid #f5f5f5;
  }
</style>
