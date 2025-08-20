import { defineStore } from 'pinia'

export const useChildrenStore = defineStore('childrenStore', {
  state: () => ({
    records: [],
    editIndex: null,
    viewIndex: null,
  }),
  actions: {
    loadRecords() {
      this.records = JSON.parse(localStorage.getItem('childrenRecords')) || []
    },
    saveRecords() {
      localStorage.setItem('childrenRecords', JSON.stringify(this.records))
    },
    deleteRecord(index) {
      this.records.splice(index, 1)
      this.saveRecords()
    },
    setEditIndex(index) {
      this.editIndex = index
    },
    setViewIndex(index) {
      this.viewIndex = index
    },
    addRecord(record) {
      this.records.push(record)
      this.saveRecords()
    },
    updateRecord(index, updatedRecord) {
      this.records[index] = updatedRecord
      this.saveRecords()
    },
  },
})
