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
  label: ReactNode
  title: string
}

const CustomSheet = ({ children, label, title }: DataProps) => {
  //

  //

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"
        size={'sm'}
        className='shadow-none'
        >{label}</Button>
      </SheetTrigger>
      <SheetContent
      className='max-w-[1500px]'
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
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
