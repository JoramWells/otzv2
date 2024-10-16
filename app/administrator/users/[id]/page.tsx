/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddPatientMutation } from '@/api/patient/patients.api'
import { useGetUserQuery } from '@/api/users/users.api'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { type UserInterface } from 'otz-types'
import { useEffect, useState } from 'react'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: '/dashboard'
  }
]
const UserDetailPage = ({ params }: { params: any }) => {
  const { id } = params

  const [user, setUser] = useState<UserInterface>()

  const { data: userData } = useGetUserQuery(id as string)

  useEffect(() => {
    if (userData != null) {
      setUser(userData)
    }
  }, [userData])
  const [addPatient, { isLoading, data, error }] = useAddPatientMutation()
  console.log(userData)
  console.log(error)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-4">
        <Button
          size={'sm'}
          onClick={async () => await addPatient({ ...user, role: 'clinician', sex: 'M', userID: user?.id })}
        >
          {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
          Create User
        </Button>
      </div>
    </div>
  )
}

export default UserDetailPage
