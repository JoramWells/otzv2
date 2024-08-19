/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

// import { renderHook } from '@testing-library/react'
import { patientsApi } from '../patients.api'
// import { type ReactNode } from 'react'
// import { Provider } from 'react-redux'
// import { store } from '@/lib/store'
import fetchMock from 'jest-fetch-mock'
import { setupApiStore } from '../../setupApiStore'

describe('Patients API tests', () => {
  beforeAll(() => {
    fetchMock.enableMocks()
    fetchMock.mockResponseOnce(JSON.stringify({}))
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })
  const storeRef = setupApiStore(patientsApi)

  test('req. is correct', async () => {
    await storeRef.store
      .dispatch<any>(
      patientsApi.endpoints.getPatient.initiate(
        'e4eaaaf2-d142-4b42-9c0c-3e4b3b489a9e'
      )
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const { method } = fetchMock.mock.calls[0][0] as Request

    expect(method).toBe('GET')
    // expect(`{$url}//api/users/patients`).toBe(`${process.env.NEXT_PUBLIC_API_URL}/api/users/patients`)
  })
})

// function Wrapper ({ children }: { children: ReactNode }) {
//   return <Provider store={store}>
//       {children}
//     </Provider>
// }

// it('renders hook', () => {
//   renderHook(() => useGetPatientQuery('e4eaaaf2-d142-4b42-9c0c-3e4b3b489a9e'), { wrapper: Wrapper })
// })

// const data = {}

// beforeAll(() => {
//   fetchMock.mockOnceIf(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/users/patients/detail/e4eaaaf2-d142-4b42-9c0c-3e4b3b489a9e`,
//     async () =>
//       await Promise.resolve({
//         status: 200,
//         body: JSON.stringify({ data })
//       })
//   )
// })
