import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { Providers } from './providers'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'ψnergy Data Group',
  description: 'Mother ANgela'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  )
}
