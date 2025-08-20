<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-800 text-white p-4">
      <h2 class="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul class="space-y-3">
          <li><router-link to="/admin" class="hover:underline">Home</router-link></li>
          <li>
            <router-link to="/admin/create-user" class="hover:underline"
              >Create Account</router-link
            >
          </li>
          <li>
            <router-link to="/admin/news"> New Update </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-100 p-6">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <!-- Here the child page will be displayed -->
      <router-view />
    </main>
  </div>
</template>

<script>
import '@/assets/dashboard.css'
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #004aad;
  color: white;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 12px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.content {
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
}
</style>
