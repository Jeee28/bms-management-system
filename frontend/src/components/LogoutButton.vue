<template>
  <button @click="handleLogout" class="logout-btn">
    <slot>Logout</slot>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  // Clear all saved session data
  localStorage.clear()

  // Redirect to homepage (PublicLayout)
  router.push('/')
}
</script>
