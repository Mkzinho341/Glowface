'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [redirectUrl, setRedirectUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Define a URL de redirecionamento apenas no cliente
    setRedirectUrl(`${window.location.origin}/profile`)

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/profile')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Glowface
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4">
            <User className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Bem-vindo ao Glowface
          </h1>
          <p className="text-gray-400">
            Crie sua conta ou faça login para começar sua transformação
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Auth UI Component */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8">
          {redirectUrl && (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#EAB308',
                      brandAccent: '#CA8A04',
                      brandButtonText: 'black',
                      defaultButtonBackground: '#1F2937',
                      defaultButtonBackgroundHover: '#374151',
                      defaultButtonBorder: '#374151',
                      defaultButtonText: 'white',
                      dividerBackground: '#374151',
                      inputBackground: '#1F2937',
                      inputBorder: '#374151',
                      inputBorderHover: '#EAB308',
                      inputBorderFocus: '#EAB308',
                      inputText: 'white',
                      inputLabelText: '#9CA3AF',
                      inputPlaceholder: '#6B7280',
                      messageText: 'white',
                      messageTextDanger: '#EF4444',
                      anchorTextColor: '#EAB308',
                      anchorTextHoverColor: '#CA8A04',
                    },
                    space: {
                      spaceSmall: '4px',
                      spaceMedium: '8px',
                      spaceLarge: '16px',
                      labelBottomMargin: '8px',
                      anchorBottomMargin: '4px',
                      emailInputSpacing: '4px',
                      socialAuthSpacing: '4px',
                      buttonPadding: '12px 16px',
                      inputPadding: '12px 16px',
                    },
                    fontSizes: {
                      baseBodySize: '14px',
                      baseInputSize: '14px',
                      baseLabelSize: '14px',
                      baseButtonSize: '14px',
                    },
                    fonts: {
                      bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '12px',
                      buttonBorderRadius: '12px',
                      inputBorderRadius: '12px',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    email_input_placeholder: 'seu@email.com',
                    password_input_placeholder: 'Sua senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    social_provider_text: 'Entrar com {{provider}}',
                    link_text: 'Já tem uma conta? Entre',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    email_input_placeholder: 'seu@email.com',
                    password_input_placeholder: 'Crie uma senha',
                    button_label: 'Criar Conta',
                    loading_button_label: 'Criando conta...',
                    social_provider_text: 'Criar conta com {{provider}}',
                    link_text: 'Não tem uma conta? Cadastre-se',
                    confirmation_text: 'Verifique seu email para confirmar',
                  },
                  magic_link: {
                    email_input_label: 'Email',
                    email_input_placeholder: 'seu@email.com',
                    button_label: 'Enviar link mágico',
                    loading_button_label: 'Enviando link...',
                    link_text: 'Enviar um link mágico',
                    confirmation_text: 'Verifique seu email para o link de login',
                  },
                  forgotten_password: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    email_input_placeholder: 'seu@email.com',
                    button_label: 'Enviar instruções',
                    loading_button_label: 'Enviando...',
                    link_text: 'Esqueceu sua senha?',
                    confirmation_text: 'Verifique seu email para redefinir a senha',
                  },
                },
              }}
              providers={[]}
              redirectTo={redirectUrl}
              onlyThirdPartyProviders={false}
              magicLink={false}
            />
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="text-yellow-400 hover:text-yellow-300">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-yellow-400 hover:text-yellow-300">
              Política de Privacidade
            </a>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
          <h3 className="font-bold mb-4 text-center">Por que criar uma conta?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">Acesso a mais de 30 exercícios exclusivos</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">Acompanhe seu progresso e conquistas</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">Receba recomendações personalizadas</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">Sincronize em todos os seus dispositivos</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
