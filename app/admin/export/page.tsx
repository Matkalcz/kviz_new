// app/admin/export/page.tsx - Generování prezentací
"use client"

import { useState } from "react"
import { Download, FileText, Presentation, Code, Eye, Printer, Settings, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ExportPage() {
  const [selectedQuiz, setSelectedQuiz] = useState("1")
  const [exportFormat, setExportFormat] = useState("pptx")
  const [exportOptions, setExportOptions] = useState({
    includeAnswers: true,
    includeTemplates: true,
    includeMetadata: true,
    compressImages: false,
    watermarked: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Mock data - v reálné aplikaci by bylo z API
  const quizzes = [
    { id: "1", name: "Hospodský kvíz #1", questions: 20, rounds: 4 },
    { id: "2", name: "Firemní teambuilding", questions: 15, rounds: 3 },
    { id: "3", name: "Vánoční speciál", questions: 25, rounds: 5 },
    { id: "4", name: "Pivní mistrovství", questions: 30, rounds: 6 },
  ]

  const formats = [
    { id: "pptx", name: "PowerPoint prezentace", icon: Presentation, description: "PPTX soubor pro prezentování na projektoru", color: "bg-blue-100 text-blue-800" },
    { id: "pdf", name: "PDF dokument", icon: FileText, description: "Tištěná verze s otázkami a odpověďmi", color: "bg-red-100 text-red-800" },
    { id: "json", name: "JSON data", icon: Code, description: "Strukturovaná data pro další použití", color: "bg-green-100 text-green-800" },
  ]

  const handleExport = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    // Simulace generování
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Po dokončení simulace
    setTimeout(() => {
      clearInterval(interval)
      setIsGenerating(false)
      setProgress(100)
      
      // Demo - v reálné aplikaci by bylo stažení souboru
      alert(`Prezentace vygenerována ve formátu ${exportFormat.toUpperCase()}`)
    }, 2000)
  }

  const selectedQuizData = quizzes.find(q => q.id === selectedQuiz)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generování prezentací</h1>
          <p className="text-gray-600">Exportujte kvízy do různých formátů pro prezentování</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            Náhled pro tisk
          </button>
          
          <button
            onClick={handleExport}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generování ({progress}%)
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Vygenerovat prezentaci
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Levý sloupec: Výběr kvízu a formátu */}
        <div className="space-y-6">
          <div className="rounded border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Presentation className="h-5 w-5" />
              Výběr kvízu
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vyberte kvíz pro export
                </label>
                <div className="space-y-3">
                  {quizzes.map(quiz => (
                    <div
                      key={quiz.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedQuiz === quiz.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedQuiz(quiz.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{quiz.name}</div>
                          <div className="text-sm text-gray-600">
                            {quiz.questions} otázek, {quiz.rounds} kol
                          </div>
                        </div>
                        {selectedQuiz === quiz.id && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formát exportu
                </label>
                <div className="space-y-3">
                  {formats.map(format => {
                    const Icon = format.icon
                    return (
                      <div
                        key={format.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          exportFormat === format.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setExportFormat(format.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${format.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{format.name}</div>
                            <div className="text-sm text-gray-600">{format.description}</div>
                          </div>
                          {exportFormat === format.id && (
                            <div className="h-3 w-3 rounded-full bg-blue-600" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded border bg-white p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Možnosti exportu
            </h3>
            
            <div className="space-y-3">
              {Object.entries(exportOptions).map(([key, value]) => {
                const labels: Record<string, string> = {
                  includeAnswers: "Zahrnout správné odpovědi",
                  includeTemplates: "Zahrnout šablony vzhledu",
                  includeMetadata: "Zahrnout metadata kvízu",
                  compressImages: "Komprimovat obrázky",
                  watermarked: "Přidat vodoznak",
                }
                
                const descriptions: Record<string, string> = {
                  includeAnswers: "Přidá správné odpovědi za každou otázkou",
                  includeTemplates: "Použije vybrané šablony pro vzhled",
                  includeMetadata: "Zahrne informace o autorovi a datu vytvoření",
                  compressImages: "Zmenší velikost obrázků pro rychlejší načítání",
                  watermarked: "Přidá nenápadný vodoznak s logem",
                }
                
                return (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setExportOptions(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-700">{labels[key]}</div>
                      <div className="text-sm text-gray-500">{descriptions[key]}</div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {/* Prostřední sloupec: Náhled prezentace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded border bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Náhled prezentace
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Odhadovaná doba generování: 10-30 sekund</span>
              </div>
            </div>

            {/* Náhled podle formátu */}
            {exportFormat === "pptx" && (
              <div className="space-y-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Titulní slide */}
                    <div className="flex-1 p-8 flex flex-col justify-center items-center text-white">
                      <div className="text-4xl font-bold mb-4">{selectedQuizData?.name}</div>
                      <div className="text-xl text-gray-300">Prezentace kvízu</div>
                      <div className="mt-8 text-gray-400">Vygenerováno: {new Date().toLocaleDateString('cs-CZ')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-video bg-gray-800 rounded p-4 flex flex-col justify-center items-center text-white">
                    <div className="text-lg font-bold">Slide 1</div>
                    <div className="text-sm text-gray-300">Titulní strana</div>
                  </div>
                  <div className="aspect-video bg-blue-900 rounded p-4 flex flex-col justify-center items-center text-white">
                    <div className="text-lg font-bold">Slide 2</div>
                    <div className="text-sm text-gray-300">Pravidla kvízu</div>
                  </div>
                  <div className="aspect-video bg-purple-900 rounded p-4 flex flex-col justify-center items-center text-white">
                    <div className="text-lg font-bold">Slide 3</div>
                    <div className="text-sm text-gray-300">Kolo 1 - Otázka 1</div>
                  </div>
                </div>
              </div>
            )}

            {exportFormat === "pdf" && (
              <div className="space-y-6">
                <div className="border rounded-lg p-8 bg-white shadow-sm">
                  <div className="text-center mb-8">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{selectedQuizData?.name}</div>
                    <div className="text-gray-600">Dokument pro tisk</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Obsah kvízu</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-gray-600">Celkem otázek</div>
                          <div className="text-2xl font-bold">{selectedQuizData?.questions}</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-gray-600">Kol</div>
                          <div className="text-2xl font-bold">{selectedQuizData?.rounds}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Ukázková otázka</h3>
                      <div className="p-6 border rounded-lg bg-gray-50">
                        <div className="font-medium text-lg mb-4">Které pivo vaří pivovar Pilsner Urquell?</div>
                        <div className="space-y-2">
                          {["Pilsner Urquell", "Budweiser Budvar", "Staropramen", "Kozel"].map((option, i) => (
                            <div key={i} className="p-3 border rounded">
                              {i === 0 ? "✓ " : ""}{option}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {exportFormat === "json" && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-gray-100 text-sm overflow-x-auto">
{`{
  "quiz": {
    "id": "${selectedQuiz}",
    "name": "${selectedQuizData?.name}",
    "metadata": {
      "questions": ${selectedQuizData?.questions},
      "rounds": ${selectedQuizData?.rounds},
      "createdAt": "${new Date().toISOString()}",
      "exportFormat": "${exportFormat}"
    },
    "options": ${JSON.stringify(exportOptions, null, 2)},
    "structure": {
      "rounds": [
        {
          "name": "Kolo 1",
          "questions": ${Math.ceil((selectedQuizData?.questions || 0) / (selectedQuizData?.rounds || 1))}
        }
      ]
    }
  }
}`}</pre>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">JSON struktura</div>
                      <div className="text-sm text-blue-700">
                        Tento formát obsahuje kompletní data kvízu včetně otázek, odpovědí a metadat.
                        Vhodné pro další zpracování nebo import do jiných systémů.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technické informace */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded border bg-white p-6">
              <h3 className="text-lg font-semibold mb-4">Technické detaily</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-gray-600">Očekávaná velikost</div>
                  <div className="font-medium">
                    {exportFormat === "pptx" ? "2-5 MB" : 
                     exportFormat === "pdf" ? "1-3 MB" : 
                     "50-200 KB"}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Kvalita</div>
                  <div className="font-medium">Vysoká (print-ready)</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Kompatibilita</div>
                  <div className="font-medium">
                    {exportFormat === "pptx" ? "PowerPoint 2013+" : 
                     exportFormat === "pdf" ? "Adobe Reader 9+" : 
                     "Všechny systémy"}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-600">Šifrování</div>
                  <div className="font-medium">AES-256 (volitelné)</div>
                </div>
              </div>
            </div>

            <div className="rounded border bg-white p-6">
              <h3 className="text-lg font-semibold mb-4">Rychlé tipy</h3>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mt-0.5">1</div>
                  <span>PPTX je nejlepší pro prezentování na projektoru</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mt-0.5">2</div>
                  <span>PDF je optimální pro tisk a sdílení</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mt-0.5">3</div>
                  <span>JSON použijte pro automatizované zpracování</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mt-0.5">4</div>
                  <span>Vodoznak chrání vaše autorská práva</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}