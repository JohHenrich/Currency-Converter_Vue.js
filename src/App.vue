<template>
  <div class="currency-converter">
    <h2 class="title">Currency Converter</h2>
    <!-- Amount input field -->
    <div class="input-group amount">
      <label for="amount" class="label">Amount:</label>
      <input type="number" id="amount" v-model.number="amount" class="input" />
    </div>
    <!-- From Currency dropdown -->
    <div class="input-group">
      <label for="fromCurrency" class="label">From Currency:</label>
      <select id="fromCurrency" v-model="fromCurrency" class="select">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
    <!-- To Currency dropdown -->
    <div class="input-group">
      <label for="toCurrency" class="label">To Currency:</label>
      <select id="toCurrency" v-model="toCurrency" class="select">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
    <!-- Convert button -->
    <button @click="convert" :disabled="isConverting" class="convert-btn">
      Convert
    </button>
    <!-- Loading indicator during conversion -->
    <div v-if="isConverting" class="loading-indicator">
      <div class="loader"></div>
      <span class="loading-text">Loading...</span>
    </div>
    <!-- Display converted amount -->
    <div v-if="convertedAmount !== null" class="result">
      Converted Amount: {{ convertedAmount }}
    </div>
    <!-- Error message on conversion error -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import './assets/main.css' // CSS styling for the user interface
import { defineComponent } from 'vue'
import { convert } from './services/convertService'

export default defineComponent({
  data () {
    return {
      amount: 0, // The amount to convert
      fromCurrency: 'USD', // The base currency
      toCurrency: 'EUR', // The target currency
      currencies: ['USD', 'EUR', 'GBP', 'JPY'], // Available currencies
      convertedAmount: null as number | null, // The converted amount (initially set to null)
      isConverting: false, // Flag to control the conversion process
      errorMessage: '' // Error message on conversion error
    }
  },
  methods: {
    /**
    * Perform the currency conversion.
    * If the input amount is valid, it calls the `convert` function from the service to get the converted amount.
    * If an error occurs during the conversion, it sets an error message.
    */
    async convert () {
      if (!this.isInputValid()) {
        this.errorMessage = 'Please enter a valid amount.'
        return
      }

      this.isConverting = true
      this.errorMessage = ''
      try {
        this.convertedAmount = await convert(this.amount, this.fromCurrency, this.toCurrency)
      } catch (error) {
        console.error(error)
        this.errorMessage = 'Failed to convert currencies.'
      }
      this.isConverting = false
    },
    /**
     * Check if the input amount is valid
     */
    isInputValid () {
      return Number.isFinite(this.amount) && this.amount >= 0
    }
  }
})

</script>
