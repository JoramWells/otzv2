/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useAddUserMutation, useGetAllUsersQuery } from '@/api/users/users.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/UserContext'
import { type ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { CircleCheck, Loader2, TriangleAlert, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type UserInterface } from 'otz-types'
import Papa, { type ParseMeta } from 'papaparse'
import React, {
  type FormEvent,
  useState,
  type ChangeEvent,
  useMemo,
  useEffect
} from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)
const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]
const requiredHeaders = [
  'MFL Code',
  'id',
  'Name',
  'CCC No',
  'NUPI',
  'Sex',
  'Sex',
  'DOB',
  'Age at reporting',
  'Weight',
  'Height',
  'Blood Pressure',
  'Population Type',
  'Enrollment Date',
  'First Regimen',
  'Current Regimen Line',
  'Date of Baseline CD4 test',
  'Latest CD4 Count',
  'Last WHO Stage',
  'Last VL Result',
  'Last VL Justification',
  'Active in PMTCT',
  'Active in OTZ',
  'TPT Start Date',
  'TPT Outcome Date',
  'Differentiated care model',
  'Next Appointment Date',
  'Case Manager',
  'NCDs',
  'NCDs Onset Date',
  'AHD Client',
  'Medical cover',
  'Medical cover status',
  'Date confirmed positive',
  'Art Start Date',
  'Current Regimen',
  'Baseline CD4',
  'Latest CD4 Count Date ',
  'Last WHO Stage Date',
  'VL Validility',
  'Last VL Date',
  'Active in OVC',
  'Active in TB',
  'TPT Outcome',
  'Establishment',
  'Last Visit Date',
  'Self Visit Date',
  'Months of Prescription',
  'Refill Date',
  'NCDs status'
]

interface HeaderErrors {
  missingHeaders: string[]
  extraHeaders: string[]
}

type CsvRow = Record<string, string>

interface ParseResult<T> {
  data: T[]
  errors: ParseError[]
  meta: ParseMeta
}
interface ParseError {
  type: string
  code: string
  message: string
  row?: number
}

interface CheckUserInterface {
  user: string
  exists: boolean
}

const AddEtlPage = () => {
  const [headers, setHeaders] = useState<string[]>([])
  const [users, setUsers] = useState<UserInterface[]>([])
  const [csvUsers, setCsvUsers] = useState<CheckUserInterface[]>([])
  const { data: usersData } = useGetAllUsersQuery()
  useEffect(() => {
    if (usersData) {
      setUsers(usersData)
    }
  }, [usersData])

  const userName = users?.map(item => (`${item.firstName} ${item.middleName}`))
  const columns = useMemo<Array<ColumnDef<any>>>(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header
      })),
    [headers]
  )
  const [csvArray, setCSVArray] = useState<CsvRow[]>([])
  const [file, setFile] = useState<File | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [headerErrors, setHeaderErrors] = useState<HeaderErrors>({
    missingHeaders: [],
    extraHeaders: []
  })
  const [progress, setProgress] = useState(0)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  //   const [date, setDate] = useState<DateRange | undefined>({
  //     from: new Date(2022, 0, 20),
  //     to: addDays(new Date(2025, 0, 20), 20)
  //   })

  const [filteredData, setFilteredData] = useState(csvArray)
  useEffect(() => {
    if (csvArray.length > 0) {
      setFilteredData(csvArray)
    }
  }, [csvArray])
  //
  const [recentUser, setRecentUser] = useState<UserInterface>()
  const [addUser, { isLoading: isAddUserLoading, data: savedUserData }] = useAddUserMutation()

  useEffect(() => {
    if (savedUserData) {
      setRecentUser(savedUserData)
    }
  }, [savedUserData])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filex = e.target?.files?.[0]
    setFile(filex)
    if (filex) {
      Papa.parse(filex, {
        header: true,
        skipEmptyLines: true,
        complete: (res: ParseResult<CsvRow>) => {
          const csvHeaders = res.meta.fields ?? []

          const missingHeaders = requiredHeaders.filter(
            (header) => !csvHeaders.includes(header)
          )
          const extraHeaders = csvHeaders.filter(
            (header) => !requiredHeaders.includes(header)
          )

          if (missingHeaders.length > 0 || extraHeaders.length > 0) {
            setHeaderErrors({ missingHeaders, extraHeaders })
          } else if (res.errors.length > 0) {
            setError(res.errors.map((e) => e.message).join(', '))
          } else {
            setHeaderErrors({ missingHeaders: [], extraHeaders: [] })

            setError(null)

            const filteredRetrievedUsers = res.data.filter((row) => row['Case Manager'].length > 0)
            const retrievedUsers = filteredRetrievedUsers.map((row) => row['Case Manager'])
            const userChecks = retrievedUsers.map(user => ({
              user,
              exists: userName.includes(user)
            }))
            setCsvUsers(userChecks)
            // const filteredData = res.data.filter((row) => {
            //   return Object.values(row).every(
            //     (value) => value !== '' && value !== null && value !== undefined
            //   )
            // })
            setCSVArray(res.data)
            setHeaders(res.meta.fields ?? [])
          }
        }
      })
    }
  }

  const [responseData, setResponseData] = useState()
  const { authUser } = useUserContext()

  //
  const handleSubmit = async () => {
    // e.preventDefault()
    const formData = new FormData()
    if (file != null && session !== null) {
      const { user } = session
      const user2 = user as UserInterface
      formData.append('file', file)
      formData.append('hospitalID', user2.hospitalID!)
      formData.append('userID', user2.id!)
    }
    formData.append('file', '')
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/etl/upload/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (e) => {
            const { loaded, total } = e
            if (total) {
              const percentCompleted = Math.round((loaded * 100) / total)
              setProgress(percentCompleted)
            }
          }
        }
      )
      setResponseData(response as any)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()

  useEffect(() => {
    if (responseData) {
      router.push('/etl')
    }
  }, [responseData, router])

  const getUniqueUsers = (data: CheckUserInterface[]) => {
    const seen = new Set()
    return data?.filter(item => {
      if (!seen.has(item.user)) {
        seen.add(item.user)
        return true
      }
      return false
    })
  }

  const uniqueUsers = getUniqueUsers(csvUsers)
  const nullUsers = uniqueUsers.filter(item => !item.exists)

  // useEffect(() => {
  //   if (recentUser) {
  //     nullUsers.filter(item => { console.log(item.user !== `${recentUser.middleName} ${recentUser.firstName}`, 'nullx') })
  //   }
  // }, [nullUsers, recentUser])

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      {/* <form
        action=""
        onSubmit={handleSubmit}
        className="flex space-x-2 items-center bg-white"
      >
        <Input
          // label=''
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="shadow-none"
        /> */}
      {/* <Button type="submit" size={'sm'} disabled={file === undefined}>
          {loading && <Loader2 className="animate-spin mr-2" size={16} />}
          Submit
        </Button> */}
      {/* </form> */}

      <div className="p-2 flex flex-col space-y-2">
        {headerErrors.missingHeaders.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <TriangleAlert className="text-red-500 mb-2" />
            <div className="flex flex-col space-y-1">
              <p className="text-red-500 font-bold text-[14px]">
                Invalid File Format, you have{' '}
                {headerErrors.missingHeaders?.length} missing columns
              </p>
              <p className="text-[12px] text-slate-500">
                {headerErrors.missingHeaders?.join(', ')}
              </p>
            </div>
          </div>
        )}

        {/*  */}
        {headerErrors.extraHeaders.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <TriangleAlert className="text-red-500 mb-2" />
            <div className="flex flex-col space-y-1">
              <p className="text-red-500 font-bold text-[14px]">
                Invalid File Format, you have{' '}
                {headerErrors.extraHeaders?.length} extra columns
              </p>
              <p className="text-[12px] text-slate-500">
                {headerErrors.extraHeaders?.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center flex-row p-2">
        {csvArray.length > 0 && nullUsers?.length <= 0 ? (
          <div className="bg-white rounded-lg p-4 w-full">
            <div className="flex justify-end mb-2">
              <div className="flex space-x-2 items-center">
                <Button
                  className="shadow-none"
                  variant={'outline'}
                  size={'sm'}
                  onClick={() => {
                    setCSVArray([])
                  }}
                >
                  <X className="mr-2" size={16} />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size={'sm'}
                  disabled={file === undefined}
                  onClick={handleSubmit}
                >
                  {loading && (
                    <Loader2 className="animate-spin mr-2" size={16} />
                  )}
                  Submit
                </Button>
              </div>
            </div>
            <CustomTable
              isSearch={false}
              columns={columns}
              data={filteredData || []}
            />
          </div>
        ) : nullUsers?.length > 0 ? (
          <div className="flex flex-col space-y-2 bg-white w-1/2 rounded-lg p-4">
            <div>
              <p>Users</p>
              <p className="text-muted-foreground text-[12px]">
                Users have different roles
              </p>
            </div>
            {uniqueUsers.map((item) => (
              <div className="flex justify-between" key={item.user}>
                <p className="text-[12px] font-bold">{item.user}</p>
                {item.exists ? (
                  <div className="flex items-center space-x-2 text-emerald-500 text-[12px] ">
                    <CircleCheck size={16} />
                    <p>Registered</p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-500 text-[12px] ">
                    <X className="" size={16} />
                    <p>Not Registered</p>
                  </div>
                )}{' '}
                {!item.exists && (
                  <Button
                    size={'sm'}
                    disabled={isAddUserLoading}
                    onClick={async () => {
                      const reverseName = (name: string) => {
                        const parts = name.trim().split(' ')
                        const reversed = parts.reverse()
                        console.log(reversed, 'reversed')
                        return {
                          reversedName: reversed.join(' '),
                          firstName: reversed[1] || '',
                          lastName: reversed[0] || ''
                        }
                      }

                      const { firstName, lastName } = reverseName(item.user)

                      await addUser({
                        firstName,
                        middleName: lastName,
                        hospitalID: authUser?.hospitalID
                      })
                    }}
                  >
                    {`${recentUser?.middleName} ${recentUser?.firstName}`.trim().toLowerCase() === item.user.trim().toLowerCase() ? 'Saved' : 'Save'}
                  </Button>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                className="shadow-none"
                variant={'outline'}
                size={'sm'}
                onClick={() => {
                  router.push('/etl')
                }}
              >
                <X className="mr-2" size={16} />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center h-[350px] border rounded-lg border-dashed w-1/2 p-4 justify-center
          bg-blue-50 border-blue-200 flex-col
          "
          >
            <Image
              src={'/img/file.png'}
              alt="img"
              width={140}
              height={140}
              style={{ width: '140px', height: '140px' }}

              // quality={100}
            />
            <div className="">
              <p className="font-semibold mb-2 text-center">
                Choose file to upload
              </p>
              <Input
                // label=''
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="shadow-none"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AddEtlPage
