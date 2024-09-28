import AuthProviders from '@/components/providers'
import type { Metadata } from 'next'
// import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
// import { Providers } from './providers'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'CarePlus Software Hospital Management',
  description: 'Hospital Management System'
}

export default async function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await getServerSession()
  return (
      <html lang="en"
      // className='dark'
      >
        <AuthProviders>
            <body className={inter.className}
            >{children}</body>
        </AuthProviders>
      </html>
  )
}
