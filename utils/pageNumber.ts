export const pageNumber = (count: number, pageSize: number) => {
  return Math.ceil(count / pageSize)
}
