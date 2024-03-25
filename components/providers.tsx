'use client'

import { SessionProvider } from 'next-auth/react'

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProviders
