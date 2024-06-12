const ListCounter = ({ text }: { text: number }) => {
  return (
      <div className="p-2  h-8 w-8 flex items-center justify-center border-2 border-teal-600 rounded-lg font-extrabold text-teal-600">
        {text}
      </div>
  )
}

export default ListCounter
