<template>
  <div id="app">
    <CurrencyConverter />
  </div>
</template>

<script lang="ts">
import CurrencyConverter from './components/CurrencyConverter.vue'

export default {
  name: 'App',
  components: {
    CurrencyConverter
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
}
</style>
