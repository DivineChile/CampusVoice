"use client"

import { useEffect, useState } from "react"
import { createClient } from "./supabaseClient";
import { getUser } from "./auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    //Get current session
    const getSession = async () => {
      const user = await getUser();
      setUser(user);
      setLoading(false);
    }

    getSession();

    //Listen for login/ logout changes
    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return {user, loading}
}