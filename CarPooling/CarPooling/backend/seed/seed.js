require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Clear existing data
    await pool.query("DELETE FROM bookings");
    await pool.query("DELETE FROM rides");
    await pool.query("DELETE FROM users");

    // Insert users
    const [users] = await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES 
      ('Driver One', 'driver1@test.com', ?, 'DRIVER'),
      ('Rider One', 'rider1@test.com', ?, 'RIDER')`,
      [hashedPassword, hashedPassword]
    );

    // Get driver id
    const [driver] = await pool.query(
      "SELECT id FROM users WHERE role='DRIVER' LIMIT 1"
    );

    // Insert ride
    await pool.query(
      `INSERT INTO rides 
      (driver_id, source, destination, ride_date, seats_available, price)
      VALUES (?, 'Hyderabad', 'Bangalore', '2025-01-15', 3, 800)`,
      [driver[0].id]
    );

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
