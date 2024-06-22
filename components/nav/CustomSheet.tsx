/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { type ReactNode } from 'react'
interface DataProps {
  children: ReactNode
}

const CustomSheet = ({ children }: DataProps) => {
  //

  //

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent
      className='max-w-[1500px]'
      >
        <SheetHeader>
          <SheetTitle>Edit Appointment</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription> */}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet
