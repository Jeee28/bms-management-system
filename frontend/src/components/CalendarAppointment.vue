<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <div>{{ monthYear }}</div>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="grid">
      <div
        class="day"
        v-for="day in daysInMonth"
        :key="day"
        @click="$emit('select-date', formatDate(day))"
      >
        {{ day.getDate() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const today = new Date()
    return {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
    }
  },
  computed: {
    daysInMonth() {
      const days = []
      const date = new Date(this.currentYear, this.currentMonth, 1)
      while (date.getMonth() === this.currentMonth) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
      }
      return days
    },
    monthYear() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      })
    },
  },
  methods: {
    prevMonth() {
      this.currentMonth--
      if (this.currentMonth < 0) {
        this.currentMonth = 11
        this.currentYear--
      }
    },
    nextMonth() {
      this.currentMonth++
      if (this.currentMonth > 11) {
        this.currentMonth = 0
        this.currentYear++
      }
    },
    formatDate(date) {
      return date.toISOString().split('T')[0]
    },
  },
}
</script>

<style scoped>
.calendar {
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}
.day {
  padding: 0.5rem;
  background: #eee;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
}
.day:hover {
  background: #cce5ff;
}
</style>
