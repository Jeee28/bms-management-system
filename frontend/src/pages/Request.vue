<template>
  <div class="request-form">
    <h2>Barangay Document Request</h2>
    <form @submit.prevent="submitRequest">
      <!-- Always required fields -->
      <label>Full Name:</label>
      <input v-model.trim="form.name" required />

      <label>Address:</label>
      <input v-model.trim="form.address" required />

      <!-- Document type selection -->
      <label>Document Type:</label>
      <select v-model="selectedType" required>
        <option disabled value="">Select Document</option>
        <option v-for="type in Object.keys(documentFields)" :key="type">
          {{ type }}
        </option>
      </select>

      <!-- Dynamic fields -->
      <div v-if="selectedType">
        <div v-for="field in documentFields[selectedType]" :key="field.name">
          <label>{{ field.label }}:</label>

          <!-- Text -->
          <input
            v-if="field.type === 'text'"
            v-model.trim="form[field.name]"
            :required="field.required"
          />

          <!-- Date -->
          <input
            v-if="field.type === 'date'"
            type="date"
            v-model="form[field.name]"
            :required="field.required"
          />

          <!-- File -->
          <input
            v-if="field.type === 'file'"
            type="file"
            @change="(e) => handleFileUpload(e, field.name)"
            :required="field.required"
          />

          <!-- Textarea -->
          <textarea
            v-if="field.type === 'textarea'"
            v-model.trim="form[field.name]"
            :required="field.required"
          ></textarea>
        </div>
      </div>

      <button type="submit">Submit Request</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: '',
      form: { name: '', address: '' },
      documentFields: {
        'Barangay Clearance': [
          { name: 'birthdate', label: 'Birthdate', type: 'date', required: true },
          { name: 'purpose', label: 'Purpose', type: 'textarea', required: true },
          { name: 'idFile', label: 'Valid ID', type: 'file', required: true },
        ],
        'Certificate of Residency': [
          { name: 'yearsOfResidency', label: 'Years of Residency', type: 'text', required: true },
          { name: 'houseNumber', label: 'House Number', type: 'text', required: true },
          { name: 'idFile', label: 'Valid ID', type: 'file', required: true },
        ],
        'Certificate of Indigency': [
          { name: 'proofOfIncome', label: 'Proof of Income', type: 'file', required: true },
          { name: 'idFile', label: 'Valid ID', type: 'file', required: true },
        ],
        'Business Permit': [
          { name: 'businessName', label: 'Business Name', type: 'text', required: true },
          { name: 'businessAddress', label: 'Business Address', type: 'text', required: true },
          { name: 'mayorsPermit', label: "Mayor's Permit", type: 'file', required: true },
        ],
      },
    }
  },
  methods: {
    handleFileUpload(event, fieldName) {
      this.form[fieldName] = event.target.files[0]
    },
    validateForm() {
      // Always check these
      if (!this.form.name.trim()) return 'Full Name is required.'
      if (!this.form.address.trim()) return 'Address is required.'
      if (!this.selectedType) return 'Please select a document type.'

      // Check dynamic fields for the selected document
      const fields = this.documentFields[this.selectedType] || []
      for (let field of fields) {
        const value = this.form[field.name]

        // Empty value check
        if (field.required && !value) {
          return `${field.label} is required.`
        }

        // File type check
        if (field.type === 'file' && !(value instanceof File)) {
          return `Please upload a valid file for ${field.label}.`
        }

        // Numeric check for "Years of Residency"
        if (field.name === 'yearsOfResidency' && isNaN(value)) {
          return 'Years of Residency must be a number.'
        }
      }
      return null
    },
    async submitRequest() {
      const errorMessage = this.validateForm()
      if (errorMessage) {
        alert(errorMessage)
        return
      }

      const formData = new FormData()
      formData.append('documentType', this.selectedType)
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key])
      })

      try {
        await fetch('/api/barangay/requests', {
          method: 'POST',
          body: formData,
        })

        alert('Request submitted successfully!')
        this.resetForm()
      } catch (err) {
        alert('Failed to submit request. Please try again.')
      }
    },
    resetForm() {
      this.selectedType = ''
      this.form = { name: '', address: '' }
    },
  },
}
</script>
