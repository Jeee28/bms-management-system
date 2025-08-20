const express = require('express')
const db = require('../db')
const multer = require('multer')

const router = express.Router()

// File upload setup (uploads/ folder)
const upload = multer({ dest: 'uploads/' })

// Daily default schedule
const DAILY_SLOTS = ['8-9', '9-10', '10-11', '11-12', '1-2', '2-3', '3-4']

// --------------------
// Get all appointments
// --------------------
router.get('/', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

// Get availability depending on captain schedule
router.get('/availability/:date', (req, res) => {
  const { date } = req.params

  // Step 1: kunin schedule ni captain
  db.query('SELECT time FROM captain_schedule WHERE date = ?', [date], (err, schedule) => {
    if (err) return res.status(500).json({ error: err.message })

    if (schedule.length === 0) {
      return res.json({ slots: [] }) // Walang naka-set na schedule → walang lalabas
    }

    const availableSlots = schedule.map((s) => s.time)

    // Step 2: check bookings
    db.query(
      'SELECT time FROM appointments WHERE date = ? AND status IN ("Pending", "Confirmed")',
      [date],
      (err, booked) => {
        if (err) return res.status(500).json({ error: err.message })

        const bookedSlots = booked.map((b) => b.time)

        // Step 3: combine result
        const slots = availableSlots.map((s) => ({
          time: s,
          available: !bookedSlots.includes(s),
        }))

        res.json({ slots })
      },
    )
  })
})

// POST appointment
router.post('/', (req, res) => {
  const { name, contact, email, date, time } = req.body

  // Check if captain set this slot
  db.query(
    'SELECT * FROM captain_schedule WHERE date = ? AND time = ?',
    [date, time],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      if (results.length === 0) {
        return res
          .status(400)
          .json({ error: 'Slot not available, captain did not set this schedule' })
      }

      // Check if already booked
      db.query(
        'SELECT * FROM appointments WHERE date = ? AND time = ?',
        [date, time],
        (err2, booked) => {
          if (err2) return res.status(500).json({ error: err2.message })
          if (booked.length > 0) {
            return res.status(400).json({ error: 'Slot already booked' })
          }

          // Insert new appointment
          db.query(
            "INSERT INTO appointments (name, contact, email, date, time, status) VALUES (?, ?, ?, ?, ?, 'Pending')",
            [name, contact, email, date, time],
            (err3, result) => {
              if (err3) return res.status(500).json({ error: err3.message })
              res.json({ message: 'Appointment booked, awaiting approval', id: result.insertId })
            },
          )
        },
      )
    },
  )
})

// --------------------
// Book appointment
// --------------------
router.post('/book', upload.single('photo'), (req, res) => {
  const { name, contact, date, time } = req.body
  const photo = req.file ? req.file.filename : null

  // Check if slot already taken
  db.query(
    'SELECT * FROM appointments WHERE date = ? AND time = ? AND status IN ("Pending", "Confirmed")',
    [date, time],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      if (results.length > 0) {
        return res.status(400).json({ message: 'Slot already booked' })
      }

      db.query(
        'INSERT INTO appointments (name, contact, photo, date, time, status) VALUES (?, ?, ?, ?, ?, "Pending")',
        [name, contact, photo, date, time],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message })
          res.json({
            message: 'Appointment booked',
            appointment: {
              id: result.insertId,
              name,
              contact,
              photo,
              date,
              time,
              status: 'Pending',
            },
          })
        },
      )
    },
  )
})

// --------------------
// Cancel appointment
// --------------------
router.post('/cancel/:id', (req, res) => {
  const { id } = req.params
  db.query('UPDATE appointments SET status = "Cancelled" WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Appointment cancelled' })
  })
})

// --------------------
// Update status (Confirmed / Completed)
// --------------------
router.put('/:id', (req, res) => {
  const { status } = req.body
  db.query('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Status updated' })
  })
})

// --------------------
// Delete appointment (admin only maybe)
// --------------------
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM appointments WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Appointment deleted' })
  })
})

module.exports = router
