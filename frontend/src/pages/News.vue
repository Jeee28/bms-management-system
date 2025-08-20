<template>
  <div class="news-feed">
    <h1>Latest News</h1>

    <div v-if="loading">Loading news...</div>
    <div v-else-if="newsList.length === 0">No news yet.</div>

    <ul v-else>
      <li v-for="news in newsList" :key="news.id" class="news-item">
        <h3>{{ news.title }}</h3>
        <p>{{ news.content }}</p>
        <small>Posted at: {{ formatDate(news.created_at) }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const newsList = ref([])
const loading = ref(true)

// Fetch news from backend
const fetchNews = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/news') // make sure baseURL is set
    newsList.value = res.data
  } catch (err) {
    console.error('Failed to fetch news:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchNews)

// Optional: format date nicely
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.news-feed {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}

.news-item {
  background: #f9f9f9;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
}
</style>
