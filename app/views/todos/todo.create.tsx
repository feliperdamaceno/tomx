import type { FC } from 'hono/jsx'

import BaseLayout from '../layouts/base.tsx'

const TodoCreatePage: FC = () => {
  return (
    <BaseLayout
      head={<title>Todo Create</title>}
      body={
        <section>
          <h2>Todo Create</h2>

          <form hx-post="/todos/create">
            <input
              type="text"
              name="title"
              placeholder="Your title..."
              required
            />
            <textarea name="body" placeholder="Your description..." required />
            <input type="submit" value="Create" />
          </form>
        </section>
      }
    />
  )
}

export default TodoCreatePage
