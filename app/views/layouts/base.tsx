import type { FC, Child } from 'hono/jsx'

import Header from '../components/header.tsx'

interface BaseLayoutProps {
  head: Child
  body: Child
}

const BaseLayout: FC<BaseLayoutProps> = ({ head, body }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"
          integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V"
          crossorigin="anonymous"
        />
        {head}
      </head>

      <body class="container" hx-boost="true">
        <Header />
        <main>{body}</main>
      </body>
    </html>
  )
}

export default BaseLayout
