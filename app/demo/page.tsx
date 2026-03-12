// app/demo/page.tsx - Demo stránka s testovacími otázkami
"use client"

import { useState } from "react"
import UniversalQuizRenderer from "@/components/UniversalQuizRenderer"
import { Play, Pause, SkipBack, SkipForward, Settings, Palette, Zap, Volume2, Video, Award } from "lucide-react"

type QuestionType = "simple" | "abcd" | "abcdef" | "bonus" | "audio" | "video"

interface Question {
  id: string
  type: QuestionType
  text: string
  answers: string[]
  correctAnswer: number | number[]
  points: number
  category: string
  description: string
}

const demoQuestions: Question[] = [
  {
    id: "1",
    type: "simple",
    text: "Které pivo vaří pivovar Pilsner Urquell?",
    answers: ["Pilsner Urquell"],
    correctAnswer: 0,
    points: 1,
    category: "Piva",
    description: "Jednoduchá otázka s jednou správnou odpovědí"
  },
  {
    id: "2",
    type: "abcd",
    text: "Vyberte správné české pivo:",
    answers: ["Pilsner Urquell", "Budweiser Budvar", "Staropramen", "Kozel"],
    correctAnswer: 0,
    points: 2,
    category: "Piva",
    description: "Výběr ze 4 možností (ABCD)"
  },
  {
    id: "3",
    type: "abcdef",
    text: "Které z těchto piv jsou česká?",
    answers: ["Pilsner Urquell", "Budweiser Budvar", "Staropramen", "Kozel", "Guinness", "Heineken"],
    correctAnswer: [0, 1, 2, 3],
    points: 3,
    category: "Piva",
    description: "Výběr z 6 možností (ABCDEF) - více správných odpovědí"
  },
  {
    id: "4",
    type: "bonus",
    text: "Bonusová otázka: Který rok byl založen Budvar?",
    answers: ["1895", "Budějovický Budvar", "České Budějovice", "Státní podnik"],
    correctAnswer: 0,
    points: 5,
    category: "Historie",
    description: "Postupné odhalování informací"
  },
  {
    id: "5",
    type: "audio",
    text: "Poslechněte si zvuk a určete pivo:",
    answers: ["Pilsner Urquell", "Budweiser Budvar", "Staropramen", "Kozel"],
    correctAnswer: 1,
    points: 4,
    category: "Zvuky",
    description: "Audio otázka s přehráváním zvuku"
  },
  {
    id: "6",
    type: "video",
    text: "Sledujte video a odpovězte na otázku:",
    answers: ["Plzeň", "České Budějovice", "Praha", "Brno"],
    correctAnswer: 0,
    points: 4,
    category: "Videa",
    description: "Video otázka s ukázkou"
  }
]

const templatePresets = [
  {
    id: "blue",
    name: "Modrý gradient",
    backgroundColor: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    textColor: "#ffffff",
    primaryColor: "#60a5fa",
    fontFamily: "Inter, sans-serif",
    borderRadius: "1rem",
    showAnimations: true
  },
  {
    id: "dark",
    name: "Tmavý profesionální",
    backgroundColor: "#111827",
    textColor: "#f9fafb",
    primaryColor: "#8b5cf6",
    fontFamily: "Roboto, sans-serif",
    borderRadius: "0.5rem",
    showAnimations: true
  },
  {
    id: "green",
    name: "Zelená příroda",
    backgroundColor: "linear-gradient(135deg, #065f46, #10b981)",
    textColor: "#f0fdf4",
    primaryColor: "#34d399",
    fontFamily: "Poppins, sans-serif",
    borderRadius: "2rem",
    showAnimations: true
  },
  {
    id: "simple",
    name: "Jednoduchý bílý",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    primaryColor: "#3b82f6",
    fontFamily: "Arial, sans-serif",
    borderRadius: "0.25rem",
    showAnimations: false
  }
]

export default function DemoPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(templatePresets[0])

  const currentQuestion = demoQuestions[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === demoQuestions.length - 1

  const handleNext = () => {
    if (showAnswer) {
      if (!isLastQuestion) {
        setCurrentQuestionIndex(prev => prev + 1)
        setShowAnswer(false)
      }
    } else {
      setShowAnswer(true)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setShowAnswer(false)
    }
  }

  const handleTemplateChange = (template: typeof templatePresets[0]) => {
    setSelectedTemplate(template)
  }



  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case "simple": return <Zap className="h-4 w-4" />
      case "abcd": case "abcdef": return <span className="font-bold">A-D</span>
      case "bonus": return <Award className="h-4 w-4" />
      case "audio": return <Volume2 className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control panel */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demo kvízového rendereru</h1>
              <p className="text-gray-600">Ukázka všech typů otázek a funkcí</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">


              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
                  <Palette className="h-4 w-4" />
                  Šablony
                </button>
                
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {templatePresets.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span>{template.name}</span>
                      {selectedTemplate.id === template.id && (
                        <div className="h-3 w-3 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                <Settings className="h-4 w-4" />
                Nastavení
              </button>
            </div>
          </div>

          {/* Progress and question selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">
                Otázka {currentQuestionIndex + 1} z {demoQuestions.length}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {currentQuestion.category} • {currentQuestion.points} bodů
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {demoQuestions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(index)
                    setShowAnswer(false)
                  }}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    index === currentQuestionIndex
                      ? index < currentQuestionIndex || showAnswer
                        ? 'bg-green-500'
                        : 'bg-blue-600'
                      : index < currentQuestionIndex
                      ? 'bg-green-300'
                      : 'bg-gray-300'
                  }`}
                  title={`${q.type}: ${q.description}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={isFirstQuestion}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SkipBack className="h-4 w-4" />
                  Předchozí
                </button>

                <div className="flex items-center gap-3">
                  {getTypeIcon(currentQuestion.type)}
                  <span className="font-medium">{currentQuestion.description}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className={`px-4 py-2 rounded-lg ${showAnswer ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {showAnswer ? 'Skrýt odpověď' : 'Zobrazit odpověď'}
                </button>

                <button
                  onClick={handleNext}
                  disabled={isLastQuestion && showAnswer}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  {showAnswer ? 'Další otázka' : 'Odpovědět'}
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main renderer */}
      <div className="pt-48">
        <UniversalQuizRenderer
          question={{
            id: currentQuestion.id,
            type: currentQuestion.type,
            text: currentQuestion.text,
            answers: currentQuestion.answers,
            correctAnswer: currentQuestion.correctAnswer,
            points: currentQuestion.points,
            category: currentQuestion.category
          }}
          template={{
            backgroundColor: selectedTemplate.backgroundColor,
            textColor: selectedTemplate.textColor,
            primaryColor: selectedTemplate.primaryColor,
            fontFamily: selectedTemplate.fontFamily,
            borderRadius: selectedTemplate.borderRadius,
            showAnimations: selectedTemplate.showAnimations
          }}
          showAnswer={showAnswer}
          onNext={handleNext}
          onPrev={!isFirstQuestion ? handlePrev : undefined}
          onAnswerReveal={(isCorrect) => {
            console.log(`Odpověď byla ${isCorrect ? 'správná' : 'špatná'}`)
          }}
        />
      </div>

      {/* Question type grid */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Všechny typy otázek</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                  currentQuestionIndex === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setCurrentQuestionIndex(index)
                  setShowAnswer(false)
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      currentQuestionIndex === index ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getTypeIcon(question.type)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{question.type.toUpperCase()}</div>
                      <div className="text-sm text-gray-600">{question.category}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {question.points} bodů
                  </div>
                </div>

                <div className="text-gray-900 font-medium mb-3">{question.text}</div>
                <div className="text-sm text-gray-600">{question.description}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {question.answers.slice(0, 3).map((answer, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {answer}
                    </span>
                  ))}
                  {question.answers.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      +{question.answers.length - 3} více
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}