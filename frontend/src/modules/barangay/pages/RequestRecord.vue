<template>
  <div class="request-records">
    <h2>Barangay Document Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Document Type</th>
          <th>Date Requested</th>
          <th>Status</th>
          <th>Files</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" :key="request.id">
          <td>{{ request.name }}</td>
          <td>{{ request.address }}</td>
          <td>{{ request.documentType }}</td>
          <td>{{ new Date(request.dateRequested).toLocaleString() }}</td>
          <td>{{ request.status }}</td>
          <td>
            <div v-for="file in request.files" :key="file.fileName">
              <a :href="file.url" target="_blank">View {{ file.fileName }}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requests: [],
    }
  },
  async mounted() {
    const res = await fetch('/api/barangay/requests')
    const data = await res.json()
    this.requests = data
  },
}
</script>

<style>
.request-records {
  padding: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
