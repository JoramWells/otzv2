import { type MomentInput } from 'moment'
import { calculateAge } from './calculateAge'

interface ItemProps {
  dob: MomentInput
}

export const calculateAgeRange = (data: any[], ageRanges: Array<[number, number]>): number[] => {
  const result: number[] = []
  ageRanges.forEach(([minAge, maxAge]) => {
    const filterData = data.filter((item: ItemProps) => {
      const age = calculateAge(item.dob)
      return age >= minAge && age <= maxAge
    })
    result.push(filterData.length)
  })
  return result
}
