<template>
  <div class="input-group">
    <label :for="name" class="label">{{ label }}:</label>
    <!-- The dropdown menu -->
    <select
      :id="name"
      v-model="selectedCurrency"
      class="select"
      @change="updateCurrency"
    >
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    // The name of the input field
    name: {
      type: String,
      required: true
    },
    // The label for the input field
    label: {
      type: String,
      required: true
    },
    // The available currencies as array
    currencies: {
      type: Array as PropType<string[]>,
      required: true
    },
    // The currently selected currency
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selectedCurrency: this.value
    }
  },
  methods: {
    // This method is called when the value of the dropdown menu changes
    updateCurrency () {
      this.$emit('update:value', this.selectedCurrency)
    }
  },
  // This watcher reacts to changes in the 'value' prop
  watch: {
    value (newValue: string) {
      this.selectedCurrency = newValue
    }
  }
})
</script>

<style scoped>

</style>
