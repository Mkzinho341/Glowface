'use client'

import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp, Calendar, Award, ArrowLeft, Clock, Target } from 'lucide-react'
import Link from 'next/link'

type ProgressData = {
  totalDays: number
  totalMinutes: number
  exercisesCompleted: number
  currentStreak: number
  longestStreak: number
  weeklyProgress: { day: string; minutes: number }[]
}

export default function ProgressPage() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<ProgressData>({
    totalDays: 0,
    totalMinutes: 0,
    exercisesCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyProgress: [
      { day: 'Dom', minutes: 0 },
      { day: 'Seg', minutes: 0 },
      { day: 'Ter', minutes: 0 },
      { day: 'Qua', minutes: 0 },
      { day: 'Qui', minutes: 0 },
      { day: 'Sex', minutes: 0 },
      { day: 'Sáb', minutes: 0 }
    ]
  })

  useEffect(() => {
    loadProgress()
  }, [])

  async function loadProgress() {
    try {
      // Simula carregamento de dados de progresso
      await new Promise(resolve => setTimeout(resolve, 500))
      // Em produção, você buscaria do Supabase
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar progresso:', error)
      setLoading(false)
    }
  }

  const maxMinutes = Math.max(...progress.weeklyProgress.map(d => d.minutes), 1)

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Carregando progresso...</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4">
            <TrendingUp className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Seu Progresso
          </h1>
          <p className="text-gray-400">
            Acompanhe sua jornada de transformação facial
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Dias de Prática</p>
                <p className="text-3xl font-bold text-white">{progress.totalDays}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Minutos Totais</p>
                <p className="text-3xl font-bold text-white">{progress.totalMinutes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Exercícios Completos</p>
                <p className="text-3xl font-bold text-white">{progress.exercisesCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Sequência Atual</p>
                <p className="text-3xl font-bold text-white">{progress.currentStreak}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-yellow-400" />
            Progresso Semanal
          </h2>
          <div className="flex items-end justify-between gap-4 h-64">
            {progress.weeklyProgress.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                <div className="flex-1 w-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${(day.minutes / maxMinutes) * 100}%`,
                      minHeight: day.minutes > 0 ? '20px' : '0'
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-400">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.minutes}min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Conquistas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Achievement Cards */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center opacity-50">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="font-bold mb-2">Primeiro Passo</h3>
              <p className="text-sm text-gray-500">Complete seu primeiro exercício</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center opacity-50">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="font-bold mb-2">Sequência de 7 Dias</h3>
              <p className="text-sm text-gray-500">Pratique por 7 dias seguidos</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center opacity-50">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="font-bold mb-2">Dedicação Total</h3>
              <p className="text-sm text-gray-500">Complete 30 exercícios</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        {progress.totalDays === 0 && (
          <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Comece Sua Jornada!</h3>
            <p className="text-gray-300 mb-6">
              Complete seu primeiro exercício hoje e comece a ver resultados em poucas semanas.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
            >
              Ir para Exercícios
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
