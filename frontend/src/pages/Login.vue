<template>
  <div class="max-w-md mx-auto mt-20 p-6 shadow-lg bg-white rounded">
    <h2 class="text-xl font-bold mb-4">Login</h2>
    <form @submit.prevent="login">
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
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full"
        :disabled="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <div v-if="error" class="mt-3 text-red-600 text-sm">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Set axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    if (res.data.success) {
      const role = res.data.role
      console.log('ROLE FROM BACKEND:', role)

      // Store user data in localStorage (optional)
      localStorage.setItem('user', JSON.stringify(res.data))

      // Route based on role
      switch (role) {
        case 'Admin':
          router.push('/admin')
          break
        case 'Barangay Staff':
          router.push('/barangay')
          break
        case 'Health Staff':
          router.push('/healthcare')
          break
        default:
          error.value = 'Role not recognized'
      }
    } else {
      error.value = res.data.message || 'Login failed'
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || 'Login failed, please try again'
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  display: flex;
  width: 1000px;
  height: 600px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Left side - image */
.container .image-side {
  flex: 1;
  background: url('@/assets/login-bg.jpg') no-repeat center center;
  background-size: cover;
  border-radius: 5%;
}

/* Right side - login form */
.container .form-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-side img {
  width: 120px;
  margin-bottom: 20px;
  border-radius: 50%;
}

.form-side h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Input fields */
.form-side input {
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
}

/* Remember me + link */
.form-side .options {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
}

.form-side .options a {
  color: #1e90ff;
  text-decoration: none;
}

.form-side .options a:hover {
  text-decoration: underline;
}

/* Login button */
.form-side button {
  width: 100%;
  padding: 12px;
  background-color: #004aad;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.form-side button:hover {
  background-color: #00337a;
}

/* Register link */
.form-side .register {
  margin-top: 15px;
  font-size: 14px;
}

.form-side .register a {
  color: #004aad;
  text-decoration: none;
}

.form-side .register a:hover {
  text-decoration: underline;
}
</style>
