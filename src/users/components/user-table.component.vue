<script setup>
import { ref, onMounted } from 'vue'
import UserModal from './user-modal.component.vue'
import UserForm from './user-form.component.vue'
import { UserService } from '../services/user.service'

const showModal = ref(false)
const loading = ref(false)
const userService = new UserService()
const users = ref([])
const selectedUser = ref(null)

const showConfirm = ref(false)
const userToDelete = ref(null)

const openEdit = (user) => {
  selectedUser.value = user
  showModal.value = true
}

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

const editUser = (formData) => {
  const updatedUser = { id: selectedUser.value.id, ...formData }
  userService.update(users.value, updatedUser)

  showModal.value = false
  selectedUser.value = null
}

const openDelete = (userId) => {
  userToDelete.value = userId
  showConfirm.value = true
}

const confirmDelete = () => {
  userService.delete(users.value, userToDelete.value)
  showConfirm.value = false
  userToDelete.value = null
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
      <UserModal :show="showModal" :title="selectedUser ? 'Edit User' : 'Add User'"
        @close="showModal = false; selectedUser = null">
        <UserForm :user="selectedUser" @cancel="showModal = false"
          @submit="selectedUser ? editUser($event) : addUser($event)" />
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
            <!-- al hacer click en Edit, abrimos el modal pero esta vez con los datos del usuario seleccionado -->
            <button class="text-[#1A388B]/90 hover:opacity-75 cursor-pointer" @click="openEdit(user)">Edit</button>
            <button class="text-red-600 hover:opacity-75 cursor-pointer" @click="openDelete(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal confirmación delete -->
    <UserModal :show="showConfirm" title="Eliminar Usuario" @close="showConfirm = false">
      <p class="text-gray-400 text-sm mb-6">¿Estás seguro de eliminar este usuario? Esta acción no se puede
        deshacer.</p>
      <div class="flex justify-end gap-3">
        <button @click="showConfirm = false" class="btn-secondary">
          Cancelar
        </button>
        <button @click="confirmDelete"
          class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:opacity-90 cursor-pointer">
          Eliminar
        </button>
      </div>
    </UserModal>
  </main>
</template>
