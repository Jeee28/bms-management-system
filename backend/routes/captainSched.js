const express = require('express');
const db = require('../db');

const router = express.Router();

// Daily slots (master list)
const DAILY_SLOTS = [
  "8-9", "9-10", "10-11", "11-12",
  "1-2", "2-3", "3-4"
];

// Get schedule for a given date
router.get('/:date', (req, res) => {
  const { date } = req.params;
  db.query('SELECT time FROM captain_schedule WHERE date = ?', [date], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.time));
  });
});

// Save schedule (Captain selects slots for a date)
router.post('/', (req, res) => {
  const { date, slots } = req.body; // slots = array of times

  // Remove old schedule for that date
  db.query('DELETE FROM captain_schedule WHERE date = ?', [date], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!slots || slots.length === 0) {
      return res.json({ message: "Schedule cleared" });
    }

    const values = slots.map(s => [date, s]);
    db.query('INSERT INTO captain_schedule (date, time) VALUES ?', [values], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Schedule saved", date, slots });
    });
  });
});

// Optional: Get master slot list
router.get('/slots/list', (req, res) => {
  res.json(DAILY_SLOTS);
});

module.exports = router;
