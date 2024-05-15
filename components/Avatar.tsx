import { type AvatarProps } from '@/types'
import { generateRandomColors } from '@/utils/generateRandomColors'
import { useMemo } from 'react'

const Avatar = ({ name, h = 7, w = 7 }: AvatarProps) => {
  const fullName = name.split(' ')
  const firstName = fullName[0].charAt(0)
  const secondName = fullName[0].charAt(0)
  const randomColors = useMemo(() => generateRandomColors(), [])
  return (
    <div
      className={`font-bold rounded-full h-${h} w-${w}
    flex flex-row items-center justify-center text-xs text-white
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
