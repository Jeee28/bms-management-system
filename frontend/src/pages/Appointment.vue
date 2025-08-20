<template>
  <div class="p-4 max-w-lg mx-auto bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Book Appointment</h2>

    <!-- Appointment Status -->
    <div v-if="appointment" class="p-3 border rounded mb-3">
      <p><strong>Status:</strong> {{ appointment.status }}</p>
      <p><strong>Time:</strong> {{ appointment.time }}</p>
      <button
        v-if="appointment.status === 'Pending' || appointment.status === 'Confirmed'"
        @click="cancelBooking"
        class="bg-red-500 text-white px-3 py-1 rounded mt-2"
      >
        Cancel
      </button>
    </div>

    <!-- Cooldown Notice -->
    <div v-if="cooldownEnd" class="p-3 border rounded bg-yellow-100 text-center mb-3">
      <p class="font-semibold text-red-600">
        Appointment Cancelled. Please wait {{ timeLeft }} to book again.
      </p>
    </div>

    <!-- Confirmation -->
    <div v-if="confirmation" class="p-3 border rounded bg-gray-50">
      <h3 class="font-semibold">Confirm your booking</h3>
      <p>Name: {{ confirmation.name }}</p>
      <p>Contact: {{ confirmation.contact }}</p>
      <p>Date: {{ confirmation.date }}</p>
      <p>Time: {{ confirmation.time }}</p>
      <button @click="confirmBooking" class="bg-green-500 text-white px-3 py-1 rounded mr-2">
        OK
      </button>
      <button @click="confirmation = null" class="bg-gray-400 text-white px-3 py-1 rounded">
        Cancel
      </button>
    </div>

    <!-- Booking Form -->
    <form v-else @submit.prevent="submitBooking" v-if="!cooldownEnd">
      <input v-model="form.name" placeholder="Your Name" class="border p-2 w-full mb-2" />
      <input v-model="form.contact" placeholder="Phone or Email" class="border p-2 w-full mb-2" />
      <input
        type="date"
        v-model="form.date"
        :min="today"
        @change="fetchSlots"
        class="border p-2 w-full mb-2"
      />
      <select v-model="form.time" class="border p-2 w-full mb-2">
        <option disabled value="">Select Time</option>
        <option v-for="s in slots" :key="s.time" :value="s.time" :disabled="!s.available">
          {{ s.time }} - {{ s.available ? 'Available' : 'Unavailable' }}
        </option>
      </select>
      <input type="file" @change="handlePhoto" class="border p-2 w-full mb-2" />
      <button type="submit" class="bg-blue-500 text-white px-3 py-2 rounded w-full">
        Book Appointment
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const form = reactive({
  name: '',
  contact: '',
  date: '',
  time: '',
  photo: null,
})

const slots = ref([])
const confirmation = ref(null)
const appointment = ref(null)

// Countdown
const cooldownEnd = ref(null)
const timeLeft = ref('')

// Update timer every second
let timerInterval = null
const startCountdown = (endTime) => {
  cooldownEnd.value = endTime
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = cooldownEnd.value - now
    if (distance <= 0) {
      timeLeft.value = ''
      cooldownEnd.value = null
      clearInterval(timerInterval)
      timerInterval = null
    } else {
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((distance / (1000 * 60)) % 60)
      const seconds = Math.floor((distance / 1000) % 60)
      timeLeft.value = `${hours}h ${minutes}m ${seconds}s`
    }
  }, 1000)
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const today = new Date().toISOString().split('T')[0]

// Fetch slots when date selected
const fetchSlots = async () => {
  if (!form.date) return
  const res = await axios.get(`http://localhost:5000/api/availability/${form.date}`)
  slots.value = res.data.slots
}

const handlePhoto = (e) => {
  form.photo = e.target.files[0]
}

const submitBooking = async () => {
  if (!form.name || !form.contact || !form.date || !form.time) {
    alert('Please fill all fields')
    return
  }
  confirmation.value = { ...form }
}

const confirmBooking = async () => {
  const data = new FormData()
  data.append('name', form.name)
  data.append('contact', form.contact)
  data.append('date', form.date)
  data.append('time', form.time)
  if (form.photo) data.append('photo', form.photo)

  const res = await axios.post('http://localhost:5000/api/book', data)
  appointment.value = res.data.appointment
  confirmation.value = null
  alert('Thank you for booking. Status: Pending')
}

const cancelBooking = async () => {
  if (!appointment.value) return
  if (
    confirm('Are you sure you want to cancel your appointment? You can book again after 24 hours.')
  ) {
    await axios.post(`http://localhost:5000/api/cancel/${appointment.value._id}`)
    appointment.value.status = 'Cancelled'

    // Start 24-hour cooldown
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000
    localStorage.setItem('cooldownEnd', endTime)
    startCountdown(endTime)
  }
}

// Restore cooldown if page refreshed
onMounted(() => {
  const savedEnd = localStorage.getItem('cooldownEnd')
  if (savedEnd && savedEnd > Date.now()) {
    startCountdown(Number(savedEnd))
  }
})
</script>
