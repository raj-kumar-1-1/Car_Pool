import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.map((b, i) => (
        <div className="card" key={i}>
          <p>{b.source} → {b.destination}</p>
          <strong>Status: {b.status}</strong>
        </div>
      ))}
    </div>
  );
}
