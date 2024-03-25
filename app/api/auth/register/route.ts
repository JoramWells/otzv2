export default async function POST (request: Request) {
  try {
    const { email, password } = await request.json()
    console.log(email, password)
  } catch (error) {
    console.log(error)
  }
}
