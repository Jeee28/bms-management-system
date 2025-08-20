<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <button @click="prevMonth">&lt;</button>
      <h2>{{ monthYear }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="day-name">{{ day }}</div>
      <div v-for="n in blanks" :key="'b' + n" class="day blank"></div>
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="{ today: isToday(day) }"
        @click="selectDate(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentDate: new Date(),
      selectedDay: null,
    }
  },
  computed: {
    monthYear() {
      return this.currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      })
    },
    daysInMonth() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth() + 1
      return new Date(year, month, 0).getDate()
    },
    blanks() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDay = new Date(year, month, 1).getDay()
      return Array(firstDay).fill(null)
    },
    weekDays() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1)
      this.currentDate = new Date(this.currentDate)
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1)
      this.currentDate = new Date(this.currentDate)
    },
    isToday(day) {
      const today = new Date()
      return (
        day === today.getDate() &&
        this.currentDate.getMonth() === today.getMonth() &&
        this.currentDate.getFullYear() === today.getFullYear()
      )
    },
    selectDate(day) {
      alert(`You clicked on ${day}`)
    },
  },
}
</script>

<style scoped>
.calendar-wrapper {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.day-name {
  font-weight: bold;
  text-align: center;
}
.day {
  text-align: center;
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
}
.today {
  background-color: #4caf50;
  color: white;
}
.blank {
  background-color: transparent;
}
</style>
