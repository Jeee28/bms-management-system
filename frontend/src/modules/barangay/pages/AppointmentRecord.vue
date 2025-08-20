<template>
  <div class="records">
    <h2>Appointment Records</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Service</th>
          <th>Date</th>
          <th>Time</th>
          <th>Photo</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appt, index) in appointments" :key="index">
          <td>{{ appt.name }}</td>
          <td>{{ appt.email }}</td>
          <td>{{ appt.service }}</td>
          <td>{{ appt.date }}</td>
          <td>{{ appt.time }}</td>
          <td>
            <button @click="viewPhoto(appt.photo)">View Photo</button>
          </td>
          <td>
            <select v-model="appt.status" @change="update(index)">
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
              <option value="Canceled">Canceled</option>
            </select>
          </td>
          <td>
            <button @click="update(index)">Update</button>

            <button @click="remove(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for photo preview -->
    <div v-if="photoToView" class="modal" @click.self="photoToView = null">
      <div class="modal-content">
        <img :src="photoToView" alt="Appointment Photo" />
        <button @click="photoToView = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
      photoToView: null,
    }
  },
  created() {
    this.loadAppointments()
  },
  methods: {
    async loadAppointments() {
      try {
        const res = await fetch('http://localhost:5000/api/appointments')
        this.appointments = await res.json()
      } catch (err) {
        console.error('Error loading appointments', err)
      }
    },
    async update(index) {
      try {
        const appt = this.appointments[index]
        await fetch(`http://localhost:5000/api/appointments/${appt.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: appt.status }),
        })
        alert('Status updated')
      } catch (err) {
        console.error('Error updating appointment', err)
      }
    },
    async remove(index) {
      if (confirm('Are you sure you want to delete this appointment?')) {
        const appt = this.appointments[index]
        try {
          await fetch(`http://localhost:5000/api/appointments/${appt.id}`, {
            method: 'DELETE',
          })
          this.appointments.splice(index, 1)
        } catch (err) {
          console.error('Error deleting appointment', err)
        }
      }
    },
    viewPhoto(photoUrl) {
      this.photoToView = photoUrl
    },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}
button {
  margin: 2px;
}

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  text-align: center;
}
.modal-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
