export const calculateBMI = (weight: number, heightCM: string) => {
  const heightM = parseInt(heightCM, 10) / 100
  const bmi = weight / (heightM * heightM)
  return Number(bmi.toFixed(2))
}
