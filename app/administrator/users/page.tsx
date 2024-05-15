/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, type UserProps } from './columns'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'home',
    link: ''
  },
  {
    id: '2',
    label: 'users',
    link: 'users'
  }
]

const Users = () => {
  const { data } = useGetAllUsersQuery()
  console.log(data, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-user`)
  }

  return (
      <div className="p-4">
        <BreadcrumbComponent dataList={dataList} />
        <div
        className='flex flex-row justify-between items-center p-1'
        >
          <div className="flex flex-row gap-x-2 items-center mb-4">
            <p
              className="text-lg text-slate-700
          font-semibold
          "
            >
              Patients
            </p>

          </div>
          <Button
          // size={'sm'}
          // colorScheme='teal'
          variant={'outline'}
          onClick={handleClick}
          >New</Button>
        </div>

        <CustomTable columns={columns} data={data ?? []}
        isSearch={false}
        />
      </div>
  )
}

export default Users
