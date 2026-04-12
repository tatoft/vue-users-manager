<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'

const emit = defineEmits(['submit', 'cancel'])


const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: '',
      username: '',
      email: '',
      phone: ''
    })
  }
})

const form = {
  name: props.user?.name || '',
  username: props.user?.username || '',
  email: props.user?.email || '',
  phone: props.user?.phone || ''
}

const handleSubmit = (values) => {
  emit('submit', values)
}


</script>

<template>
  <Form :key="props.user?.id ?? 'new'" :initial-values="form" @submit="handleSubmit">
    <div class="flex flex-col gap-4">
      <div>
        <label class="form-label" for="name">Name</label>
        <Field id="name" name="name" rules="required" as="input" type="text" class="form-input"
          placeholder="Enter name" />
        <ErrorMessage name="name" class="text-red-400 text-xs mt-1" />
      </div>
      <div>
        <label class="form-label" for="username">Username</label>
        <Field id="username" name="username" rules="required" as="input" type="text" class="form-input"
          placeholder="Enter username" />
        <ErrorMessage name="username" class="text-red-400 text-xs mt-1" />
      </div>
      <div>
        <label class="form-label" for="email">Email</label>
        <Field id="email" name="email" rules="required|email" as="input" type="email" class="form-input"
          placeholder="Enter email" />
        <ErrorMessage name="email" class="text-red-400 text-xs mt-1" />
      </div>
      <div>
        <label class="form-label" for="phone">Phone</label>
        <Field id="phone" name="phone" rules="required" as="input" type="text" class="form-input"
          placeholder="Enter phone" />
        <ErrorMessage name="phone" class="text-red-400 text-xs mt-1" />
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <button type="button" @click="emit('cancel')" class="btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn-primary">
          Add
        </button>
      </div>
    </div>
  </Form>
</template>
