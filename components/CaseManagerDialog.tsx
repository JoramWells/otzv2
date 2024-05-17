import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { type ReactNode } from 'react'

interface DataProps {
  label: string | ReactNode
  description?: string
  children: React.ReactNode
  width?: string
}

export function CaseManagerDialog ({ children, description, label, width }: DataProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          // size={'sm'}
          className="shadow-none border-slate-300"
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${width != null && `max-w-[${width}]`}`}>
        <DialogHeader>
          <DialogTitle>{description}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
