import type { FC } from 'hono/jsx'
import type { Todo } from '../../models/todo.model.ts'

interface TodoItemProp {
  todo: Todo
}

const TodoItem: FC<TodoItemProp> = ({ todo }) => {
  return (
    <article id={`${todo.raw.id}`}>
      <h2>{todo.raw.title}</h2>
      <p>{todo.raw.body}</p>

      <div class="grid" style={{ maxWidth: '50%' }}>
        <a
          role="button"
          class="secondary"
          href={`/todos/${todo.raw.id}/update`}
        >
          Update
        </a>

        <button hx-delete={`/todos/${todo.raw.id}/destroy`}>Delete</button>
      </div>
    </article>
  )
}

export default TodoItem
