import { useState } from "react";
import API from "../services/api";
import "../styling/searchRide.css";

export default function SearchRide() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [rides, setRides] = useState([]);

  const search = async () => {
    const res = await API.get(
      `/rides/search?source=${source}&destination=${destination}`
    );
    setRides(res.data);
  };

 const book = async (id) => {
  await API.post("/bookings/request", { ride_id: id });

  setRides(prev =>
    prev.map(r =>
      r.id === id ? { ...r, status: "pending" } : r
    )
  );
};


  return (
    <div className="search-container">
      <h2>Find a Ride</h2>

      <div className="search-box">
        <input
          placeholder="Source"
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          placeholder="Destination"
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      <div className="results">
        {rides.map((r) => (
          <div className="ride-card" key={r.id}>
            <div>
              <strong>{r.source}</strong> → <strong>{r.destination}</strong>
              <p className="price">₹{r.price}</p>
            </div>
            <button className="book-btn" onClick={() => book(r.id)}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
