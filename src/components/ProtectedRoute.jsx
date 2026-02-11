import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;

      if (error) {
        console.error("getSession error:", error);
      }
      setSession(data?.session ?? null);
      setLoading(false);
    }

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      // safer unsubscribe across versions
      authListener?.subscription?.unsubscribe?.();
      authListener?.unsubscribe?.();
    };
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
