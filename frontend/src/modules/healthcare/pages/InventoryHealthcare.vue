<template>
  <div>
    <div class="dashboard-title" style="display: flex; justify-content: space-between">
      <h3>Inventory Record</h3>
      <div>
        <button class="btn btn-sm btn-primary text-white" @click="exportToExcel">
          <i class="bi bi-download"></i> Generate Reports
        </button>
        <router-link to="/inventory/add" class="btn btn-sm btn-success">
          <i class="bi bi-plus-circle"></i> Add Record
        </router-link>
      </div>
    </div>

    <div class="dashboard-content">
      <table ref="inventoryTable" class="table table-bordered text-start" style="width: 100%">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in records" :key="index">
            <td>{{ record.itemName }}</td>
            <td>{{ record.quantityItem }}</td>
            <td>{{ record.itemCategory }}</td>
            <td>{{ record.itemExpirydate }}</td>
            <td>
              <a href="#" @click.prevent="editRecord(index)">
                <i class="bi bi-pencil-square text-success fs-5 me-2" title="Edit"></i>
              </a>
              <a href="#" @click.prevent="deleteRecord(index)">
                <i class="bi bi-trash3 text-danger fs-5" title="Delete"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net-bs5'
import 'datatables.net'

export default {
  name: 'InventoryHealthcare',
  data() {
    return {
      records: [],
      dataTableInstance: null,
    }
  },
  mounted() {
    this.loadRecords()
    this.$nextTick(() => {
      this.initDataTable()
    })
  },
  methods: {
    loadRecords() {
      this.records = JSON.parse(localStorage.getItem('inventoryRecords')) || []
    },
    initDataTable() {
      // Only init once
      if (!this.dataTableInstance) {
        this.dataTableInstance = $(this.$refs.inventoryTable).DataTable()
      } else {
        // Update data without re-init
        this.dataTableInstance.clear()
        this.dataTableInstance.rows.add(this.records)
        this.dataTableInstance.draw(false)
      }
    },
    deleteRecord(index) {
      if (confirm('Are you sure you want to delete this record?')) {
        this.records.splice(index, 1)
        localStorage.setItem('inventoryRecords', JSON.stringify(this.records))
        this.initDataTable()
      }
    },
    editRecord(index) {
      localStorage.setItem('editIndex', index)
      this.$router.push('/inventory/edit')
    },
    exportToExcel() {
      alert('Export not implemented yet.')
    },
  },
}
</script>

<style>
@import 'https://cdn.datatables.net/2.2.2/css/dataTables.bootstrap5.css';
</style>
