import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const res = await axios.get('http://localhost:5000/patients/fetchAll')
    // const data = await res.json()
    const data = res.data
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}