const pool = require("../config/db");

exports.requestBooking = async (req, res) => {
  const { ride_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO bookings (ride_id, user_id, status) VALUES (?, ?, 'pending')",
      [ride_id, req.user.id]
    );

    res.status(201).json({ message: "Booking requested" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptBooking = async (req, res) => {
  const { booking_id } = req.body;

  try {
    // Accept booking
    await pool.query(
      "UPDATE bookings SET status='ACCEPTED' WHERE id=?",
      [booking_id]
    );

    // Reduce seat count
    await pool.query(
      `UPDATE rides 
       SET seats_available = seats_available - 1
       WHERE id = (SELECT ride_id FROM bookings WHERE id = ?)`,
      [booking_id]
    );

    res.json({ message: "Booking accepted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
