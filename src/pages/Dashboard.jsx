import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email || "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!error) setRole(profile?.role || "member");
    }

    load();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <p><b>Logged in as:</b> {email}</p>
      <p><b>Role:</b> {role || "..."}</p>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <Link to="/profile">Profile (next)</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
