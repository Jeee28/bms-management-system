<template>
  <div class="dashboard-content">
    <h3>Add Healthcare Supply Record</h3>
    <fieldset>
      <legend>Healthcare Supply</legend>
      <label>Item name:</label>
      <input type="text" v-model="record.itemName" />

      <label>Quantity:</label>
      <input type="number" v-model="record.quantityItem" />

      <label>Category:</label>
      <input type="text" v-model="record.itemCategory" />

      <label>Expiry Date:</label>
      <input type="date" v-model="record.itemExpirydate" />

      <button class="btn btn-success mt-3" @click="saveRecord">Save</button>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'AddInventory',
  data() {
    return {
      record: {
        itemName: '',
        quantityItem: '',
        itemCategory: '',
        itemExpirydate: '',
      },
    }
  },
  methods: {
    saveRecord() {
      const records = JSON.parse(localStorage.getItem('inventoryRecords')) || []
      records.push(this.record)
      localStorage.setItem('inventoryRecords', JSON.stringify(records))
      this.$router.push('/inventory')
    },
  },
}
</script>
