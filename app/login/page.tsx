/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { signIn } from 'next-auth/react'
import CustomInput from '@/app/_components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import CustomInput from '@/app/_components/forms/CustomInput'
import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { getServerSession } from 'next-auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    console.log('dtx')
    console.log(response)
    if (response?.error === null) {
      // router.push('/dashboard')
      // router.refresh()
    }
  }
  // const session = getServerSession()
  // if (session) {
  //   console.log(session)
  // }
  return (
    <form className="flex flex-col w-[500px] border p-5 rounded-lg gap-y-6 mx-auto"
    onSubmit={handleSubmit}
    >
      {/* {} */}
      <CustomInput label="Email" value={email} onChange={setEmail} />
      <CustomInput label="Password" value={password} onChange={setPassword} />
      <Button size={'lg'} className="bg-teal-600 hover:bg-teal-700 shadow-none"
      // onClick={() => handleSubmit()}
      type='submit'
      >
        Login
      </Button>
      <Link href={'/auth/register'} className='text-center'>Dont have an account, register?</Link>
    </form>
  )
}

export default LoginPage
