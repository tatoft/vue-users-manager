<script setup>
import { ref, onMounted } from 'vue'
import UserModal from './user-modal.component.vue'
import UserForm from './user-form.component.vue'
import { UserService } from '../services/user.service'

const showModal = ref(false)
const userService = new UserService()
const users = ref([])

const fetchUsers = async () => {
  const data = await userService.getAll()
  console.log(data)
  users.value = data
}

onMounted(() => {
  fetchUsers()
})

</script>

<template>
  <main class="max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-gray-900 text-lg font-semibold">Users</h2>
        <p class="text-gray-500 text-sm">List of all users</p>
      </div>
      <button @click="showModal = true" class="btn-primary">
        <p class="text-sm">Add User</p>
      </button>
      <!-- Modal -->
      <UserModal :show="showModal" title="Add User" @close="showModal = false">
        <UserForm @cancel="showModal = false" />
      </UserModal>
    </div>

    <!-- Table -->
    <table class="w-full text-sm text-left">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-gray-900 font-semibold pb-3 pr-6">Name</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Username</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Email</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Phone</th>
          <th class="pb-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-100">
          <td class="text-gray-900 font-medium py-4 pr-6"></td>
          <td class="text-gray-500 py-4 pr-6"></td>
          <td class="text-gray-500 py-4 pr-6"></td>
          <td class="text-gray-500 py-4 pr-6"></td>
          <td class="py-4 text-right space-x-3">

          </td>
        </tr>
      </tbody>
    </table>



  </main>
</template>
