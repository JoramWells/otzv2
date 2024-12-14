/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { type AppModuleResponseInterface } from '@/api/appModules/appModules.api'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { LayoutPanelLeft, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type AppModuleInterface } from 'otz-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { type Url } from 'url'

const fetchData = async (): Promise<AppModuleResponseInterface | undefined> => {
  try {
    const { data } = await axios.get<AppModuleResponseInterface | undefined>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules/fetchAll/`,
      {
        params: {
          page: 1,
          pageSize: 100,
          searchQuery: ''
        }
      }
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

const AppList = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<AppModuleInterface[]>([])
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      const resp = await fetchData()
      if (resp != null) {
        setData(resp.data)
      }
    })()
  }, [])

  const filterData = useCallback(() => {
    return data?.filter(item => item.isActive)
  }, [data])()

  useEffect(() => {
    const handleMouseClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current != null &&
          !dropDownRef.current.contains(e.target as Node)
      ) {
        setVisible(false)
      }
    }
    document.addEventListener('mousedown', handleMouseClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleMouseClickOutside)
  }, [])

  const pathname = usePathname()
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })

  const handleMouseDown = (e: { preventDefault: () => void, clientX: number, clientY: number }) => {
    e.preventDefault()
    setIsDragging(true)
    const offsetX = e.clientX - position.x
    const offsetY = e.clientY - position.y
    const handleMouseMove = () => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={` absolute bottom-2 right-2 cursor-grab w-[200px] ${isDragging ? 'cursor-grabbing' : ''} `} ref={dropDownRef}
    onMouseDown={handleMouseDown}
    // style={{
    //   position: 'absolute',
    //   top: `${position.y}px`,
    //   left: `${position.x}px`
    // }}
    >
      {visible && (
        <div className=" rounded-lg
        bg-white/[.2] backdrop-blur-md
         flex flex-col space-y-2 border border-slate-300">
          <div className="p-2 border-b border-slate-300 flex flex-row justify-between items-center bg-white rounded-t-lg">
            <p className="text-[12px] font-semibold ">Quick App Access</p>
            {/* <Button size={'sm'} variant={'ghost'}>
              <X className="" size={16} />
            </Button> */}
          </div>

          <div className="grid grid-cols-2 p-2 pt-0 gap-2">
            {filterData?.map((item, idx) => (
              <div
                key={item.id}
                className={`p-2 flex flex-col bg-slate-100 items-center justify-center space-y-1 rounded-lg hover:cursor-pointer hover:bg-slate-50
                  ${pathname.includes(item?.title?.toLowerCase() as string) && 'bg-white text-cyan-500 border-cyan-200'}
                  `}
                title={item.title}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.img}`}
                  alt="img"
                  width={35}
                  height={35}
                  style={{
                    width: '35px',
                    height: '35px',
                    objectFit: 'contain'
                  }}

                  // quality={100}
                />
                <Link
                href={item.link as unknown as Url}
                className='text-[10px] text-center hover:underline hover:text-blue-500 font-semibold'
                >
                {item.title}
                </Link>
                {/* <p className="text-[10px] text-center font-semibold text-slate-700">
                  {item.title}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`flex justify-end ${
          visible && 'bg-transparent'
        } rounded-r-full mt-1 `}
        onClick={() => setVisible((prev) => !prev)}
      >
        <Button size={'sm'} className="rounded-full h-10 w-10 shadow-lg bg-white "
        variant={'ghost'}
        >
          {visible
            ? (
            <X size={16} />
              )
            : (
            <LayoutPanelLeft size={16} />
              )}
        </Button>
      </div>
    </div>
  )
}

export default AppList
