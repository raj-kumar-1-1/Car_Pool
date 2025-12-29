const express = require("express");
const router = express.Router();


const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  createRide,
  searchRides
} = require("../controllers/ride.controller");



router.post("/", auth, role("DRIVER"), createRide);
router.get("/search", auth, searchRides);
// GET /bookings/requests
router.get("/requests", auth, async (req, res) => {
  const [rows] = await db.query(`
    SELECT b.id, b.status, u.name, u.phone, r.source, r.destination
    FROM bookings b
    JOIN rides r ON b.ride_id = r.id
    JOIN users u ON b.user_id = u.id
    WHERE r.driver_id = ?
  `, [req.user.id]);

  res.json(rows);
});
// GET /bookings/my
router.get("/my", auth, async (req, res) => {
  const [rows] = await db.query(`
    SELECT b.status, r.source, r.destination
    FROM bookings b
    JOIN rides r ON b.ride_id = r.id
    WHERE b.user_id = ?
  `, [req.user.id]);

  res.json(rows);
});

module.exports = router;
