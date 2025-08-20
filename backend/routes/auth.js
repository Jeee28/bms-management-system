// routes/auth.js
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' })
    }
    const user = result[0]

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1h' },
    )

    res.json({
      success: true,
      role: user.role,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/create-user', async (req, res) => {
  const { name, email, password, role } = req.body

  const roleMapping = {
    barangay: 'Barangay Staff',
    health: 'Health Staff',
    admin: 'Admin',
  }
  const dbRole = roleMapping[role] || role

  if (!['Barangay Staff', 'Health Staff', 'Admin'].includes(dbRole)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      name,
      email,
      hashedPassword,
      dbRole,
    ])
    res.json({ success: true, message: 'User created successfully' })
  } catch (err) {
    console.error('Create user error:', err)
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists' })
    } else {
      res.status(500).json({ error: 'Database error' })
    }
  }
})

module.exports = router
