<template>
  <div class="dashboard">
    <!-- Dashboard Overview -->
    <h2 class="overview-title">Dashboard Overview</h2>
    <div class="cards">
      <div @click="goTo('population')" class="card">
        <p>Population</p>
        <h3>13,234</h3>
      </div>
      <div @click="goTo('appointments')" class="card clickable">
        <p><u>Appointments</u></p>
        <h3>5 Today</h3>
      </div>
      <div @click="goTo('incidents')" class="card clickable">
        <p><u>Incident Reports</u></p>
        <h3>12</h3>
      </div>
      <div @click="goTo('inventory')" class="card clickable">
        <p><u>Inventory Items</u></p>
        <h3>47</h3>
      </div>
      <div @click="goTo('record')" class="card clickable">
        <p><u>Request documents</u></p>
        <h3>20</h3>
      </div>
    </div>

    <div class="bottom-grid">
      <Calendar />

      <div class="panel">
        <h3>Recent Activity</h3>
        <ul>
          <li>Juan dela Cruz submitted an appointment request.</li>
          <li>Inventory item ID #24 was marked as resolved</li>
          <li>Added 50 units to ‘Rice’ inventory item</li>
        </ul>
      </div>

      <div class="panel">
        <h3>Notifications</h3>
        <ul>
          <li>🔔 Appointment reminder for April 25, 2024</li>
          <li>📦 Inventory item ‘Medicine A’ is running low</li>
          <li>📄 New Incident report submitted: Noise com</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
export default {
  name: 'BarangayLayout',
  methods: {
    goTo(moduleName) {
      this.$router.push(`/${moduleName}`)
    },
  },
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.icon {
  font-size: 20px;
  cursor: pointer;
}
.user {
  display: flex;
  align-items: center;
  gap: 8px;
}
.avatar {
  background: #ccc;
  border-radius: 50%;
  padding: 5px 10px;
}

/* Overview title */
.overview-title {
  margin-top: 20px;
}

/* Cards */
.cards {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 180px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}

/* Bottom section */
.bottom-section {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.calendar,
.recent-activity,
.notifications {
  background: white;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.calendar table {
  width: 100%;
  border-collapse: collapse;
}
.calendar th,
.calendar td {
  text-align: center;
  padding: 5px;
}
.calendar .active {
  background: black;
  color: white;
  border-radius: 50%;
}
</style>
