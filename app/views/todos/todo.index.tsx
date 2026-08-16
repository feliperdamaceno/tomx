import type { FC } from 'hono/jsx'

import type { Todo } from '../../models/todo.model.ts'
import BaseLayout from '../layouts/base.tsx'
import TodoItem from '../todos/todo-item.tsx'

interface TodoPageProps {
  todos: Todo[]
}

const TodoPage: FC<TodoPageProps> = ({ todos }) => {
  return (
    <BaseLayout
      head={<title>Tomx</title>}
      body={
        <section>
          <h1>All Todos</h1>

          {todos.map((todo) => {
            return <TodoItem todo={todo} />
          })}
        </section>
      }
    />
  )
}

export default TodoPage
