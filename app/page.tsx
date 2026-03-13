// app/page.tsx - Přesměrování na admin dashboard
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Přesměrování na admin dashboard
    router.push("/admin")
  }, [router])

  // Loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Přesměrování na administraci</h1>
        <p className="text-slate-300">Pokud přesměrování nefunguje, klikněte <a href="/admin" className="text-blue-400 hover:text-blue-300 underline">zde</a></p>
      </div>
    </div>
  )
}