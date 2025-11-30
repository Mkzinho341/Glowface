'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Sparkles, Check, CreditCard, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getStripe } from '@/lib/stripe'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planType = searchParams.get('plan') || 'annual'
  const canceled = searchParams.get('canceled')
  
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (canceled) {
      setError('Pagamento cancelado. Tente novamente quando estiver pronto.')
    }
  }, [canceled])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth')
      return
    }
    setUser(session.user)
  }

  const plans = {
    monthly: {
      name: 'Plano Mensal',
      price: 9.99,
      period: 'mês',
      savings: null,
      total: 9.99
    },
    annual: {
      name: 'Plano Anual',
      price: 99.99,
      period: 'ano',
      savings: 'Economize $20',
      total: 99.99
    }
  }

  const currentPlan = plans[planType as keyof typeof plans] || plans.annual

  const handleCheckout = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Criar sessão de checkout no Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          userId: user.id,
          userEmail: user.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar sessão de checkout')
      }

      // Redirecionar para o checkout do Stripe
      const stripe = await getStripe()
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error: any) {
      console.error('Erro no checkout:', error)
      setError(error.message || 'Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Glowface
              </span>
            </Link>
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Informações de Pagamento */}
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl font-bold mb-8">Finalizar Assinatura</h1>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={user.email || ''}
                  className="w-full bg-gray-900 border border-yellow-500/20 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500/50 transition-colors"
                  disabled
                />
              </div>

              {/* Informações do Stripe */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-bold">Pagamento Seguro via Stripe</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-3">
                      Você será redirecionado para o checkout seguro da Stripe para finalizar seu pagamento.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Pagamento 100% seguro e criptografado
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Aceita todos os cartões de crédito
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Processamento instantâneo
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Cancele a qualquer momento
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Segurança */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Powered by Stripe - Líder mundial em pagamentos online</span>
              </div>

              {/* Botão de Pagamento */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Redirecionando...
                  </span>
                ) : (
                  `Pagar $${currentPlan.total} com Stripe`
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Ao confirmar, você concorda com nossos Termos de Serviço
              </p>
            </div>
          </div>

          {/* Resumo do Plano */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{currentPlan.name}</h3>
                    <p className="text-sm text-gray-400">Cobrança {planType === 'monthly' ? 'mensal' : 'anual'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-yellow-400">${currentPlan.price}</p>
                    <p className="text-sm text-gray-400">/ {currentPlan.period}</p>
                  </div>
                </div>

                {currentPlan.savings && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                    <p className="text-green-400 font-semibold text-sm">{currentPlan.savings}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-yellow-500/20 pt-6 mb-6">
                <h3 className="font-bold mb-4">O que está incluído:</h3>
                <ul className="space-y-3">
                  {[
                    '30+ Exercícios Exclusivos',
                    'Tecnologia de IA Integrada',
                    'Guias de Postura Facial',
                    'Guias de Postura da Língua',
                    'Acesso Ilimitado',
                    'Suporte Prioritário',
                    'Atualizações Gratuitas'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-yellow-500/20 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">${currentPlan.total}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-yellow-400">${currentPlan.total}</span>
                </div>
              </div>

              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-300 text-center">
                  <span className="font-semibold text-yellow-400">Garantia de 30 dias</span>
                  <br />
                  Cancele a qualquer momento sem complicações
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
