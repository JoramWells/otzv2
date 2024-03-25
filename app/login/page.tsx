'use client'

import CustomInput from '@/app/_components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import CustomInput from '@/app/_components/forms/CustomInput'
import React, { useState } from 'react'

const LoginPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="flex flex-col w-[500px] border p-5 rounded-lg gap-y-6">
      <CustomInput label="Username" value={userName} onChange={setUserName} />
      <CustomInput label="Password" value={password} onChange={setPassword} />
      <Button size={'lg'} className="bg-teal-600 hover:bg-teal-700 shadow-none">
        Login
      </Button>
      <Link href={'/auth/register'} className='text-center'>Dont have an account, register?</Link>
    </div>
  )
}

export default LoginPage
