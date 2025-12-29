import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "RIDER",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="RIDER">Rider</option>
        <option value="DRIVER">Driver</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}
