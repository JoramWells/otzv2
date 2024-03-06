interface CustomInputProps {
  label: string
  placeholder?: string
}

const CustomInput = ({ label, placeholder }: CustomInputProps) => {
  return (
    <div className="w-full">
      <p className="mb-2">{label}</p>
      <input
        className="border border-gray-200
            p-2 w-full rounded-lg
            "
      />
    </div>
  )
}

export default CustomInput
