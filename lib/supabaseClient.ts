import {createBrowserClient} from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}