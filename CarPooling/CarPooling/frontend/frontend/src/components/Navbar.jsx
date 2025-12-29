import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#000",
        padding: "15px",
        color: "#fff",
      }}
    >
      <Link style={{ color: "#fff", marginRight: 15 }} to="/search">
        Search Ride
      </Link>
      <Link style={{ color: "#fff", marginRight: 15 }} to="/post-ride">
        Post Ride
      </Link>
      <Link style={{ color: "#fff" }} to="/">
        Login
      </Link>
    </nav>
  );
}
