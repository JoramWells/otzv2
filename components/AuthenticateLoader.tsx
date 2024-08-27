import { Loader2 } from 'lucide-react'
import React from 'react'

const AuthenticateLoader = () => {
  return (
    <div className="h-screen w-full flex items-center flex-col justify-center">
      <Loader2 className="animate-spin" />
      <p>Authenticating...</p>
    </div>
  )
}

export default AuthenticateLoader
