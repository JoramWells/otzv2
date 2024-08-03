/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { signIn } from 'next-auth/react'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import CustomInput from '@/app/_components/forms/CustomInput'
import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
// import CustomSelect from '../_components/forms/CustomSelect'
// import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import axios from 'axios'
import Footer from '@/components/Footer'
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
      router.push('/dashboard')
      router.refresh()
    }
  }

  // const { data } = useGetAllHospitalsQuery()
  // const session = getServerSession()
  // if (session) {
  //   console.log(session)
  // }

  // const hospitalOptions = useCallback(() => {
  //   return data?.map((item: any) => ({
  //     id: item.id, value: item.hospitalName
  //   }))
  // }, [data])

  // const [hospitalName, setHospitalName] = useState('')

  const hospitalData = async () => {
    try {
      const data = await axios.get('/api/root-service/hospital')
      return data
    } catch (error) {
      console.log(error)
    }
  }
  console.log(hospitalData)
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-slate-50">
      <form
        className="flex flex-col w-[500px] p-5 rounded-lg gap-y-6 mx-auto ml-auto bg-white"
        onSubmit={handleSubmit}
      >
        <div>
          <h1
          className='text-2xl font-bold'
          >Sign In</h1>
          <h3
          className='text-slate-500'
          >Login to your Account?</h3>
        </div>
        {/* {} */}
        {/* <CustomSelect
          label="Select Hospital"
          data={hospitalOptions()}
          value={hospitalName}
          onChange={setHospitalName}
        /> */}
        <CustomInput label="Email" value={email} onChange={setEmail} />
        <CustomInput label="Password" value={password} onChange={setPassword} />
        <Button
          size={'lg'}
          className="bg-teal-600 hover:bg-teal-700 shadow-none"
          // onClick={() => handleSubmit()}
          type="submit"
        >
          Login
        </Button>
        <Link href={'/auth/register'} className="text-center">
          Dont have an account, contact admin?
        </Link>
      </form>
      <Footer/>
    </div>
  )
}

export default LoginPage
