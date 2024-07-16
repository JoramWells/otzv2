import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const StopComponent = () => {
  const [stopReason, setStopReason] = useState('')

  // const switchReasons =  useCallback(()=>{
  //   return reasonOptions?.filter(item=>item.reasonID.toLowerCase().includes(reasonID.toLowerCase()))
  // },[])
  return (
    <div className="flex flex-col space-y-4">
      <CustomInput label="Reason" value={stopReason} onChange={setStopReason} />
      <Button className="w-full bg-slate-200 hover:bg-slate-100 shadow-none text-black">
        Stop Regimen
      </Button>
    </div>
  )
}

export default StopComponent
