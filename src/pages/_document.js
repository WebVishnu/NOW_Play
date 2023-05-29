import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='xl:px-[8em] sm:px-[3em] px-[1em] scrollbar'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
