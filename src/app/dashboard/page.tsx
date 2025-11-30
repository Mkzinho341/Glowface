'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Clock, TrendingUp, Award, Play, Lock, X, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Exercise = {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructions?: string[]
  benefits?: string[]
  is_premium: boolean
  order_index: number
}

// Dados mockados de exercícios
const MOCK_EXERCISES: Exercise[] = [
  {
    id: '1',
    title: 'Elevação de Sobrancelhas',
    description: 'Exercício para fortalecer a testa e reduzir linhas de expressão',
    duration: 180,
    difficulty: 'beginner',
    category: 'Testa',
    benefits: ['Reduz rugas', 'Fortalece músculos'],
    instructions: [
      'Coloque os dedos indicadores acima das sobrancelhas',
      'Pressione suavemente para baixo enquanto tenta levantar as sobrancelhas',
      'Mantenha a tensão por 5 segundos',
      'Relaxe e repita 10 vezes',
      'Faça 3 séries com 30 segundos de descanso entre elas'
    ],
    is_premium: false,
    order_index: 1
  },
  {
    id: '2',
    title: 'Massagem nas Bochechas',
    description: 'Tonifica as bochechas e melhora a circulação facial',
    duration: 240,
    difficulty: 'beginner',
    category: 'Bochechas',
    benefits: ['Tonifica', 'Melhora circulação'],
    instructions: [
      'Coloque as palmas das mãos nas bochechas',
      'Faça movimentos circulares suaves por 30 segundos',
      'Mude a direção e continue por mais 30 segundos',
      'Use os dedos para fazer pequenos círculos ao redor das maçãs do rosto',
      'Repita toda a sequência 3 vezes'
    ],
    is_premium: false,
    order_index: 2
  },
  {
    id: '3',
    title: 'Exercício do Sorriso',
    description: 'Fortalece os músculos ao redor da boca e previne linhas',
    duration: 120,
    difficulty: 'beginner',
    category: 'Boca',
    benefits: ['Previne rugas', 'Fortalece'],
    instructions: [
      'Sorria o mais amplamente possível, mostrando os dentes',
      'Mantenha o sorriso por 10 segundos',
      'Relaxe e repita 15 vezes',
      'Faça movimentos de "beijo" projetando os lábios para frente',
      'Alterne entre sorriso e beijo por 2 minutos'
    ],
    is_premium: false,
    order_index: 3
  },
  {
    id: '4',
    title: 'Lifting Natural do Pescoço',
    description: 'Exercício avançado para tonificar o pescoço e queixo',
    duration: 300,
    difficulty: 'intermediate',
    category: 'Pescoço',
    benefits: ['Define queixo', 'Tonifica pescoço'],
    instructions: [
      'Sente-se com a coluna ereta',
      'Incline a cabeça para trás olhando para o teto',
      'Projete o queixo para frente e para cima',
      'Mantenha por 10 segundos e relaxe',
      'Repita 20 vezes em 3 séries'
    ],
    is_premium: true,
    order_index: 4
  },
  {
    id: '5',
    title: 'Contorno Facial Completo',
    description: 'Rotina completa para definir o contorno facial',
    duration: 600,
    difficulty: 'intermediate',
    category: 'Rosto Completo',
    benefits: ['Define contorno', 'Efeito lifting'],
    instructions: [
      'Comece com massagem circular na testa por 2 minutos',
      'Trabalhe as têmporas com movimentos ascendentes',
      'Massageie as bochechas de dentro para fora',
      'Faça drenagem linfática no pescoço',
      'Finalize com tapotagem suave em todo o rosto'
    ],
    is_premium: true,
    order_index: 5
  },
  {
    id: '6',
    title: 'Anti-Aging Intensivo',
    description: 'Programa intensivo para combater sinais de envelhecimento',
    duration: 900,
    difficulty: 'advanced',
    category: 'Rosto Completo',
    benefits: ['Anti-idade', 'Resultados intensos'],
    instructions: [
      'Aqueça o rosto com movimentos circulares por 3 minutos',
      'Trabalhe cada área facial com exercícios específicos',
      'Faça 20 repetições de cada exercício',
      'Inclua exercícios de resistência com os dedos',
      'Finalize com relaxamento facial profundo'
    ],
    is_premium: true,
    order_index: 6
  }
]

export default function DashboardPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isExercising, setIsExercising] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)

  useEffect(() => {
    loadExercises()
  }, [])

  useEffect(() => {
    if (isExercising && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsExercising(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isExercising, timeRemaining])

  async function loadExercises() {
    try {
      // Simula um pequeno delay para mostrar o loading
      await new Promise(resolve => setTimeout(resolve, 500))
      setExercises(MOCK_EXERCISES)
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredExercises = filter === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.difficulty === filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante'
      case 'intermediate': return 'Intermediário'
      case 'advanced': return 'Avançado'
      default: return difficulty
    }
  }

  const handleStartExercise = (exercise: Exercise) => {
    if (exercise.is_premium) {
      // Redireciona para checkout se for premium
      window.location.href = '/checkout'
    } else {
      setSelectedExercise(exercise)
      setCurrentStep(0)
      setTimeRemaining(exercise.duration)
    }
  }

  const handleBeginExercise = () => {
    setIsExercising(true)
  }

  const handleCloseExercise = () => {
    setSelectedExercise(null)
    setIsExercising(false)
    setCurrentStep(0)
    setTimeRemaining(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Modal de exercício
  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header do exercício */}
        <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleCloseExercise}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo do exercício */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-4 ${getDifficultyColor(selectedExercise.difficulty)}`}>
              {getDifficultyLabel(selectedExercise.difficulty)}
            </span>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {selectedExercise.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {selectedExercise.description}
            </p>
          </div>

          {/* Benefícios */}
          {selectedExercise.benefits && selectedExercise.benefits.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Benefícios
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedExercise.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instruções */}
          {selectedExercise.instructions && selectedExercise.instructions.length > 0 && (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Instruções Passo a Passo</h2>
              <div className="space-y-4">
                {selectedExercise.instructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 p-4 rounded-xl transition-all ${
                      isExercising && currentStep === idx
                        ? 'bg-yellow-500/20 border border-yellow-500/40 scale-105'
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                      isExercising && currentStep === idx
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <p className={`text-lg ${
                      isExercising && currentStep === idx
                        ? 'text-white font-semibold'
                        : 'text-gray-400'
                    }`}>
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isExercising ? (
              <button
                onClick={handleBeginExercise}
                className="flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-6 h-6" />
                Iniciar Exercício
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="flex-1 py-4 rounded-xl font-bold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Passo Anterior
                </button>
                <button
                  onClick={() => setCurrentStep(prev => Math.min((selectedExercise.instructions?.length || 1) - 1, prev + 1))}
                  disabled={currentStep === (selectedExercise.instructions?.length || 1) - 1}
                  className="flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo Passo
                </button>
              </>
            )}
          </div>

          {isExercising && (
            <div className="mt-6 text-center">
              <button
                onClick={handleCloseExercise}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Finalizar Exercício
              </button>
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Glowface
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-yellow-400 font-semibold">
                Exercícios
              </Link>
              <Link href="/progress" className="text-gray-400 hover:text-white transition-colors">
                Progresso
              </Link>
              <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                Perfil
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Dias de Prática</p>
                <p className="text-3xl font-bold text-white">0</p>
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
                <p className="text-3xl font-bold text-white">0</p>
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
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'beginner'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Iniciante
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'intermediate'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Intermediário
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'advanced'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Avançado
          </button>
        </div>

        {/* Exercises Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Carregando exercícios...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl overflow-hidden hover:border-yellow-500/40 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center">
                    <Play className="w-16 h-16 text-yellow-400 group-hover:scale-110 transition-transform" />
                  </div>
                  {exercise.is_premium && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                      <Lock className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(exercise.difficulty)}`}>
                      {getDifficultyLabel(exercise.difficulty)}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.floor(exercise.duration / 60)}min
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {exercise.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {exercise.description}
                  </p>

                  {exercise.benefits && exercise.benefits.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Benefícios:</p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.benefits.slice(0, 2).map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleStartExercise(exercise)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      exercise.is_premium
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-500/50'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {exercise.is_premium ? 'Desbloquear Premium' : 'Começar Exercício'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredExercises.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum exercício encontrado nesta categoria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
