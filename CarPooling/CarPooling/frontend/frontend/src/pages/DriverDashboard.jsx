import { useEffect, useState } from "react";
import API from "../services/api";

export default function DriverDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/bookings/requests").then(res => setRequests(res.data));
  }, []);

  const update = (id, status) => {
    API.put(`/bookings/${id}`, { status }).then(() =>
      setRequests(req =>
        req.map(r => r.id === id ? { ...r, status } : r)
      )
    );
  };

  return (
    <div className="container">
      <h2>Booking Requests</h2>

      {requests.map(r => (
        <div className="card" key={r.id}>
          <p>{r.name} ({r.phone})</p>
          <p>{r.source} → {r.destination}</p>
          <p>Status: {r.status}</p>

          {r.status === "pending" && (
            <>
              <button onClick={() => update(r.id, "accepted")}>Accept</button>
              <button onClick={() => update(r.id, "rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
