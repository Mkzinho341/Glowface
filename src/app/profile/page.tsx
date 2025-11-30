'use client'

import { useEffect, useState } from 'react'
import { Sparkles, User, Save, ArrowLeft, Camera } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type UserProfile = {
  id?: string
  user_id?: string
  full_name: string
  age: number | null
  gender: string
  skin_type: string
  main_concerns: string
  experience_level: string
  avatar_url: string
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    age: null,
    gender: '',
    skin_type: '',
    main_concerns: '',
    experience_level: 'iniciante',
    avatar_url: ''
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      // Simula carregamento de perfil
      // Em produção, você buscaria do Supabase com o user_id real
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      // Validações básicas
      if (!profile.full_name.trim()) {
        setMessage({ type: 'error', text: 'Nome completo é obrigatório' })
        setSaving(false)
        return
      }

      if (profile.age && (profile.age < 13 || profile.age > 120)) {
        setMessage({ type: 'error', text: 'Idade deve estar entre 13 e 120 anos' })
        setSaving(false)
        return
      }

      // Inserir ou atualizar perfil no Supabase
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: 'temp-user-id', // Em produção, use o ID real do usuário autenticado
          full_name: profile.full_name,
          age: profile.age,
          gender: profile.gender || null,
          skin_type: profile.skin_type || null,
          main_concerns: profile.main_concerns || null,
          experience_level: profile.experience_level,
          avatar_url: profile.avatar_url || null,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) throw error

      setMessage({ type: 'success', text: 'Perfil salvo com sucesso!' })
      
      // Redirecionar para dashboard após 2 segundos
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error)
      setMessage({ type: 'error', text: error.message || 'Erro ao salvar perfil' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Dashboard
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4">
            <User className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Seu Perfil
          </h1>
          <p className="text-gray-400">
            Complete seu perfil para uma experiência personalizada
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

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6">
            <label className="block text-sm font-semibold text-gray-400 mb-4">
              Foto de Perfil (URL)
            </label>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center overflow-hidden">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-10 h-10 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  value={profile.avatar_url}
                  onChange={(e) => handleChange('avatar_url', e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">Cole a URL de uma imagem</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Informações Pessoais</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                required
                value={profile.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Idade
              </label>
              <input
                type="number"
                min="13"
                max="120"
                value={profile.age || ''}
                onChange={(e) => handleChange('age', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="Digite sua idade"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Gênero
              </label>
              <select
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="prefiro_nao_dizer">Prefiro não dizer</option>
              </select>
            </div>
          </div>

          {/* Skin & Goals */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Pele e Objetivos</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Tipo de Pele
              </label>
              <select
                value={profile.skin_type}
                onChange={(e) => handleChange('skin_type', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="">Selecione</option>
                <option value="oleosa">Oleosa</option>
                <option value="seca">Seca</option>
                <option value="mista">Mista</option>
                <option value="normal">Normal</option>
                <option value="sensivel">Sensível</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Principais Preocupações
              </label>
              <textarea
                value={profile.main_concerns}
                onChange={(e) => handleChange('main_concerns', e.target.value)}
                placeholder="Ex: rugas, linhas de expressão, flacidez, olheiras..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Nível de Experiência
              </label>
              <select
                value={profile.experience_level}
                onChange={(e) => handleChange('experience_level', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Perfil
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
