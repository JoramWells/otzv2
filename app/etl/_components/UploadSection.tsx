import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { type ChangeEvent } from 'react'

const UploadSection = ({
  onChange
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div
      className="flex items-center h-[350px] border rounded-lg border-dashed w-1/2 p-4 justify-center
          bg-blue-50 border-blue-200 flex-col
          "
    >
      <Image
        src={'/img/file.png'}
        alt="img"
        width={80}
        height={80}
        style={{ width: '80px', height: '80px' }}

        // quality={100}
      />
      <div className="">
        <p className="font-semibold mb-2 text-center">Choose file to upload</p>
        <Input
          // label=''
          type="file"
          accept=".csv"
          onChange={onChange}
          className="shadow-none"
        />
      </div>
    </div>
  )
}

export default UploadSection
