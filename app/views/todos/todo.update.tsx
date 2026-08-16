import type { FC } from 'hono/jsx'

import type { Todo } from '../../models/todo.model.ts'
import BaseLayout from '../layouts/base.tsx'

interface TodoUpdatePageParams {
  todo: Todo
}

const TodoUpdatePage: FC<TodoUpdatePageParams> = ({ todo }) => {
  return (
    <BaseLayout
      head={<title>Todo Update</title>}
      body={
        <section>
          <h2>Todo Update</h2>

          <form hx-put={`/todos/${todo.raw.id}/update`}>
            <input
              type="text"
              name="title"
              value={todo.raw.title}
              placeholder="Your title..."
              required
            />
            <textarea name="body" placeholder="Your description..." required>
              {todo.raw.body}
            </textarea>
            <input type="submit" value="Update" />
          </form>
        </section>
      }
    />
  )
}

export default TodoUpdatePage
