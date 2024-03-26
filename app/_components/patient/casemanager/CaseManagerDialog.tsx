import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import CustomSelect from '../../forms/CustomSelect'
import CustomCheckbox from '../../forms/CustomCheckbox'

export function CaseManagerDialog () {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Assign Case Manger</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-1/2">
        <DialogHeader>
          <DialogTitle>Assign Case Manager</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CustomSelect label="Select user" data={[]} />
          <CustomCheckbox label="Allow Notifications" />

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
