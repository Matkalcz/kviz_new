// app/admin/page.tsx - Admin dashboard (zjednodušená)
"use client"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Přehled aktivit a statistik kvízového systému</p>
      </div>

      {/* Stats grid - zjednodušené */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border bg-white p-4">
          <p className="text-sm text-gray-600">Celkem kvízů</p>
          <p className="mt-1 text-2xl font-bold">24</p>
        </div>
        <div className="rounded border bg-white p-4">
          <p className="text-sm text-gray-600">Aktivní kvízy</p>
          <p className="mt-1 text-2xl font-bold">8</p>
        </div>
        <div className="rounded border bg-white p-4">
          <p className="text-sm text-gray-600">Otázek v DB</p>
          <p className="mt-1 text-2xl font-bold">156</p>
        </div>
        <div className="rounded border bg-white p-4">
          <p className="text-sm text-gray-600">Šablon</p>
          <p className="mt-1 text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Recent activities - zjednodušené */}
      <div className="rounded border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Poslední aktivity</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Vytvořen kvíz #5</span>
            <span className="text-xs text-gray-500">Před 2h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Upravena otázka</span>
            <span className="text-xs text-gray-500">Před 4h</span>
          </div>
        </div>
      </div>

      {/* Quick actions - zjednodušené */}
      <div className="rounded border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Rychlé akce</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <button className="rounded border p-3 text-center hover:bg-gray-50">
            <span className="block font-medium">Vytvořit kvíz</span>
          </button>
          <button className="rounded border p-3 text-center hover:bg-gray-50">
            <span className="block font-medium">Přidat otázku</span>
          </button>
          <button className="rounded border p-3 text-center hover:bg-gray-50">
            <span className="block font-medium">Vytvořit šablonu</span>
          </button>
        </div>
      </div>
    </div>
  )
}