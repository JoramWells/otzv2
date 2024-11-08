'use client'

import { useGetAllAppModulesQuery } from '@/api/appModules/appModules.api'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const AppModulesPage = () => {
  const router = useRouter()
  const { data } = useGetAllAppModulesQuery()
  console.log(data)
  return (
    <div>
      <Button
        onClick={() => {
          router.push('/administrator/app-modules/add')
        }}
      >
        Add
      </Button>

      {data?.map((item) => (
        <div key={item.id}>
          {item.title}

          <Image
            // w={0}
            alt="im"
            // placeholder="data:image/..."
            width={25}
            height={25}
            // quality={25}
            // fill
            // objectFit='contain'
            // priority
            className="rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.img}`}
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'cover'
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default AppModulesPage
