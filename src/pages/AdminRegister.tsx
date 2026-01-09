import { useState } from "react";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:5000/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Register Admin</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default AdminRegister;
