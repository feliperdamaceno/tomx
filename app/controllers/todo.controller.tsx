import z from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import {
  TodoCreateSchema,
  TodoUpdateSchema
} from '../../db/schemas/todo.schema.ts'
import { Todo } from '../models/todo.model.ts'

import TodoPage from '../views/todos/todo.index.tsx'
import TodoItem from '../views/todos/todo-item.tsx'
import TodoCreatePage from '../views/todos/todo.create.tsx'
import TodoUpdatePage from '../views/todos/todo.update.tsx'

const ParamValidator = z.object({
  id: z.coerce.number().min(1)
})

export class TodoController {
  public readonly router: Hono

  constructor() {
    this.router = new Hono()

    this.router.get('/', async (ctx) => {
      const todos = await Todo.all()

      return ctx.html(<TodoPage todos={todos} />)
    })

    this.router.get(
      '/todos/show/:id',
      zValidator('param', ParamValidator),
      async (ctx) => {
        const { id } = ctx.req.valid('param')
        const todo = await Todo.find(id)

        return ctx.html(<TodoItem todo={todo} />)
      }
    )

    this.router.get('/todos/create', async (ctx) => {
      return ctx.html(<TodoCreatePage />)
    })

    this.router.post(
      '/todos/create',
      zValidator('form', TodoCreateSchema),
      async (ctx) => {
        const input = ctx.req.valid('form')
        await Todo.create(input)

        ctx.header('HX-Redirect', '/')
        return ctx.body(null)
      }
    )

    this.router.get(
      '/todos/:id/update',
      zValidator('param', ParamValidator),
      async (ctx) => {
        const { id } = ctx.req.valid('param')
        const todo = await Todo.find(id)
        return ctx.html(<TodoUpdatePage todo={todo} />)
      }
    )

    this.router.put(
      '/todos/:id/update',
      zValidator('param', ParamValidator),
      zValidator('form', TodoUpdateSchema),
      async (ctx) => {
        const { id } = ctx.req.valid('param')
        const input = ctx.req.valid('form')

        const todo = await Todo.find(id)
        todo.update(input)
        await todo.save()

        ctx.header('HX-Redirect', '/')
        return ctx.body(null)
      }
    )

    this.router.delete(
      '/todos/:id/destroy',
      zValidator('param', ParamValidator),
      async (ctx) => {
        const { id } = ctx.req.valid('param')
        const todo = await Todo.find(id)

        await todo.destroy()

        ctx.header('HX-Redirect', '/')
        return ctx.body(null)
      }
    )
  }
}
