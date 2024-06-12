const ListCounter = ({ text }: { text: number }) => {
  return (
      <div className="p-2  h-9 w-9 flex items-center justify-center bg-teal-600 rounded-lg font-extrabold text-white">
        {text}
      </div>
  )
}

export default ListCounter
