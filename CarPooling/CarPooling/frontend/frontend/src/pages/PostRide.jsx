import { useState } from "react";
import API from "../services/api";

export default function PostRide() {
  const [ride, setRide] = useState({
    source: "",
    destination: "",
    ride_date: "",
    seats_available: "",
    price: "",
  });

  const submit = async () => {
    try {
      await API.post("/rides", ride);
      alert("Ride posted");
    } catch {
      alert("Only drivers can post rides");
    }
  };

return (
    <div className="container">
      <div className="card">
        <h2>Post Ride</h2>
        {Object.keys(ride).map((key) => (
          <input
            key={key}
            placeholder={key.replace("_", " ")}
            onChange={(e) =>
              setRide({ ...ride, [key]: e.target.value })
            }
          />
        ))}
        <button onClick={submit}>Post Ride</button>
      </div>
    </div>
  );
}
