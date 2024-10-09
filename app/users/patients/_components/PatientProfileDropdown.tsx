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

interface InputProps { firstName?: string, middleName?: string, dob?: Date | string, cccNo?: string, phoneNo?: string }

export function PatientProfileDropdown ({ firstName, middleName, dob, cccNo, phoneNo }: InputProps) {
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
          <ChevronDownIcon className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>
          {firstName} {middleName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col p-2  w-[200px] rounded-lg space-y-2">
          {/*  */}
          <p className="text-slate-500 font-bold text-[12px]">
            Age: {calculateAge(dob)} yrs
          </p>

          <p className="text-[12px] text-slate-500">CCC No.{cccNo} </p>
          <div className="text-slate-500 text-[12px]">
            <p>
              Phone No: <span>{phoneNo} </span>
            </p>
          </div>
          {/* <Button>Update   Profile</Button> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
