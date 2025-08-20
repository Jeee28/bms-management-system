<template>
  <div class="news-container">
    <h1>News Updates</h1>

    <!-- Admin add news -->
    <div v-if="isAdmin" class="add-news">
      <input v-model="newTitle" placeholder="News title" />
      <textarea v-model="newContent" placeholder="News content"></textarea>
      <button @click="addNews">Add News</button>
    </div>

    <!-- News list -->
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <h3>{{ news.title }}</h3>
        <p>{{ news.content }}</p>

        <!-- Admin actions -->
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editNews(news)">Edit</button>
          <button @click="deleteNews(news.id)">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Edit modal -->
    <div v-if="editingNews" class="edit-modal">
      <h3>Edit News</h3>
      <input v-model="editingNews.title" />
      <textarea v-model="editingNews.content"></textarea>
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Admin check (replace with your auth logic)
const isAdmin = ref(true)

// News list
const newsList = ref([])

// Fetch news from backend
const fetchNews = async () => {
  try {
    const res = await axios.get('/api/news')
    newsList.value = res.data
  } catch (err) {
    console.error('Failed to fetch news:', err)
  }
}

// Add news
const newTitle = ref('')
const newContent = ref('')

const addNews = async () => {
  if (!newTitle.value || !newContent.value) return
  try {
    const res = await axios.post('/api/news', {
      title: newTitle.value,
      content: newContent.value,
    })
    newsList.value.push(res.data)
    newTitle.value = ''
    newContent.value = ''
  } catch (err) {
    console.error('Failed to add news:', err)
  }
}

// Edit news
const editingNews = ref(null)

const editNews = (news) => {
  editingNews.value = { ...news } // clone
}

const saveEdit = async () => {
  try {
    const res = await axios.put(`/api/news/${editingNews.value.id}`, {
      title: editingNews.value.title,
      content: editingNews.value.content,
    })
    // update local list
    const index = newsList.value.findIndex((n) => n.id === editingNews.value.id)
    newsList.value[index] = res.data
    editingNews.value = null
  } catch (err) {
    console.error('Failed to update news:', err)
  }
}

const cancelEdit = () => {
  editingNews.value = null
}

// Delete news
const deleteNews = async (id) => {
  try {
    await axios.delete(`/api/news/${id}`)
    newsList.value = newsList.value.filter((n) => n.id !== id)
  } catch (err) {
    console.error('Failed to delete news:', err)
  }
}

// On component mount, fetch news
onMounted(fetchNews)
</script>

<style scoped>
.news-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.add-news input,
.add-news textarea,
.edit-modal input,
.edit-modal textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.admin-actions button {
  margin-right: 5px;
}

.edit-modal {
  background: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
