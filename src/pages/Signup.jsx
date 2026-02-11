import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("SIGNUP DATA:", data);
      console.log("SIGNUP ERROR:", error);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Signup successful. Check your email if confirmation is enabled.");
      navigate("/login");
    } catch (err) {
      console.log("CATCH ERROR:", err);
      setMessage(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign Up</h2>

      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 300,
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <p style={{ marginTop: 20 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
