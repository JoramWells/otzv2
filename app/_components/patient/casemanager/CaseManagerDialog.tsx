import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface DataProps {
  label: string
  description?: string
  children: React.ReactNode
}

export function CaseManagerDialog ({ children, description, label }: DataProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"
        size={'sm'}
        >{label}</Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle>{description}</DialogTitle>
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
