// app/admin/questions/page.tsx - Správa otázek
"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, Download, MoreVertical } from "lucide-react"

type QuestionType = "simple" | "abcd" | "bonus" | "audio" | "video"

interface Question {
  id: string
  text: string
  type: QuestionType
  category: string
  difficulty: "easy" | "medium" | "hard"
  createdAt: string
  usedIn: number
}

export default function QuestionsPage() {
  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState<QuestionType | "all">("all")

  const questions: Question[] = [
    { id: "1", text: "Které pivo vaří Pilsner Urquell?", type: "simple", category: "Piva", difficulty: "easy", createdAt: "2026-03-09", usedIn: 5 },
    { id: "2", text: "Vyberte správné české pivo:", type: "abcd", category: "Piva", difficulty: "medium", createdAt: "2026-03-08", usedIn: 3 },
    { id: "3", text: "Bonusová otázka: Který rok byl založen Budvar?", type: "bonus", category: "Historie", difficulty: "hard", createdAt: "2026-03-07", usedIn: 2 },
    { id: "4", text: "Poslechněte si zvuk a určete pivo", type: "audio", category: "Zvuky", difficulty: "medium", createdAt: "2026-03-06", usedIn: 1 },
    { id: "5", text: "Sledujte video a odpovězte na otázku", type: "video", category: "Videa", difficulty: "hard", createdAt: "2026-03-05", usedIn: 4 },
  ]

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(search.toLowerCase()) || 
                         q.category.toLowerCase().includes(search.toLowerCase())
    const matchesType = selectedType === "all" || q.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: QuestionType) => {
    switch (type) {
      case "simple": return "bg-blue-100 text-blue-800"
      case "abcd": return "bg-green-100 text-green-800"
      case "bonus": return "bg-purple-100 text-purple-800"
      case "audio": return "bg-orange-100 text-orange-800"
      case "video": return "bg-red-100 text-red-800"
    }
  }

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case "simple": return "Jednoduchá"
      case "abcd": return "ABCD"
      case "bonus": return "Bonusová"
      case "audio": return "Audio"
      case "video": return "Video"
    }
  }

  const getDifficultyColor = (difficulty: Question["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "hard": return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Správa otázek</h1>
          <p className="text-gray-600">Spravujte všechny otázky v databázi podle specifikace</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Přidat otázku
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Hledat</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Hledat otázku nebo kategorii..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Type filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Typ otázky</label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 px-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as QuestionType | "all")}
            >
              <option value="all">Všechny typy</option>
              <option value="simple">Jednoduchá</option>
              <option value="abcd">ABCD</option>
              <option value="bonus">Bonusová</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-end gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filtry
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-600">Celkem otázek</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">156</p>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-600">Použito v kvízech</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">42</p>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-600">Kategorie</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-600">Dnes přidané</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
        </div>
      </div>

      {/* Questions table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Otázka</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Typ</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategorie</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Obtížnost</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Vytvořeno</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Použito</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="font-medium text-gray-900">{question.text}</p>
                      <p className="text-sm text-gray-600">ID: {question.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(question.type)}`}>
                      {getTypeLabel(question.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{question.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty === "easy" ? "Lehká" : question.difficulty === "medium" ? "Střední" : "Těžká"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{question.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{question.usedIn}</span>
                    <span className="text-sm text-gray-600"> kvízů</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100" title="Náhled">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" title="Upravit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" title="Smazat">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100" title="Více">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-600">
            Zobrazeno <span className="font-medium">1-5</span> z <span className="font-medium">156</span> otázek
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Předchozí
            </button>
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Další
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}