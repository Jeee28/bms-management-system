const express = require('express')
const router = express.Router()

// Receive db connection from server.js
let db
const setDb = (database) => {
  db = database
}

// Get all news
router.get('/', (req, res) => {
  db.query('SELECT * FROM news ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json(err)
    res.json(results)
  })
})

// Add news
router.post('/', (req, res) => {
  const { title, content } = req.body
  db.query('INSERT INTO news (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) return res.status(500).json(err)
    db.query('SELECT * FROM news WHERE id = ?', [result.insertId], (err2, results) => {
      if (err2) return res.status(500).json(err2)
      res.json(results[0])
    })
  })
})

// Update news
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  db.query('UPDATE news SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
    if (err) return res.status(500).json(err)
    db.query('SELECT * FROM news WHERE id = ?', [id], (err2, results) => {
      if (err2) return res.status(500).json(err2)
      res.json(results[0])
    })
  })
})

// Delete news
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM news WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: 'News deleted' })
  })
})

module.exports = { router, setDb }
