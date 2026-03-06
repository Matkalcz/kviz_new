import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Kviz New</h1>
          <p className="text-xl text-slate-300">
            Moderní systém pro hospodské kvízy s automatickým řízením
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">🎯 Cíle projektu</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Automatické řízení průběhu (žádné klikání moderátora)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Všechny typy otázek v jednom systému</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Konfigurovatelné šablony (pozadí, barvy, fonty)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Export PPTX/PDF prezentací</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Jednoduché pro technicky nezdatného admina</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">🚀 Rychlý start</h2>
            <div className="space-y-4">
              <Link
                href="/demo"
                className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
              >
                🎮 Spustit demo kvíz
              </Link>
              
              <Link
                href="/ZADANI.md"
                className="block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
              >
                📋 Zobrazit kompletní zadání
              </Link>
              
              <a
                href="https://github.com/matkalcz/kviz-new"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors border border-slate-600"
              >
                💻 GitHub repository
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">🎯 Typy otázek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: "Jednoduchá", desc: "Otázka → červená odpověď", color: "text-red-400" },
              { type: "ABCD", desc: "Všechny možnosti → zvýrazněná správná", color: "text-green-400" },
              { type: "Bonusová", desc: "Postupné odhalování všech odpovědí", color: "text-yellow-400" },
              { type: "Audio", desc: "Přehrát audio → odpověď", color: "text-blue-400" },
              { type: "Video", desc: "Náhled → fullscreen video → odpověď", color: "text-purple-400" },
              { type: "S obrázkem", desc: "Otázka s podporou obrázků", color: "text-pink-400" },
            ].map((item, index) => (
              <div key={index} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <h3 className={`font-bold text-lg mb-2 ${item.color}`}>{item.type}</h3>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">📊 Stav vývoje</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Fáze 1: Renderovací engine</span>
                <span className="text-green-400 font-bold">50%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Fáze 2: Automatické řízení</span>
                <span className="text-yellow-400 font-bold">10%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Fáze 3: Export PPTX/PDF</span>
                <span className="text-blue-400 font-bold">0%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>Kviz New • {new Date().getFullYear()} • Martin Kalian</p>
          <p className="text-sm mt-2">Moderní řešení pro hospodské kvízy bez PDF canvas problémů</p>
        </footer>
      </div>
    </div>
  );
}