/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetAllHospitalsQuery, useGetHospitalQuery, useUpdateHospitalLocationMutation } from '@/api/hospital/hospital.api'
import { useAddPatientMutation } from '@/api/patient/patients.api'
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation
} from '@/api/users/users.api'
import CustomInput from '@/components/forms/CustomInput'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { Loader2, Locate } from 'lucide-react'
import moment from 'moment'
import { use, useCallback, useEffect, useState } from 'react'

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
  const { authUser } = useUserContext()
  const [phoneNo, setPhoneNo] = useState<string | undefined>('')
  const [firstName, setFirstName] = useState<string | undefined>('')
  const [middleName, setMiddleName] = useState<string | undefined>('')
  const [dob, setDOB] = useState<Date | string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>('')
  const [populationType, setPopulationType] = useState<string | undefined>('')
  const [hospitalID, setHospitalID] = useState<string | undefined>()
  const [role, setRole] = useState('')
  const [password, setPassword] = useState<string | undefined>('')
  const [hospitalName, setHospitalName] = useState<string | undefined>('')
  const [MFLCode, setMFLCode] = useState<string | undefined>('')
  const [updatedBy, setUpdatedBy] = useState<string | undefined>('')
  const [updateAt, setUpdateAt] = useState<string | undefined>('')

  const [updateHospitalLocation, { isLoading, data, error }] =
    useUpdateHospitalLocationMutation()

  const [currentPosition, setCurrentPosition] = useState({})
  const [hospitalInfo, setHospitalInfo] = useState()

  const handleUpdateLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const data = {
        id: authUser?.hospitalID,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        locationUpdatedAt: new Date(),
        locationUpdatedBy: authUser?.id
      }
      await updateHospitalLocation(data)
    })
  }, [authUser?.hospitalID, authUser?.id, updateHospitalLocation])
  const { data: hospitalData } = useGetHospitalQuery(authUser?.hospitalID as string)

  const { data: userData } = useGetUserQuery(updatedBy as string)
  console.log(userData, 'hospitalData')

  useEffect(() => {
    if (hospitalData) {
      setHospitalName(hospitalData.hospitalName)
      setMFLCode(hospitalData.mflCode)
      setUpdatedBy(hospitalData.locationUpdatedBy)
      setUpdateAt(hospitalData.locationUpdatedAt)
    }
  }, [hospitalData])

  useEffect(() => {
    if (authUser) {
      setPhoneNo(authUser.phoneNo)
      setFirstName(authUser.firstName)
      setMiddleName(authUser.middleName)
      setLastName(authUser.lastName)
      setRole(authUser.role as unknown as string)
      setHospitalID(authUser.hospitalID as string)
      setDOB(moment(authUser.dob).format('YYYY-MM-DD'))
    }
  }, [authUser])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="w-1/2 p-4 flex flex-col space-y-4 bg-white rounded-lg">
          <div>
            Personal Details
            <div>
              {firstName} {middleName} {lastName}
            </div>
            <div>{moment(dob).format('ll')}</div>
            <div>{role}</div>
            <div>
              Hospital name
              <p>
                {hospitalName}
              </p>
              <p>
                {MFLCode}
              </p>
            </div>
          </div>

          <div className="flex space-x-2 items-end">
            <CustomInput
              label="Phone"
              value={phoneNo as string}
              onChange={setPhoneNo}
            />
            <Button size={'sm'}>Verify</Button>
          </div>

          <div>
            <h2>Change password</h2>
            <CustomInput
              label="Password"
              type="password"
              value={password as unknown as string}
              onChange={setPassword}
            />
          </div>

          <div>
            <h3>Change Location</h3>
            <Button
              className="flex space-x-1"
              disabled={isLoading}
              size={'sm'}
              onClick={() => {
                handleUpdateLocation()
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin"
                  size={16}
                  />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Locate size={16} />
                  <span>Update Location</span>
                </>
              )}
            </Button>
          </div>

          </div>
      </div>
    </div>
  )
}

export default UserDetailPage
