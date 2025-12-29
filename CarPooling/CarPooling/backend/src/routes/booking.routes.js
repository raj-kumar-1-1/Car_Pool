const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  requestBooking,
  acceptBooking
} = require("../controllers/booking.controller");

router.get("/", (req, res) => {
  res.json({ message: "Bookings API working" });
});
router.post("/request", auth, role("RIDER"), requestBooking);
router.post("/accept", auth, role("DRIVER"), acceptBooking);
// PUT /bookings/:id
router.put("/:id", auth, async (req, res) => {
  const { status } = req.body; // accepted / rejected

  await db.query(
    "UPDATE bookings SET status=? WHERE id=?",
    [status, req.params.id]
  );

  res.json({ message: "Booking updated" });
});

module.exports = router;
