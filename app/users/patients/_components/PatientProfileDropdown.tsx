/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import {
  ChevronDownIcon
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
import Avatar from '@/components/Avatar'
import { calculateAge } from '@/utils/calculateAge'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

interface InputProps { id: string | undefined, firstName?: string, middleName?: string, dob?: Date | string, cccNo?: string, phoneNo?: string }

export function PatientProfileDropdown ({ id, firstName, middleName, dob, cccNo, phoneNo }: InputProps) {
  // const [] = useState()
  // const router = useRouter()
  // const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="shadow-none text-slate-700 flex space-x-2 items-center"
          size={'sm'}
          variant={'outline'}
        >
          <Avatar name={`${firstName} ${middleName}`} />

          <p>
            {firstName} {middleName}
          </p>
          <ChevronDownIcon className="text-slate-500" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="shadow-none">
        <DropdownMenuLabel>
          {firstName} {middleName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col p-2  w-[200px] rounded-lg space-y-2">
          {/*  */}
          <DropdownMenuItem>
            <p className="text-slate-500 font-bold text-[12px]">
              Age: {calculateAge(dob)} yrs
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <p className="text-[12px] text-slate-500">CCC No.{cccNo} </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            {phoneNo && phoneNo?.length > 0
              ? (
              <p className="text-[12px] text-slate-500">
                Phone No: <span className='font-semibold' >{phoneNo} </span>
              </p>
                )
              : (
              <Link
                href={`/users/patients/tab/settings/${id}`}
                className="text-[12px] text-blue-500 font-semibold"
              >
                Update phone number
              </Link>
                )}
          </DropdownMenuItem>

          {/* <Button>Update   Profile</Button> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
