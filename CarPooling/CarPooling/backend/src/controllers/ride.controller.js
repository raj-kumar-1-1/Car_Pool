const pool = require("../config/db");

exports.createRide = async (req, res) => {
  const { source, destination, ride_date, seats_available, price } = req.body;

  try {
    await pool.query(
      `INSERT INTO rides 
      (driver_id, source, destination, ride_date, seats_available, price)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, source, destination, ride_date, seats_available, price]
    );

    res.status(201).json({ message: "Ride created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRides = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const [rides] = await pool.query(
      `SELECT r.*, u.name AS driver_name
       FROM rides r
       JOIN users u ON r.driver_id = u.id
       WHERE r.source = ? AND r.destination = ? AND r.seats_available > 0`,
      [source, destination]
    );

    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
