import type { FC } from 'hono/jsx'
import type { Todo } from '../../models/todo.model.ts'

const Header: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">
            <strong>tomx</strong>
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <a role="button" href="/todos/create">
            Create New
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Header
