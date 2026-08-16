import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { Database } from '../../db/client.ts'

import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

import { db } from '../../db/client.ts'
import { TodoSchema, TodoTable } from '../../db/schemas/todo.schema.ts'

type Attributes = InferSelectModel<typeof TodoTable>
type CreateAttributes = InferInsertModel<typeof TodoTable>
type UpdateAttributes = Partial<CreateAttributes>

export class Todo {
  private readonly db: Database
  private readonly attributes: Attributes

  private constructor(attributes: Attributes) {
    this.db = db
    this.attributes = attributes
  }

  get raw() {
    return this.attributes
  }

  public toggle() {
    this.attributes.completed = !this.attributes.completed!
  }

  public complete() {
    this.attributes.completed = true
  }

  public reopen() {
    this.attributes.completed = false
  }

  public async save() {
    const validated = TodoSchema.safeParse(this.attributes)
    if (!validated.success) throw new Error(validated.error.message)
    await this.db
      .update(TodoTable)
      .set(this.attributes)
      .where(eq(TodoTable.id, this.attributes.id))
    return this
  }

  public static async all() {
    const todos = await db.select().from(TodoTable)
    return todos.map((todo) => new Todo(todo))
  }

  public static async find(id: number) {
    const [todo] = await db.select().from(TodoTable).where(eq(TodoTable.id, id))
    if (!todo) throw new HTTPException(404, { message: 'Todo not found' })
    return new Todo(todo)
  }

  public static async create(input: CreateAttributes) {
    const [todo] = await db.insert(TodoTable).values(input).returning()
    return new Todo(todo)
  }

  public async update(input: UpdateAttributes) {
    Object.assign(this.attributes, input)
    return this
  }

  public async destroy() {
    await this.db.delete(TodoTable).where(eq(TodoTable.id, this.attributes.id))
  }
}
