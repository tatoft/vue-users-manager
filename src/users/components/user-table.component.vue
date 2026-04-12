<script setup>
import { ref, onMounted } from 'vue'
import UserModal from './user-modal.component.vue'
import UserForm from './user-form.component.vue'
import { UserService } from '../services/user.service'

const showModal = ref(false)
const userService = new UserService()
const users = ref([])
const loading = ref(false)

const fetchUsers = async () => {
  loading.value = true
  const data = await userService.getAll()
  //console.log(data)
  users.value = data
  loading.value = false
}

const addUser = (formData) => {
  userService.create(users.value, formData)
  showModal.value = false
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
        <UserForm @cancel="showModal = false" @submit="addUser" />
      </UserModal>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="w-8 h-8 border-3 border-[#1A388B] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Tabla -->
    <table v-else class="w-full text-sm table-fixed text-left">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-gray-900 font-semibold pb-3 pr-6">Name</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Username</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Email</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6">Phone</th>
          <th class="text-gray-900 font-semibold pb-3 pr-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b border-gray-100">
          <td class="text-gray-900 font-medium py-4 pr-6">{{ user.name }}</td>
          <td class="text-gray-500 py-4 pr-6">{{ user.username }}</td>
          <td class="text-gray-500 py-4 pr-6">{{ user.email }}</td>
          <td class="text-gray-500 py-4 pr-6">{{ user.phone }}</td>
          <td class="py-4 text-center space-x-3">
            <button class="text-[#1A388B]/90 hover:opacity-75 cursor-pointer">Edit</button>
            <button class="text-red-600 hover:opacity-75 cursor-pointer">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>



  </main>
</template>
