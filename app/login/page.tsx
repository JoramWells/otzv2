/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { signIn, useSession } from 'next-auth/react'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import CustomInput from '@/app/_components/forms/CustomInput'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import CustomSelect from '../_components/forms/CustomSelect'
// import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import FormError from '@/components/auth/FormError'
import Image from 'next/image'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import { Loader2 } from 'lucide-react'
// import { getServerSession } from 'next-auth'

const LoginPage = () => {
  const { data: session, status } = useSession()

  const [firstName, setFirstName] = useState('')
  const [password, setPassword] = useState('')
  const [hospitalID, setHospitalID] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hospitalID) {
      setIsLoading(true)
      const response = await signIn('credentials', {
        firstName,
        password,
        hospitalID,
        redirect: false
      })
      setIsLoading(false)

      // if(response?.error){
      //   setError(response.error)
      // }
      if (response?.error === null) {
        router.push('/')
        router.refresh()
      } else {
        setError(response?.error)
        setIsLoading(false)
      }
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
      setIsLoading(false)
      router.push('/')
    }
  }, [router, session, status])

  const { data: hospitalsData } = useGetAllHospitalsQuery()

  const hospitalOptions = useCallback(() => {
    return hospitalsData?.map((item: any) => ({
      id: item?.id,
      label: item?.hospitalName
    }))
  }, [hospitalsData])
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-slate-50">
      <div className='mb-4'>
        <Image
          src={'/img/logo1.svg'}
          alt="img"
          width={0}
          height={0}
          style={{ width: '90px', height: 'auto' }}
          // quality={100}
        />
      </div>

      <form
        className="flex flex-col w-[500px] p-8 rounded-lg gap-y-4 mx-auto ml-auto bg-white border-t-4 border-teal-500"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-slate-700 text-[16px]">Sign In</h2>
          <h3 className="text-muted-foreground text-[12px] ">
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
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter username"
        />
        <CustomInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          type="password"
        />
        <CustomSelect
          label="Select hospital name"
          onChange={setHospitalID}
          value={hospitalID as string}
          data={hospitalOptions() ?? []}
        />
        {error && <FormError message={error} />}
        <Button
          size={'sm'}
          className="bg-teal-600 text-[14px] mt-2 hover:bg-teal-700 font-semibold shadow-none"
          // onClick={() => handleSubmit()}
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
          Sign In
        </Button>
        <div className="flex flex-col space-y-2">
          <Link
            href={'/auth/register'}
            className="text-center text-[12px] text-slate-500"
          >
            Don&apos;t have an account? Contact admin.
          </Link>
          <Link
            target="_blank"
            href={'https://joramwells.github.io/otz-terms-and-conditions'}
            className="text-center text-blue-500 hover:underline text-[12px] "
          >
            Terms & Conditions
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
