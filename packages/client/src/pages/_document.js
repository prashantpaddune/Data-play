import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <title>Data Play - Your sandbox for SQL mastery</title>
        <meta name="description" content="Your sandbox for SQL mastery"/>
        <meta name="author" content="Prashant Paddune"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
