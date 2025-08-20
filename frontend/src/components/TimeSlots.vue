<template>
  <div class="slots">
    <h4>Select Time Slot</h4>
    <button v-for="slot in slots" :key="slot" @click="$emit('select-time', slot)">
      {{ slot }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slots: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
    }
  },
}
</script>

<style scoped>
.slots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background: #eee;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #cce5ff;
}
</style>
