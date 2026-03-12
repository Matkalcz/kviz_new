// app/admin/help/page.tsx - Nápověda (placeholder)
export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nápověda</h1>
        <p className="text-gray-600">Dokumentace a návody pro používání systému</p>
      </div>
      <div className="rounded-xl border bg-white p-12 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-4 text-4xl">❓</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Nápověda - ve vývoji</h3>
          <p className="text-gray-600">
            Tato sekce je aktuálně ve vývoji. Bude obsahovat uživatelskou dokumentaci, FAQ a návody pro vytváření kvízů.
          </p>
        </div>
      </div>
    </div>
  )
}