import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Exercise = {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  video_url?: string
  thumbnail_url?: string
  instructions?: any
  benefits?: string[]
  is_premium: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export type UserProfile = {
  id: string
  user_id: string
  full_name: string
  age?: number
  gender?: 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_dizer'
  skin_type?: 'oleosa' | 'seca' | 'mista' | 'normal' | 'sensivel'
  main_concerns?: string
  experience_level: 'iniciante' | 'intermediario' | 'avancado'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  plan_type: 'monthly' | 'annual'
  status: 'active' | 'cancelled' | 'expired'
  start_date: string
  end_date?: string
  amount: number
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  user_id: string
  subscription_id?: string
  amount: number
  currency: string
  payment_method: string
  card_last4?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  created_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  exercise_id: string
  completed_at: string
  duration_completed?: number
  notes?: string
}
