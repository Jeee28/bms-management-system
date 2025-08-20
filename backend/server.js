// server.js
const express = require('express')
const cors = require('cors')
const db = require('./db')

const authRoutes = require('./routes/auth')
const appointmentRoutes = require('./routes/appointment')
const { router: newsRouter, setDb } = require('./routes/newsupdate')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
setDb(db)

// Test route
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1')
    res.json({ success: true, message: 'Database Connected!' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'DB connection failed' })
  }
})

// Use routes
app.use('/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/news', newsRouter)

// Start server
const PORT = 5000
app.listen(PORT, () => console.log(` Server started on port ${PORT}`))
