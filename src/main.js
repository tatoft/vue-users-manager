import { createApp } from 'vue'
import App from './App.vue'

import { defineRule } from 'vee-validate'

// Regla required
defineRule('required', (value) => {
  if (!value || !value.length) return 'This field is required'
  return true
})

// Regla email
defineRule('email', (value) => {
  if (!value || !value.length) return true
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
    return 'This field must be a valid email'
  }
  return true
})

createApp(App).mount('#app')
