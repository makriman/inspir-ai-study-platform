import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Server-side client with service role (for server components)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceRoleKey) {
    // Fallback to anon key for client-side
    return supabase
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Types for our database tables
export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  author_id: number
  category_id: number
  status: 'draft' | 'published'
  published_at?: string
  updated_at?: string
  created_at?: string
  meta_title?: string
  meta_description?: string
  author?: Author
  category?: Category
}

export interface Author {
  id: number
  name: string
  bio?: string
  avatar_url?: string
  twitter_handle?: string
  linkedin_url?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  color?: string
}

export interface ToolPage {
  id: number
  title: string
  slug: string
  description: string
  content: string
  icon?: string
  category?: string
  featured: boolean
  meta_title?: string
  meta_description?: string
  created_at?: string
  updated_at?: string
}
