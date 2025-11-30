'use client'

import { useState } from 'react'
import { Sparkles, Check, X, ChevronRight, Trophy, Star } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Qual é o principal benefício do Face Yoga?',
    options: [
      'Perder peso rapidamente',
      'Tonificar músculos faciais naturalmente',
      'Mudar a cor da pele',
      'Aumentar o tamanho dos olhos'
    ],
    correctAnswer: 1,
    explanation: 'O Face Yoga tonifica os músculos faciais de forma natural, proporcionando um rosto mais firme e jovem sem procedimentos invasivos.'
  },
  {
    id: 2,
    question: 'Quanto tempo leva para ver resultados com o Glowface?',
    options: [
      '1 dia',
      '6 meses',
      '2-4 semanas',
      '1 ano'
    ],
    correctAnswer: 2,
    explanation: 'A maioria dos usuários nota diferenças visíveis em 2-4 semanas de prática regular e consistente.'
  },
  {
    id: 3,
    question: 'Qual celebridade é conhecida por usar Face Yoga?',
    options: [
      'Taylor Swift',
      'Kim Kardashian',
      'Beyoncé',
      'Rihanna'
    ],
    correctAnswer: 1,
    explanation: 'Kim Kardashian é uma das celebridades que utiliza o método de Face Yoga desenvolvido pela instrutora Koko.'
  },
  {
    id: 4,
    question: 'O que você precisa para praticar Face Yoga?',
    options: [
      'Equipamentos caros',
      'Uma academia',
      'Apenas seu rosto e dedicação',
      'Produtos químicos especiais'
    ],
    correctAnswer: 2,
    explanation: 'Você não precisa de nenhum equipamento! Apenas seu rosto e alguns minutos por dia são suficientes.'
  },
  {
    id: 5,
    question: 'Quantos exercícios exclusivos o Glowface oferece?',
    options: [
      '10 exercícios',
      '20 exercícios',
      '30+ exercícios',
      '5 exercícios'
    ],
    correctAnswer: 2,
    explanation: 'O Glowface oferece mais de 30 exercícios exclusivos com orientações em vídeo de alta qualidade.'
  },
  {
    id: 6,
    question: 'Qual tecnologia o Glowface usa para ajudar nos exercícios?',
    options: [
      'Realidade Virtual',
      'Inteligência Artificial',
      'Hologramas',
      'Nenhuma tecnologia'
    ],
    correctAnswer: 1,
    explanation: 'O Glowface utiliza Inteligência Artificial para orientar cada movimento e garantir a execução perfeita dos exercícios.'
  },
  {
    id: 7,
    question: 'O Face Yoga é adequado para qual faixa etária?',
    options: [
      'Apenas para jovens',
      'Apenas para idosos',
      'Todas as idades',
      'Apenas para adultos'
    ],
    correctAnswer: 2,
    explanation: 'O Face Yoga é adequado para todas as idades. Quanto mais cedo começar, melhores os resultados preventivos!'
  },
  {
    id: 8,
    question: 'Qual é a principal vantagem do Glowface em relação a cirurgias?',
    options: [
      'É mais caro',
      'É natural e não invasivo',
      'Dá resultados instantâneos',
      'Requer internação'
    ],
    correctAnswer: 1,
    explanation: 'O Glowface oferece uma solução natural e não invasiva, sem os riscos e custos de procedimentos cirúrgicos.'
  }
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false))

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    
    if (isCorrect && !answeredQuestions[currentQuestion]) {
      setScore(score + 1)
    }

    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentQuestion] = true
    setAnsweredQuestions(newAnsweredQuestions)

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false))
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return '🏆 Perfeito! Você é um expert em Face Yoga!'
    if (percentage >= 75) return '⭐ Excelente! Você conhece muito bem o Glowface!'
    if (percentage >= 50) return '👍 Bom trabalho! Continue aprendendo!'
    return '💪 Continue praticando! O conhecimento vem com o tempo!'
  }

  const question = quizQuestions[currentQuestion]

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-3xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-black" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Quiz Concluído!</h1>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-yellow-400 mb-2">
                {score}/{quizQuestions.length}
              </div>
              <p className="text-xl text-gray-300">{getScoreMessage()}</p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <h3 className="text-xl font-bold">Sua Pontuação</h3>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm">
                {Math.round((score / quizQuestions.length) * 100)}% de acertos
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="bg-gray-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-700 transition-all"
              >
                Refazer Quiz
              </button>
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Começar Exercícios
              </Link>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              Pronto para transformar seu rosto? Explore nossos exercícios!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Glowface
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-800 rounded-full px-4 py-2">
                <span className="text-sm font-semibold text-yellow-400">
                  {score}/{quizQuestions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/20 rounded-3xl p-6 sm:p-10 mb-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Quiz Glowface</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showResult = showExplanation

              let buttonClass = 'w-full text-left p-4 sm:p-6 rounded-xl border-2 transition-all font-semibold '
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += 'border-green-500 bg-green-500/10 text-green-400'
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-500/10 text-red-400'
                } else {
                  buttonClass += 'border-gray-700 bg-gray-800/50 text-gray-500'
                }
              } else {
                if (isSelected) {
                  buttonClass += 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                } else {
                  buttonClass += 'border-gray-700 bg-gray-800/50 text-white hover:border-yellow-500/50 hover:bg-gray-800'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg">{option}</span>
                    {showResult && isCorrect && (
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="w-6 h-6 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-400 mb-2">Explicação</h3>
                  <p className="text-gray-300">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-500/50'
              }`}
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all inline-flex items-center justify-center gap-2 text-lg"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">
            💡 <span className="font-semibold text-white">Dica:</span> Leia cada pergunta com atenção e escolha a resposta que melhor representa os benefícios do Glowface!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Glowface
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Glowface. Transforme seu rosto naturalmente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
