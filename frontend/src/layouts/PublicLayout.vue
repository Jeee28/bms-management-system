<template>
  <div>
    <header class="bg-blue-700 text-white p-4">
      <nav class="flex justify-between max-w-6xl mx-auto">
        <div class="logo-container1">
          <img src="@/assets/logo.jpg" alt="Barangay Logo" class="logo" />
          <h1>Barangay Malabanban Norte Candelaria Quezon</h1>
          <button
            class="menu-toggle text-3xl md:hidden hover:bg-blue-900 p-2 rounded transition duration-300"
            @click="toggleMenu"
          >
            ☰
          </button>
        </div>
        <ul class="nav-links">
          <li>
            <router-link to="/" @click="closeMenu"><i class="fas fa-home"></i> Home</router-link>
          </li>
          <li>
            <router-link to="/news" @click="closeMenu"
              ><i class="fas fa-newspaper"></i> News</router-link
            >
          </li>
          <li>
            <router-link to="/complaint" @click="closeMenu"
              ><i class="fas fa-comment-dots"></i> Complaint</router-link
            >
          </li>
          <li>
            <router-link to="/appointment" @click="closeMenu"
              ><i class="fas fa-calendar-check"></i> Set Appointment</router-link
            >
          </li>
          <li>
            <router-link to="/request-documents" @click="closeMenu"
              ><i class="fas fa-file-alt"></i> Request Documents</router-link
            >
          </li>
          <li>
            <router-link to="/login" @click="closeMenu"
              ><i class="fas fa-sign-in-alt"></i> Login</router-link
            >
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import '@/assets/styles.css'
import '@/assets/menu.css'

import { onMounted, onBeforeUnmount } from 'vue'

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active')
}

function closeMenu() {
  document.querySelector('.nav-links').classList.remove('active')
}

function handleOutsideClick(event) {
  const navLinks = document.querySelector('.nav-links')
  const toggleButton = document.querySelector('.menu-toggle')

  if (navLinks && !navLinks.contains(event.target) && !toggleButton.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>
