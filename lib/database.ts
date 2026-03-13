import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'kviz.db')

// Ensure data directory exists
import fs from 'fs'
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true })
}

// Initialize database
const db = new Database(dbPath)

// Create tables if they don't exist
export function initDatabase() {
  // Templates table
  db.exec(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      background_color TEXT,
      text_color TEXT,
      accent_color TEXT,
      font_family TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      color TEXT DEFAULT '#3b82f6',
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Questions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('simple', 'ab', 'abcdef', 'bonus', 'audio', 'video')),
      correct_answer TEXT,
      options TEXT, -- JSON array for ab/abcdef questions
      media_url TEXT, -- For audio/video questions
      points INTEGER DEFAULT 1,
      category TEXT REFERENCES categories(id),
      difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Quizzes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      template_id TEXT REFERENCES templates(id),
      sequence TEXT, -- JSON array of slide IDs and types
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      author TEXT
    )
  `)

  // Quiz questions junction table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_questions (
      quiz_id TEXT REFERENCES quizzes(id) ON DELETE CASCADE,
      question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
      order_index INTEGER,
      round_number INTEGER DEFAULT 1,
      PRIMARY KEY (quiz_id, question_id)
    )
  `)

  // Exports table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exports (
      id TEXT PRIMARY KEY,
      quiz_id TEXT REFERENCES quizzes(id),
      format TEXT CHECK(format IN ('pptx', 'pdf')),
      file_path TEXT,
      generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed'))
    )
  `)

  console.log('Database initialized successfully')
}

// Template operations
export const templates = {
  getAll: () => db.prepare('SELECT * FROM templates ORDER BY name').all(),
  getById: (id: string) => db.prepare('SELECT * FROM templates WHERE id = ?').get(id),
  create: (data: any) => {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO templates (id, name, background_color, text_color, accent_color, font_family)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, data.name, data.background_color, data.text_color, data.accent_color, data.font_family)
    return id
  },
  update: (id: string, data: any) => {
    db.prepare(`
      UPDATE templates 
      SET name = ?, background_color = ?, text_color = ?, accent_color = ?, font_family = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.name, data.background_color, data.text_color, data.accent_color, data.font_family, id)
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM templates WHERE id = ?').run(id)
  }
}

// Category operations
export const categories = {
  getAll: () => db.prepare('SELECT * FROM categories ORDER BY name').all(),
  getById: (id: string) => db.prepare('SELECT * FROM categories WHERE id = ?').get(id),
  getByName: (name: string) => db.prepare('SELECT * FROM categories WHERE name = ?').get(name),
  create: (data: any) => {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO categories (id, name, description, color, icon)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, data.name, data.description, data.color || '#3b82f6', data.icon || '')
    return id
  },
  update: (id: string, data: any) => {
    db.prepare(`
      UPDATE categories 
      SET name = ?, description = ?, color = ?, icon = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.name, data.description, data.color, data.icon, id)
  },
  delete: (id: string) => {
    // Check if category is used by any questions
    const used = db.prepare('SELECT COUNT(*) as count FROM questions WHERE category = ?').get(id)
    if (used.count > 0) {
      throw new Error('Category cannot be deleted because it is used by questions')
    }
    db.prepare('DELETE FROM categories WHERE id = ?').run(id)
  }
}

// Question operations
export const questions = {
  getAll: () => db.prepare('SELECT * FROM questions ORDER BY created_at DESC').all(),
  getById: (id: string) => db.prepare('SELECT * FROM questions WHERE id = ?').get(id),
  getByType: (type: string) => db.prepare('SELECT * FROM questions WHERE type = ? ORDER BY created_at DESC').all(type),
  create: (data: any) => {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO questions (id, text, type, correct_answer, options, media_url, points, category, difficulty)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, 
      data.text, 
      data.type, 
      data.correct_answer, 
      JSON.stringify(data.options || []),
      data.media_url,
      data.points || 1,
      data.category,
      data.difficulty || 'medium'
    )
    return id
  },
  update: (id: string, data: any) => {
    db.prepare(`
      UPDATE questions 
      SET text = ?, type = ?, correct_answer = ?, options = ?, media_url = ?, points = ?, category = ?, difficulty = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.text, 
      data.type, 
      data.correct_answer, 
      JSON.stringify(data.options || []),
      data.media_url,
      data.points || 1,
      data.category,
      data.difficulty || 'medium',
      id
    )
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM questions WHERE id = ?').run(id)
  }
}

// Quiz operations
export const quizzes = {
  getAll: () => db.prepare('SELECT * FROM quizzes ORDER BY created_at DESC').all(),
  getById: (id: string) => db.prepare('SELECT * FROM quizzes WHERE id = ?').get(id),
  create: (data: any) => {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO quizzes (id, name, description, template_id, sequence, status, author)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.description,
      data.template_id,
      JSON.stringify(data.sequence || []),
      data.status || 'draft',
      data.author || 'admin'
    )
    return id
  },
  update: (id: string, data: any) => {
    db.prepare(`
      UPDATE quizzes 
      SET name = ?, description = ?, template_id = ?, sequence = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.name,
      data.description,
      data.template_id,
      JSON.stringify(data.sequence || []),
      data.status || 'draft',
      id
    )
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM quizzes WHERE id = ?').run(id)
  },
  addQuestion: (quizId: string, questionId: string, orderIndex: number, roundNumber: number = 1) => {
    db.prepare(`
      INSERT OR REPLACE INTO quiz_questions (quiz_id, question_id, order_index, round_number)
      VALUES (?, ?, ?, ?)
    `).run(quizId, questionId, orderIndex, roundNumber)
  },
  removeQuestion: (quizId: string, questionId: string) => {
    db.prepare('DELETE FROM quiz_questions WHERE quiz_id = ? AND question_id = ?').run(quizId, questionId)
  },
  getQuestions: (quizId: string) => {
    return db.prepare(`
      SELECT q.*, qq.order_index, qq.round_number
      FROM questions q
      JOIN quiz_questions qq ON q.id = qq.question_id
      WHERE qq.quiz_id = ?
      ORDER BY qq.order_index
    `).all(quizId)
  }
}

// Export operations
export const exports = {
  create: (quizId: string, format: string) => {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO exports (id, quiz_id, format, status)
      VALUES (?, ?, ?, 'pending')
    `).run(id, quizId, format)
    return id
  },
  updateStatus: (id: string, status: string, filePath?: string) => {
    db.prepare(`
      UPDATE exports 
      SET status = ?, file_path = ?, generated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, filePath, id)
  },
  getByQuiz: (quizId: string) => {
    return db.prepare('SELECT * FROM exports WHERE quiz_id = ? ORDER BY generated_at DESC').all(quizId)
  }
}

// Initialize database on import
initDatabase()

export default db