<script setup>
defineProps({
  show: Boolean,
  title: String
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>
      <div class="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-900 font-semibold text-lg">{{ title }}</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- content -->
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
