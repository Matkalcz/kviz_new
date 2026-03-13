// app/admin/categories/page.tsx - Správa kategorií otázek
import { categories } from "@/lib/database"
import { Plus, Edit, Trash2, Tag, Palette, Hash } from "lucide-react"

export default async function CategoriesPage() {
  // Load categories from database
  const allCategories = categories.getAll()
  
  // Default categories if empty
  const defaultCategories = [
    { id: '1', name: 'Piva', description: 'Otázky o českých pivech', color: '#3b82f6', icon: '🍺' },
    { id: '2', name: 'Historie', description: 'Historické otázky', color: '#ef4444', icon: '📜' },
    { id: '3', name: 'Zeměpis', description: 'Geografické otázky', color: '#10b981', icon: '🌍' },
    { id: '4', name: 'Filmy', description: 'Filmové otázky', color: '#8b5cf6', icon: '🎬' },
    { id: '5', name: 'Hudba', description: 'Hudební otázky', color: '#f59e0b', icon: '🎵' },
    { id: '6', name: 'Sport', description: 'Sportovní otázky', color: '#ec4899', icon: '⚽' },
  ]

  const categoriesList = allCategories.length > 0 ? allCategories : defaultCategories

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Správa kategorií</h1>
          <p className="text-gray-600">Spravujte kategorie otázek pro lepší organizaci</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Přidat kategorii
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{categoriesList.length}</div>
              <div className="text-sm text-gray-600">Kategorií celkem</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Palette className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{new Set(categoriesList.map(c => c.color)).size}</div>
              <div className="text-sm text-gray-600">Unikátních barev</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Hash className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Použito v otázkách</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Název</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Popis</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Barva</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Ikona</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Akce</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: category.color || '#3b82f6' }}
                      >
                        {category.icon || category.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-600">ID: {category.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700">{category.description || '—'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 w-6 rounded border"
                        style={{ backgroundColor: category.color || '#3b82f6' }}
                      />
                      <span className="font-mono text-sm">{category.color || '#3b82f6'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-2xl">{category.icon || '—'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {categoriesList.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Žádné kategorie</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Vytvořte první kategorii pro organizaci otázek. Kategorie pomáhají filtrovat a vyhledávat otázky.
            </p>
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Jak používat kategorie</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Kategorie organizují otázky do tematických skupin</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Při vytváření otázky můžete vybrat kategorii z tohoto seznamu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Barva a ikona kategorie se zobrazí v přehledech a statistikách</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Každá kategorie může být použita v libovolném počtu otázek</span>
          </li>
        </ul>
      </div>
    </div>
  )
}