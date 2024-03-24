'use client'

import CustomInput from '@/app/_components/forms/CustomInput'
import React from 'react'

const LoginPage = () => {
  return (
    <div
      className="w-full items-center justify-center
    h-screen flex flex-row"
    >
      <div
      className='w-[500px] bg-red-200'
      >
        <CustomInput />
        <CustomInput />
        <CustomInput />
      </div>
    </div>
  )
}

export default LoginPage
