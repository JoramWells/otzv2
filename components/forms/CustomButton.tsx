interface ButtonProps {
  label?: string
}

const CustomButton = ({ label = '' }: ButtonProps) => {
  return (
    <button
    className="bg-teal-500
    w-full rounded-md h-10 text-white font-semibold text-lg
    "
    >{label}</button>
  )
}

export default CustomButton
