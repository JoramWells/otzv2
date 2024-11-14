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
    link: '/'
  },
  {
    id: '2',
    label: 'users',
    link: '/'
  }
]

const Users = () => {
  const { data } = useGetAllUsersQuery()

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-user`)
  }

  return (
    <>
      <div
      className='relative'
      >
        <BreadcrumbComponent dataList={dataList} />
        <Button
          size={'sm'}
          className="shadow-none absolute top-2 right-2"
          variant={'outline'}
          onClick={handleClick}
        >
          New
        </Button>
      </div>

      <div className="p-2 ">
        <div className="bg-white p-2 rounded-lg">
          <CustomTable columns={columns} data={data ?? []} isSearch={false} />
        </div>
      </div>
    </>
  )
}

export default Users
