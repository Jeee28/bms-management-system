<template>
  <div class="dashboard-content">
    <div class="dashboard-title" style="display: flex; justify-content: space-between">
      <h3>Children Record</h3>
      <div>
        <button class="btn btn-sm btn-primary text-white" @click="exportToExcel">
          <i class="bi bi-download"></i> Generate Reports
        </button>
        <router-link to="/healthcare/children/add" class="btn btn-sm btn-success">
          <i class="bi bi-plus-circle"></i> Add Record
        </router-link>
      </div>
    </div>

    <ChildrenTable
      :records="records"
      @delete="deleteRecord"
      @view="viewRecord"
      @edit="editRecord"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useChildrenStore } from '@/stores/childrenStore'
import ChildrenTable from '@/modules/healthcare/components/ChildrenTable.vue'
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import '@/assets/dashboard.css'
export default {
  components: { ChildrenTable },
  setup() {
    const store = useChildrenStore()
    const records = ref([])
    const router = useRouter()

    onMounted(() => {
      store.loadRecords()
      records.value = store.records
    })

    const deleteRecord = (index) => {
      store.deleteRecord(index)
      records.value = store.records
    }

    const viewRecord = (index) => {
      store.setViewIndex(index)
      router.push('/healthcare/children/view')
    }

    const editRecord = (index) => {
      store.setEditIndex(index)
      localStorage.setItem('editIndex', index) // <-- Add this line
      router.push('/healthcare/children/edit')
    }

    const exportToExcel = () => {
      if (records.value.length === 0) return alert('No records to export.')
      const data = records.value.map((r) => ({
        'Child Name': r.childName,
        'Birth Date': r.birthDate,
        Address: r.address,
        'Contact No.': r.contact,
        Gender: r.gender,
        'Weight (kg)': r.weight,
        'Height (cm)': r.height,
        Age: r.age,
        'Parent Name': r.parentName,
        'Parent Address': r.parentAddress,
        'Parent Contact': r.parentContact,
        BMI: r.bmi,
        Status: r.status,
      }))
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Children Records')
      const dateStr = new Date().toISOString().split('T')[0]
      XLSX.writeFile(workbook, `Children_Records_Report_${dateStr}.xlsx`)
    }

    return { records, deleteRecord, viewRecord, editRecord, exportToExcel }
  },
}
</script>
