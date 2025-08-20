<template>
  <div class="dashboard-title" style="display: flex; justify-content: space-between">
    <h3>Add Record</h3>
  </div>

  <div class="dashboard-content">
    <div class="main-chart">
      <div class="container">
        <fieldset>
          <legend>Child Information</legend>
          <label>Children name:</label>
          <input v-model="form.childName" type="text" />

          <label>Birth Date:</label>
          <input v-model="form.birthDate" type="date" />

          <label>Address:</label>
          <input v-model="form.address" type="text" />

          <label>Contact no.:</label>
          <input v-model="form.contact" type="tel" />

          <div class="form-row">
            <div>
              <label for="gender">Gender:</label>
              <select v-model="selectedGender" id="gender">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label>Weight (kg):</label>
              <input v-model.number="form.weight" type="number" />
            </div>
          </div>

          <div class="form-row">
            <div>
              <label>Height (cm):</label>
              <input v-model.number="form.height" type="number" />
            </div>
            <div>
              <label>Age:</label>
              <input v-model.number="form.age" type="number" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Parent Information</legend>
          <label>Name:</label>
          <input v-model="form.parentName" type="text" />

          <label>Address:</label>
          <input v-model="form.parentAddress" type="text" />

          <label>Contact:</label>
          <input v-model="form.parentContact" type="text" />
        </fieldset>

        <button @click="saveRecord" class="btn btn-success mt-3">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        childName: '',
        birthDate: '',
        address: '',
        contact: '',
        selectedGender: '',
        weight: '',
        height: '',
        age: '',
        parentName: '',
        parentAddress: '',
        parentContact: '',
      },
      editIndex: null,
    }
  },
  computed: {
    bmi() {
      const weight = parseFloat(this.form.weight)
      const height = parseFloat(this.form.height) / 100
      if (!weight || !height) return 0
      return (weight / (height * height)).toFixed(1)
    },
    status() {
      const bmi = parseFloat(this.bmi)
      if (bmi < 14) return 'Severely Malnourished'
      else if (bmi < 16) return 'Malnourished'
      else if (bmi < 18.5) return 'Underweight'
      else if (bmi < 25) return 'Normal'
      else if (bmi < 30) return 'Overweight'
      else if (bmi < 40) return 'Obese'
      else return 'Undefined'
    },
  },
  mounted() {
    const index = localStorage.getItem('editIndex')
    if (index !== null) {
      this.editIndex = parseInt(index)
      const records = JSON.parse(localStorage.getItem('childrenRecords')) || []
      const record = records[this.editIndex]
      if (record) {
        this.form = { ...record }
      }
    }
  },
  methods: {
    saveRecord() {
      const newRecord = {
        ...this.form,
        bmi: this.bmi,
        status: this.status,
      }

      let records = JSON.parse(localStorage.getItem('childrenRecords')) || []

      if (this.editIndex !== null) {
        records[this.editIndex] = newRecord
        localStorage.removeItem('editIndex')
      } else {
        records.push(newRecord)
      }

      localStorage.setItem('childrenRecords', JSON.stringify(records))
      this.$router.push('/healthcare/children') // adjust route if needed
    },
  },
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 700px;
  margin: auto;
  border: 1px solid #aaa;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2,
h3 {
  background-color: #003366;
  color: white;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  margin-bottom: 20px;
}

fieldset {
  border: 2px solid #003366;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
}

legend {
  font-weight: bold;
  color: white;
  background: #003366;
  padding: 4px 12px;
  border-radius: 4px;
}

label {
  display: block;
  margin-top: 12px;
  margin-bottom: 6px;
  font-weight: 600;
}

input[type='text'],
input[type='date'],
input[type='tel'],
input[type='number'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.form-row div {
  flex: 1;
}

.save-btn,
.btn-success {
  float: right;
  background: #3366cc;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
}

.save-btn:hover,
.btn-success:hover {
  background: #254a9e;
}
</style>
