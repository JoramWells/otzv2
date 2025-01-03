/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import '../../globals.css'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SidebarSubButton } from './SidebarSubButton'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { type SideBarCollapseButtonProps } from '@/types'
import { Button } from '@/components/ui/button'

export const SidebarCollapseButton = ({ label = 'Dashboard', link, itemList, icon = <div/> }: SideBarCollapseButtonProps) => {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const isActive = useMemo(() => {
    if (link !== null) {
      return pathname.includes(link!)
    }
    // return pathname.includes(label.toLowerCase())
    // const regex = new RegExp(`\\b${link}\\b`, 'i') // Matches the `link` as a full word, case-insensitive
    return pathname.includes(link)
  }, [pathname, link])

  const onToggle = () => {
    setVisible(prev => !prev)
  }

  return (
    <div className="pt-1 pb-1 ">
      <Button
        onClick={onToggle}
        className={`flex items-center text-[12px]  pl-4 pr-4 justify-between text-[#F3FAFF]/[.8]  text-sm rounded-none w-full bg-[#364f6b] shadow-none
        overflow-y-auto hover:bg-[#F3FAFF]/[.1] transition delay-150 ease-in-out hover:text-[#F3FAFF] ${
          isActive &&
          'bg-gradient-to-r from-[#F1F1E6] text-[#364f6b]'
        }
        `}
      >
        <div className="flex flex-row items-center space-x-2">
          {icon}

          {link == null
            ? (
            <p
              className={`text-capitalize font-normal text-[12px] ${
                isActive ? 'text-sky-600' : 'black'
              }`}
            >
              {label} {isActive}
            </p>
              )
            : (
            <Link href={`${link}`} className="capitalize font-normal text-[12px] ">
              {label}
            </Link>
              )}
        </div>

        {/* ceck if item list is more tan 1 */}
        {itemList != null && itemList?.length > 0 && (
          <>
            {visible ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </>
        )}
      </Button>

      {itemList != null && itemList?.length > 0 && (
        <div
          className={`${
            visible ? 'inline' : 'hidden'
          } bg-gray-500 duration-100`}
        >
          {itemList?.map((item) => (
            <SidebarSubButton
              key={item.id}
              label={item.label}
              link={item.link}
            />
          ))}
        </div>
      )}
    </div>
  )
}
