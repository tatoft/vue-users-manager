<script setup>
import { ref } from 'vue'

defineEmits(['submit', 'cancel'])

const form = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-4">
      <div>
        <label class="form-label" for="name">Name</label>
        <input id="name" v-model="form.name" type="text" class="form-input" placeholder="Enter name" required>
      </div>
      <div>
        <label class="form-label" for="username">Username</label>
        <input id="username" v-model="form.username" type="text" class="form-input" placeholder="Enter username"
          required>
      </div>
      <div>
        <label class="form-label" for="email">Email</label>
        <input id="email" v-model="form.email" type="email" class="form-input" placeholder="Enter email" required>
      </div>
      <div>
        <label class="form-label" for="phone">Phone</label>
        <input id="phone" v-model="form.phone" type="text" class="form-input" placeholder="Enter phone" required>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-3 pt-2">
        <button type="button" @click="emit('cancel')" class="btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn-primary">
          Add
        </button>
      </div>
    </div>
  </form>
</template>
