/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { signIn, useSession } from 'next-auth/react'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import CustomInput from '@/app/_components/forms/CustomInput'
import { type FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import CustomSelect from '../_components/forms/CustomSelect'
// import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import FormError from '@/components/auth/FormError'
import Image from 'next/image'
// import { getServerSession } from 'next-auth'

const LoginPage = () => {
  const { data: session, status } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

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
    // if(response?.error){
    //   setError(response.error)
    // }
    if (response?.error === null) {
      router.push('/')
      router.refresh()
    } else {
      setError(response?.error)
    }
  }

  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (session) {
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      router.push('/')
    }
  }, [router, session, status])

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

  // const hospitalData = async () => {
  //   try {
  //     const data = await axios.get('/api/root-service/hospital')
  //     return data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // console.log(hospitalData)
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-slate-50">
      <form
        className="flex flex-col w-[500px] p-5 rounded-lg gap-y-6 mx-auto ml-auto bg-white border-t-4 border-teal-500"
        onSubmit={handleSubmit}
      >
        <div>
          <Image
            src={'/img/logo1.svg'}
            alt="img"
            width={0}
            height={0}
            style={{ width: '90px', height: 'auto', margin: 'auto' }}

            // quality={100}
          />
          <h2 className="text-center mt-4 font-extrabold text-slate-700">
            CarePlus
          </h2>
        </div>
        <div>
          <h2 className="text-slate-700">Sign In</h2>
          <h3 className="text-muted-foreground text-[14px] ">
            Login to your Account.
          </h3>
        </div>
        {/* {} */}
        {/* <CustomSelect
          label="Select Hospital"
          data={hospitalOptions()}
          value={hospitalName}
          onChange={setHospitalName}
        /> */}
        <CustomInput
          label="Username"
          value={email}
          onChange={setEmail}
          placeholder="Enter username"
        />
        <CustomInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          type="password"
        />
        {error && <FormError message={error} />}
        <Button
          size={'lg'}
          className="bg-teal-600 text-lg mt-4 hover:bg-teal-700 font-bold shadow-none"
          // onClick={() => handleSubmit()}
          type="submit"
        >
          Sign In
        </Button>
        <div className="flex flex-col space-y-2">
          <Link
            href={'/auth/register'}
            className="text-center text-[14px] text-slate-500"
          >
            Don&apos;t have an account? Contact admin.
          </Link>
          <Link
            target="_blank"
            href={'https://joramwells.github.io/otz-terms-and-conditions'}
            className="text-center text-blue-500 hover:underline text-[14px] "
          >
            Terms & Conditions
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
