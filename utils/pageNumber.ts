export const pageNumber = (count: number, pageSize: number) => {
  return Math.ceil(count / pageSize)
}

export const obfuscatePhoneNumber = (number: string) => {
  return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-xxx-xxx')
}
