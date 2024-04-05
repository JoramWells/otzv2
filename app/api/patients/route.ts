import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const res = await axios.get('http://patient-service:5001/patients/fetchAll')
    // const data = await res.json()
    const data = res.data
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
