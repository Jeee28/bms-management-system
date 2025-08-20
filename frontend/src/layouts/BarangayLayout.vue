<template>
  <div>
    <div class="container-main">
      <div class="sidebar" id="sidebar">
        <div class="logo-container">
          <img src="@/assets/logo.jpg" alt="Barangay Logo" class="logo" />
        </div>
        <div class="menu-items">
          <div class="menu-item" @click="closeMenu">
            <router-link to="/barangay">Dashboard</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/barangay/issuance" @click="closeMenu">Issuance</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/barangay/record" @click="closeMenu">Request Record</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/barangay/appointment" @click="closeMenu"
              >Appointment Record</router-link
            >
          </div>
          <div class="menu-item">
            <router-link to="/barangay/availability" @click="closeMenu"
              >Captain Availability</router-link
            >
          </div>
          <div class="menu-item">
            <router-link to="/barangay/complaint" @click="closeMenu">Incident Report</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/barangay/inventory" @click="closeMenu">Inventory Record</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/barangay/settings" @click="closeMenu">Settings</router-link>
          </div>
          <div class="menu-item">
            <router-link to="/">Logout</router-link>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="header">
          <button class="menu-toggle" @click="toggleMenu">☰</button>
          <div class="header-title">Barangay Management System</div>
          <div class="header-actions">
            <i class="bi bi-bell-fill" @click="toggleNotifications"></i>
            <i class="bi bi-person-circle" @click="toggleUserMenu"></i>

            <!-- Dropdowns -->
            <div v-if="showNotifications" class="dropdown">No new notifications</div>
            <div v-if="showMessages" class="dropdown">No new messages</div>
            <div v-if="showUserMenu" class="dropdown">
              <ul>
                <li @click="goToProfile">Profile</li>
                <li>
                  <LogoutButton>Logout</LogoutButton>
                </li>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import '@/assets/dashboard.css'
import LogoutButton from '@/components/LogoutButton.vue'
export default {
  name: 'BarangayLayout',
  components: {
    Calendar,
  },
  setup() {
    const sidebarActive = ref(false)
    const sidebar = ref(null)

    const toggleMenu = () => {
      sidebarActive.value = !sidebarActive.value
    }

    const closeMenu = () => {
      sidebarActive.value = false
    }

    const handleClickOutside = (e) => {
      if (sidebar.value && !sidebar.value.contains(e.target) && !e.target.closest('.menu-toggle')) {
        closeMenu()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      sidebarActive,
      sidebar,
      toggleMenu,
      closeMenu,
    }
  },
}
</script>
