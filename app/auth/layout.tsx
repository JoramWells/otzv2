import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-full items-center justify-center
    h-screen flex flex-row"
    >
      {children}
    </div>
  )
}

export default AuthLayout
