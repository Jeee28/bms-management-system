<template>
  <div class="dashboard-title">Dashboard</div>
  <div class="dashboard-content">
    <div class="main-chart"></div>
    <div class="dashboard-sidebar">
      <div class="calendar" id="calendar">
        <Calendar />
      </div>
      <div class="population-card">
        <div class="population-title">Population List:</div>
        <div class="population-count">12000</div>
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
      sidebar.classList.toggle('open')
    },
  },
}
</script>
