import { Button } from '@/components/ui/button'

const AdverseDrugReactionsDialog = () => {
  return (
    <div className="border rounded-lg bg-white p-4">
      <p className="font-bold text-lg">Adverse Drug Reactions </p>

      <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
        Update
      </Button>
    </div>
  )
}

export default AdverseDrugReactionsDialog
