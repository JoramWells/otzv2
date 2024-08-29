import React from 'react'

const AuthenticateLoader = () => {
  return (
    <div className="h-screen w-full flex items-center flex-col space-y-8 justify-center">
      <span className="loader"></span>
      <p
      className='font-semibold text-teal-600'
      >Authenticating...</p>
    </div>
  )
}

export default AuthenticateLoader
