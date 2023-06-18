<template>
  <div class="input-group">
    <label class="label">Amount:</label>
    <input
      type="number"
      id="amount"
      class="input"
      :value="amount"
      @input="updateAmount($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // The model value for the amount
    modelValue: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // The amount is stored in the data section
      amount: this.modelValue
    }
  },
  methods: {
    // This method is called when the input value changes
    updateAmount (event: Event) {
      const target = event.target as HTMLInputElement | null
      if (target) {
        const value = target.value
        // Update the amount with the parsed float value
        this.amount = parseFloat(value)
        // Trigger the 'update:modelValue' event and pass the updated amount
        this.$emit('update:modelValue', this.amount)
      }
    }
  }
})
</script>

<style scoped>
.input-group {
  margin-bottom: 10px;
}

.input {
  width: 95%;
}
</style>
