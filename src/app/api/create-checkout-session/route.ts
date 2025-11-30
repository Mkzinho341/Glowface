import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { planType, userId, userEmail } = await req.json()

    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Validar tipo de plano
    if (!['monthly', 'annual'].includes(planType)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    const priceId = STRIPE_PRICES[planType as keyof typeof STRIPE_PRICES]

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: {
        userId,
        planType,
      },
      success_url: `${req.headers.get('origin')}/progress?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout?plan=${planType}&canceled=true`,
      subscription_data: {
        metadata: {
          userId,
          planType,
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
