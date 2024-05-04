import { Checkbox } from '@/components/ui/checkbox'

export interface CheckboxProps {
  onChange: (checked: boolean) => void
  value: boolean
  label?: string
  description?: string
}

const CustomCheckbox = ({ onChange, value, label, description }: CheckboxProps) => {
  return (
    <div className="flex flex-row items-start space-x-3">
      <Checkbox
        id="checkedBox"
        checked={value}
        onCheckedChange={(checked: boolean) => {
          onChange(checked)
        }}
        className='mt-1'
        // pt={1}
      />
      <div className="m-0 p-0">
        <label htmlFor="checkedBox" className="font-bold text-slate-700 m-0">
          {label}
        </label>
        <span
          className="text-slate-500 text-sm
        font-normal
        "
        >
          {description}
        </span>
      </div>
    </div>
  )
}

export default CustomCheckbox
