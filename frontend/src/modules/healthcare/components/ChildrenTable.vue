<template>
  <div class="main-chart">
    <table id="childrenTable" class="table table-bordered border-dark display" style="width: 100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Gender</th>
          <th>Weight</th>
          <th>Height</th>
          <th>Age</th>
          <th>Parent</th>
          <th>Parent Address</th>
          <th>Parent Contact</th>
          <th>BMI</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>{{ record.childName }}</td>
          <td>{{ record.birthDate }}</td>
          <td>{{ record.address }}</td>
          <td>{{ record.contact }}</td>
          <td>{{ record.gender }}</td>
          <td>{{ record.weight }}</td>
          <td>{{ record.height }}</td>
          <td>{{ record.age }}</td>
          <td>{{ record.parentName }}</td>
          <td>{{ record.parentAddress }}</td>
          <td>{{ record.parentContact }}</td>
          <td>{{ record.bmi }}</td>
          <td>
            <span :class="'badge bg-' + getStatusColor(record.status)">{{ record.status }}</span>
          </td>
          <td>
            <i class="bi bi-eye text-primary fs-5" @click="$emit('view', index)"></i>
            <i class="bi bi-pencil-square text-success fs-5 ms-2" @click="$emit('edit', index)"></i>
            <i class="bi bi-trash3 text-danger fs-5 ms-2" @click="$emit('delete', index)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['records'],
  methods: {
    getStatusColor(status) {
      return (
        {
          'Severely Malnourished': 'dark',
          Malnourished: 'danger',
          Underweight: 'warning',
          Normal: 'success',
          Overweight: 'primary',
          Obese: 'info',
        }[status] || 'secondary'
      )
    },
  },
}
</script>
