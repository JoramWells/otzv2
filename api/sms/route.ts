import { NextResponse } from 'next/server'

export async function GET () {
  const res = await fetch('http://localhost:5000/patients/fetchAll')
  const data = await res.json()
  return NextResponse.json({ data })
}

export async function POST () {}
