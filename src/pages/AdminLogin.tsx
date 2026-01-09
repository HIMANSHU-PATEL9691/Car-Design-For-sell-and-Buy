import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // 👇 IMPORTANT: JSON tabhi parse karo jab backend sahi ho
      if (!res.ok) {
        const text = await res.text();
        console.error("LOGIN ERROR RESPONSE:", text);
        alert("Invalid credentials or server error");
        return;
      }

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      // ✅ TOKEN SAVE
      localStorage.setItem("token", data.token);

      alert("Admin logged in successfully");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/admin");
    } catch (err) {
      console.error("LOGIN FAILED:", err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
