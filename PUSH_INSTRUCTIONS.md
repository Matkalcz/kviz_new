# Instrukce pro push na GitHub

Projekt je připraven, ale nemám přístup k SSH klíči pro push na GitHub.

## Co je hotové:
1. ✅ Kompletní struktura projektu `kviz-new`
2. ✅ TypeScript typy pro šablonu (`TemplateConfig`)
3. ✅ Univerzální renderovací komponenta (`UniversalQuizRenderer`)
4. ✅ Demo stránka se všemi 5 typy otázek
5. ✅ Kompletní zadání podle naší diskuze
6. ✅ Git inicializováno a commitováno

## Co potřebuješ udělat ty:

### Varianta A: Push pomocí GitHub tokenu (doporučeno)
1. Vytvoř GitHub token: https://github.com/settings/tokens
   - Scope: `repo` (plný přístup k repository)
2. Spusť tyto příkazy:

```bash
cd /home/openclaw/.openclaw/workspace-domminik/kviz-new

# Přidej remote s tokenem
git remote add origin https://YOUR_GITHUB_TOKEN@github.com/matkalcz/kviz-new.git

# Pushni na GitHub
git push -u origin main
```

### Varianta B: Stáhni si projekt a pushni sám
1. Stáhni si celou složku `kviz-new`
2. Přidej ji do svého lokálního klonu `kviz-new` repository
3. Pushni změny

## Struktura projektu:
```
kviz-new/
├── README.md              # Popis projektu
├── ZADANI.md              # Kompletní zadání (sloučené)
├── package.json          # Závislosti
├── app/                  # Next.js app
│   ├── page.tsx         # Úvodní stránka
│   ├── demo/page.tsx    # Demo kvíz
│   └── globals.css      # Styly
├── components/
│   └── universal-quiz-renderer.tsx  # Hlavní komponenta
├── types/
│   └── template.ts      # TemplateConfig typy
└── PUSH_INSTRUCTIONS.md # Tyto instrukce
```

## Demo kvíz:
Spusť `npm run dev` a přejdi na `/demo` - uvidíš všech 5 typů otázek:
1. Jednoduchá otázka (text → červená odpověď)
2. ABCDEF otázka (možnosti → zvýrazněná správná)
3. Bonusová otázka (postupné odhalování)
4. Audio otázka (přehrát → odpověď)
5. Video otázka (náhled → fullscreen → odpověď)

## Další kroky po pushnutí:
1. Implementovat `QuizController` pro automatické řízení
2. Přidat `SequenceGenerator` pro vytváření sekvencí
3. Implementovat PPTX export pomocí `pptxgenjs`
4. Přidat admin rozhraní
5. Napojit na Convex backend

Projekt je připraven na další vývoj podle zadání!