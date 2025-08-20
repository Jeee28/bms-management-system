<template>
  <div class="availability">
    <h2>Set Availability</h2>
    <input type="date" v-model="selectedDate" />
    <div class="slots">
      <label v-for="slot in allSlots" :key="slot">
        <input type="checkbox" :value="slot" v-model="selectedSlots" />
        {{ slot }}
      </label>
    </div>
    <button @click="saveAvailability">Save Availability</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '',
      selectedSlots: [],
      allSlots: [
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
      ],
    }
  },
  methods: {
    saveAvailability() {
      const data = JSON.parse(localStorage.getItem('availability') || '{}')
      data[this.selectedDate] = this.selectedSlots
      localStorage.setItem('availability', JSON.stringify(data))
      alert('Availability saved.')
    },
  },
}
</script>

<style scoped>
.availability {
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}
.slots {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
