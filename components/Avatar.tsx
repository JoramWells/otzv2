import { type AvatarProps } from '@/types'
import { generateRandomColors } from '@/utils/generateRandomColors'
import { useMemo } from 'react'

const Avatar = ({ name, h = 6, w = 6 }: AvatarProps) => {
  const fullName = name.split(' ')
  const firstName = fullName[0].charAt(0)
  const secondName = fullName[2]?.trim().charAt(0)
  const randomColors = useMemo(() => generateRandomColors(), [])
  return (
    <div
      className={`rounded-full h-[20px] w-[20px]
    flex flex-row items-center justify-center text-[10px] text-white
    `}
      style={{
        backgroundColor: randomColors
      }}
    >
      {firstName}
      {secondName}
    </div>
  )
}

export default Avatar
