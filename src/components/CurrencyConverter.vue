<template>
  <div class="currency-converter">
    <h2 class="title">Currency Converter</h2>
    <!-- Amount input field -->
    <currencyInput v-model="amount" />
    <!-- From Currency dropdown -->
    <CurrencySelect
      :currencies="currencies"
      name="currency-select"
      label="Select Currency"
      v-model:value="fromCurrency"
    />
    <!-- To Currency dropdown -->
    <CurrencySelect
      name="currency-select"
      label="Select Currency"
      :currencies="currencies"
      v-model:value="toCurrency"
    />
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
import { defineComponent } from 'vue'
import CurrencyInput from './CurrencyInput.vue'
import CurrencySelect from './CurrencySelect.vue'
import { convert } from '../services/convertService'

export default defineComponent({
  components: {
    CurrencyInput,
    CurrencySelect
  },

  data () {
    return {
      // The initial values for the data properties
      amount: 1,
      fromCurrency: '',
      toCurrency: '',
      isConverting: false,
      convertedAmount: null as number | null,
      errorMessage: ''
    }
  },

  computed: {
    // A computed property for the currencies array
    currencies (): string[] {
      return ['USD', 'EUR', 'GBP', 'JPY', 'CAD']
    }
  },

  methods: {
    /**
     * Perform the currency conversion.
     * If the input amount is valid, it calls the `convert` function from the service to get the converted amount.
     * If an error occurs during the conversion, it sets an error message.
     */
    async convert (): Promise<void> {
      if (!this.isInputValid()) {
        this.errorMessage = 'Please enter a valid amount.'
        return
      }
      console.log(this.fromCurrency)
      this.isConverting = true
      this.errorMessage = ''
      try {
        // Call the `convert` function to get the converted amount
        this.convertedAmount = await convert(
          this.amount,
          this.fromCurrency,
          this.toCurrency
        )
      } catch (error) {
        this.errorMessage = 'Failed to convert currencies.'
      }
      this.isConverting = false
    },

    /**
     * Check if the input amount is valid
     */
    isInputValid (): boolean {
      return Number.isFinite(this.amount) && this.amount >= 0
    }
  }
})
</script>

<style scoped>
.currency-converter {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.convert-btn {
  display: block;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.convert-btn:hover {
  background-color: #0062cc;
}

.loading-indicator {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-left: 10px;
}

.result {
  margin-top: 10px;
  font-weight: bold;
}

.error-message {
  margin-top: 10px;
  color: red;
}
</style>
