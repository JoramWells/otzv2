import { NextResponse } from 'next/server'

export async function GET () {
  const res = await fetch('/api/root-service/patients')
  const data = await res.json()
  return NextResponse.json({ data })
}
