<template>
  <div>
    <div class="container-main">
      <div class="sidebar" id="sidebar">
        <div class="logo-container">
          <img src="@/assets/logo.jpg" alt="Barangay Logo" class="logo" />
        </div>
        <div class="menu-items">
          <div class="menu-item">
            <router-link to="/healthcare">Dashboard</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/healthcare/children">Children Record</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/healthcare/pregnant">Pregnant Record</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/healthcare/household">Household Record</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/healthcare/inventory">Inventory Records</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/healthcare/settings">Settings</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/">Logout</router-link>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="header">
          <button class="menu-toggle" @click="toggleMenu">☰</button>
          <div class="header-title">Healthcare Management System</div>
          <div class="header-actions">
            <i class="bi bi-bell-fill" @click="toggleNotifications"></i>
            <i class="bi bi-person-circle" @click="toggleUserMenu"></i>

            <!-- Dropdowns -->
            <div v-if="showNotifications" class="dropdown">No new notifications</div>
            <div v-if="showMessages" class="dropdown">No new messages</div>
            <div v-if="showUserMenu" class="dropdown">
              <ul>
                <li @click="goToProfile">Profile</li>
                <li @click="logout">Logout</li>
              </ul>
            </div>
          </div>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue' // Adjust path if different

import '@/assets/dashboard.css'

export default {
  name: 'HealthCareLayout',
  components: {
    Calendar,
  },
  mounted() {
    // Optional logic
  },
  methods: {
    toggleMenu() {
      const sidebar = document.getElementById('sidebar')
      sidebar.classList.toggle('active')
    },
  },
}
</script>
