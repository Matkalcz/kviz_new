// app/demo/page.tsx
"use client"

import { useState } from "react"
import { UniversalQuizRenderer, QuestionData, QuizState } from "@/components/universal-quiz-renderer"
import { DEFAULT_TEMPLATE } from "@/types/template"
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from "lucide-react"

const DEMO_QUESTIONS: QuestionData[] = [
  {
    id: '1',
    text: 'Jaké je hlavní město České republiky?',
    type: 'simple',
    correctAnswer: 'Praha',
    questionNumber: 1,
    roundNumber: 1,
    category: 'Zeměpis',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'Který z těchto jazyků je programovací jazyk?',
    type: 'abcdef',
    options: [
      { label: 'A', text: 'Python', isCorrect: true },
      { label: 'B', text: 'Francouzština' },
      { label: 'C', text: 'HTML' },
      { label: 'D', text: 'CSS' },
      { label: 'E', text: 'JavaScript', isCorrect: true },
      { label: 'F', text: 'Ruský' }
    ],
    questionNumber: 2,
    roundNumber: 1,
    category: 'Informatika',
    difficulty: 'medium'
  },
  {
    id: '3',
    text: 'Bonusová otázka: Uveďte 3 barvy české vlajky',
    type: 'bonus',
    bonusAnswers: ['Bílá', 'Červená', 'Modrá'],
    questionNumber: 3,
    roundNumber: 1,
    category: 'Vlastenectví',
    difficulty: 'easy'
  },
  {
    id: '4',
    text: 'Poslechněte si tuto píseň a uhodněte interpreta',
    type: 'audio',
    correctAnswer: 'Karel Gott',
    questionNumber: 4,
    roundNumber: 1,
    category: 'Hudba',
    difficulty: 'hard'
  },
  {
    id: '5',
    text: 'Podívejte se na video a uhodněte, o jaký film se jedná',
    type: 'video',
    correctAnswer: 'Pelíšky',
    questionNumber: 5,
    roundNumber: 1,
    category: 'Film',
    difficulty: 'medium'
  }
]

const QUESTION_STATES: QuizState[] = ['question', 'answers', 'media', 'bonus_step', 'revealed']

export default function DemoPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentState, setCurrentState] = useState<QuizState>('question')
  const [bonusStep, setBonusStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const currentQuestion = DEMO_QUESTIONS[currentQuestionIndex]
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < DEMO_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setCurrentState('question')
      setBonusStep(0)
    }
  }
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setCurrentState('question')
      setBonusStep(0)
    }
  }
  
  const handleNextState = () => {
    const currentStateIndex = QUESTION_STATES.indexOf(currentState)
    
    if (currentQuestion.type === 'bonus' && currentState === 'bonus_step') {
      // Pro bonus: postupně zvyšuj počet odpovědí
      if (bonusStep < (currentQuestion.bonusAnswers?.length || 0)) {
        setBonusStep(prev => prev + 1)
        if (bonusStep + 1 === (currentQuestion.bonusAnswers?.length || 0)) {
          setCurrentState('revealed')
        }
      } else {
        setCurrentState('revealed')
      }
    } else if (currentStateIndex < QUESTION_STATES.length - 1) {
      const nextState = QUESTION_STATES[currentStateIndex + 1]
      // Přeskoč stavy, které pro tuto otázku nedávají smysl
      if (
        (currentQuestion.type === 'simple' && nextState === 'answers') ||
        (currentQuestion.type === 'simple' && nextState === 'media') ||
        (currentQuestion.type === 'simple' && nextState === 'bonus_step') ||
        (currentQuestion.type === 'abcdef' && nextState === 'media') ||
        (currentQuestion.type === 'abcdef' && nextState === 'bonus_step') ||
        (currentQuestion.type === 'bonus' && nextState === 'answers') ||
        (currentQuestion.type === 'bonus' && nextState === 'media') ||
        (currentQuestion.type === 'audio' && nextState === 'answers') ||
        (currentQuestion.type === 'audio' && nextState === 'bonus_step') ||
        (currentQuestion.type === 'video' && nextState === 'answers') ||
        (currentQuestion.type === 'video' && nextState === 'bonus_step')
      ) {
        setCurrentState('revealed')
      } else {
        setCurrentState(nextState)
      }
    }
  }
  
  const handlePrevState = () => {
    const currentStateIndex = QUESTION_STATES.indexOf(currentState)
    if (currentStateIndex > 0) {
      setCurrentState(QUESTION_STATES[currentStateIndex - 1])
    }
  }
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setCurrentState('question')
    setBonusStep(0)
  }
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  
  const handleMediaEnd = () => {
    setCurrentState('revealed')
  }
  
  const handleStateChange = (state: QuizState) => {
    setCurrentState(state)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hlavní obsah - kvíz */}
      <div className="h-screen">
        <UniversalQuizRenderer
          question={currentQuestion}
          template={DEFAULT_TEMPLATE}
          state={currentState}
          onStateChange={handleStateChange}
          onMediaEnd={handleMediaEnd}
          autoPlayMedia={isPlaying}
          bonusStep={bonusStep}
          className="w-full h-full"
        />
      </div>
      
      {/* Ovládací panel */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-2xl p-4 border border-slate-700 shadow-2xl z-50">
        <div className="flex items-center gap-4">
          {/* Navigace otázek */}
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Předchozí otázka"
          >
            <SkipBack size={20} className="text-white" />
          </button>
          
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
            title={isPlaying ? "Pozastavit" : "Přehrát"}
          >
            {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
          </button>
          
          {/* Navigace stavů */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevState}
              disabled={currentState === 'question'}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Předchozí stav"
            >
              <SkipBack size={16} className="text-white" />
            </button>
            
            <div className="min-w-[120px] text-center">
              <div className="text-sm font-semibold text-slate-300">
                {currentQuestion.type === 'simple' && 'Jednoduchá'}
                {currentQuestion.type === 'abcdef' && 'ABCDEF'}
                {currentQuestion.type === 'bonus' && 'Bonusová'}
                {currentQuestion.type === 'audio' && 'Audio'}
                {currentQuestion.type === 'video' && 'Video'}
              </div>
              <div className="text-xs text-slate-400">
                {currentState === 'question' && 'Otázka'}
                {currentState === 'answers' && 'Možnosti'}
                {currentState === 'media' && 'Media'}
                {currentState === 'bonus_step' && `Bonus (${bonusStep})`}
                {currentState === 'revealed' && 'Odpověď'}
              </div>
            </div>
            
            <button
              onClick={handleNextState}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Další stav"
            >
              <SkipForward size={16} className="text-white" />
            </button>
          </div>
          
          {/* Další otázka */}
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === DEMO_QUESTIONS.length - 1}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Další otázka"
          >
            <SkipForward size={20} className="text-white" />
          </button>
          
          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-3 rounded-xl bg-amber-600 hover:bg-amber-700 transition-colors"
            title="Restart"
          >
            <RefreshCw size={20} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Info panel */}
      <div className="fixed top-8 left-8 bg-black/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 max-w-md z-50">
        <h2 className="text-2xl font-bold text-white mb-4">Demo kvíz</h2>
        <p className="text-slate-300 mb-4">
          Testovací verze nového kvízového systému. Zobrazuje všech 5 typů otázek s různými stavy.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Otázka</span>
            <span className="text-white font-semibold">
              {currentQuestionIndex + 1} / {DEMO_QUESTIONS.length}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Typ</span>
            <span className="text-white font-semibold">
              {currentQuestion.type === 'simple' && 'Jednoduchá'}
              {currentQuestion.type === 'abcdef' && 'ABCDEF'}
              {currentQuestion.type === 'bonus' && 'Bonusová'}
              {currentQuestion.type === 'audio' && 'Audio'}
              {currentQuestion.type === 'video' && 'Video'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Stav</span>
            <span className="text-white font-semibold">
              {currentState === 'question' && 'Otázka'}
              {currentState === 'answers' && 'Možnosti'}
              {currentState === 'media' && 'Media'}
              {currentState === 'bonus_step' && `Bonus krok ${bonusStep}`}
              {currentState === 'revealed' && 'Odpověď'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Kolo</span>
            <span className="text-white font-semibold">{currentQuestion.roundNumber}. kolo</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Návod</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Klikni na tlačítka pro navigaci</li>
            <li>• Pro audio/video: klikni na tlačítko pro přehrání</li>
            <li>• Pro bonus: postupně odkrývej odpovědi</li>
            <li>• Pro ABCD: nejprve možnosti, pak správná</li>
          </ul>
        </div>
      </div>
      
      {/* Seznam otázek */}
      <div className="fixed top-8 right-8 bg-black/60 backdrop-blur-lg rounded-2xl p-4 border border-slate-700 z-50">
        <h3 className="text-lg font-semibold text-white mb-3">Otázky</h3>
        <div className="space-y-2">
          {DEMO_QUESTIONS.map((q, index) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestionIndex(index)
                setCurrentState('question')
                setBonusStep(0)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {index + 1}. {q.type === 'simple' && 'Jednoduchá'}
                  {q.type === 'abcdef' && 'ABCDEF'}
                  {q.type === 'bonus' && 'Bonusová'}
                  {q.type === 'audio' && 'Audio'}
                  {q.type === 'video' && 'Video'}
                </span>
                {index === currentQuestionIndex && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <div className="text-sm opacity-80 truncate">{q.text.substring(0, 30)}...</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}