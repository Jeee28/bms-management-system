<template>
  <div class="bg-white shadow-md p-4 rounded w-full max-w-lg">
    <h2 class="text-xl mb-4">Create Staff Account</h2>
    <form @submit.prevent="createAccount">
      <input v-model="name" placeholder="Full Name" class="w-full border p-2 mb-3" required />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 mb-3"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border p-2 mb-3"
        required
        minlength="6"
      />

      <select v-model="role" class="w-full border p-2 mb-3" required>
        <option value="barangay">Barangay Staff</option>
        <option value="health">Health Staff</option>
        <option value="admin">Admin</option>
      </select>

      <button class="bg-green-600 text-white px-4 py-2 rounded w-full" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Account' }}
      </button>
    </form>

    <div v-if="message" :class="messageClass" class="mt-3 text-sm">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('barangay')
const loading = ref(false)
const message = ref('')
const messageClass = ref('')

// Set axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

const createAccount = async () => {
  loading.value = true
  message.value = ''

  try {
    const res = await axios.post('/api/auth/create-user', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    })

    message.value = 'Account created successfully!'
    messageClass.value = 'text-green-600'

    // Reset form
    name.value = ''
    email.value = ''
    password.value = ''
    role.value = 'barangay'
  } catch (err) {
    console.error('Create account error:', err)
    message.value =
      err.response?.data?.error || err.response?.data?.message || 'Error creating account'
    messageClass.value = 'text-red-600'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-user {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}
input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button {
  background: #004aad;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #00347a;
}
.message {
  margin-top: 15px;
  font-weight: 600;
}
</style>
