import { Clock1 } from 'lucide-react'

export interface InputEventProps extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string
    name?: string
  }
}

export interface CustomTimeInputProps {
  label: string
  hours: string
  minutes: string
  setHours: (value: string) => void
  setMinutes: (value: string) => void
}

const CustomTimeInput = ({ label, hours, minutes, setHours, setMinutes }: CustomTimeInputProps) => {
  return (
    <div>
      <p className="mb-1">{label}</p>
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-col space-y-1">
            {/* <p className="text-xs text-slate-600 font-bold">Hours</p> */}
            <input
              className="border border-slate-300 w-12 p-2 text-center h-9
            rounded-md flex items-center"
              type="number"
              placeholder="00"
              value={hours}
              onChange={(e: InputEventProps) => { setHours(e.target.value) }}
            />
          </div>
          <div className="flex flex-col space-y-1">
            {/* <p className="text-xs text-slate-600 font-bold">Minutes</p> */}
            <input
              className="border border-slate-300 w-12 p-2 text-center h-9
            rounded-md flex items-center"
              type="number"
              placeholder="00"
              value={minutes}
              onChange={(e: InputEventProps) => { setMinutes(e.target.value) }}

            />
          </div>
        </div>
        <Clock1 className="" size={20} />
      </div>
    </div>
  )
}

export default CustomTimeInput
