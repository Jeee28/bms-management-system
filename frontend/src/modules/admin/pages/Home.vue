<template>
  <div class="admin-home">
    <h1>Welcome, Admin!</h1>
    <p>Use the sidebar to manage the system.</p>

    <div class="cards">
      <div class="card">
        <h3>Create Accounts</h3>
        <p>Add new Barangay or Health staff users.</p>
        <router-link to="/admin/create-user">Go →</router-link>
      </div>
      <div class="card">
        <h3>Barangay Dashboard</h3>
        <p>View and manage Barangay records.</p>
        <router-link to="/barangay">Go →</router-link>
      </div>
      <div class="card">
        <h3>Health Dashboard</h3>
        <p>View and manage healthcare records.</p>
        <router-link to="/healthcare">Go →</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-home {
  padding: 20px;
}
.admin-home h1 {
  margin-bottom: 10px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card h3 {
  margin-bottom: 10px;
}
.card a {
  display: inline-block;
  margin-top: 10px;
  color: #004aad;
  font-weight: bold;
  text-decoration: none;
}
</style>
