/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddSMSMutation } from '@/api/sms/sms.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { MessageSquareText, Send } from 'lucide-react'

export function CustomSMSSheet () {
  const [addSMS, { isLoading }] = useAddSMSMutation()

  const inputValues = {
    to: '+254799980846',
    message: 'jay'
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-slate-50 text-slate-600 font-bold shadow-none border border-slate-200 hover:bg-slate-100"

          // variant={'link'}
        >
          <MessageSquareText size={20} className="mr-2" />
          SMS
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Send Message</SheetTitle>
          <SheetDescription>
            Send Message to client. You can also schedule the messages
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Phone No.</p>
            <Input id="name" value="0799980846" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Username</p>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              // onClick={() => addSMS(inputValues)}
              disabled={isLoading}
            >
              {isLoading
                ? (
                <Send className="mr-2 h-4 w-4 animate-spin" />
                  )
                : (
                <Send className="mr-2 h-4 w-4 " />
                  )}
              SEND SMS
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
