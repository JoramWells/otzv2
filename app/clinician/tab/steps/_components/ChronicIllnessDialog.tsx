import { Button } from '@/components/ui/button'

const ChronicIllnessDialog = () => {
  return (
    <div className="border rounded-lg bg-white p-4">
      <p className="font-bold text-lg">Chronic Illness and Cormobidities</p>

      <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
        Update
      </Button>
    </div>
  )
}

export default ChronicIllnessDialog
