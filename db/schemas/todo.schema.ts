import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const TodoTable = sqliteTable('todo', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  body: text().notNull(),
  completed: int({ mode: 'boolean' }).notNull().default(false)
})

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  body: z.string().min(1),
  completed: z.boolean()
})

export const TodoCreateSchema = TodoSchema.omit({ id: true, completed: true })
export const TodoUpdateSchema = TodoCreateSchema.partial()
