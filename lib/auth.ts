import { supabase } from "./supabaseClient"

interface SignUpParams {
  email: string
  password: string
  fullName: string
  matricNumber: string
}

export async function signUp({
  email,
  password,
  fullName,
  matricNumber,
}: SignUpParams) {

  // 1️⃣ Create auth account
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  const user = data.user

  if (!user) {
    throw new Error("User creation failed")
  }

  // 2️⃣ Update profile created by trigger
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      matric_number: matricNumber,
      email: email
    })
    .eq("id", user.id)

  if (profileError) throw profileError

  return user
}

export async function signIn(matricNumber: string, password: string) {
  // 1️⃣ Get user email from matric number
  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("matric_number", matricNumber)
    .single()

  if (error) throw new Error("Matric number not found.")

  if (!data.email) throw new Error("Email not set for this account.")

  // 2️⃣ Sign in using email
  const { data: userData, error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password,
  })

  if (signInError) throw signInError

  return userData.user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error

  return data.user
}