import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Inicializar Stripe no servidor (apenas no servidor)
export const stripe = typeof window === 'undefined' 
  ? new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-12-18.acacia',
    })
  : null

// Inicializar Stripe no cliente
let stripePromise: Promise<any> | null = null
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
  }
  return stripePromise
}

// Preços dos planos (IDs do Stripe)
export const STRIPE_PRICES = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
  annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || '',
}
