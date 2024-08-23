/* eslint-disable @typescript-eslint/no-var-requires */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import HomePage from '../page'
import AuthProviders from '@/components/providers'

// jest.mock('next-auth/react', () => ({
//   ...jest.requireActual('next-auth/react'),
//   useSession: jest.fn()
// }))

jest.mock('next-auth/react')
jest.mock('next/router')

describe('HomePage', () => {
  it('renders a heading', () => {
    const useSessionMock = require('next-auth/react').useSession
    useSessionMock.mockReturnValue({
      data: {
        user: {
          name: 'Otaja',
          email: 'otaja@gmail.com'
        },
        expires: '2024-04-06'
      },
      status: 'authenticated'
    })

    //
    // const router = createMockRouter({})
    render(
      // <RouterContext.Provider value={router} >
        <AuthProviders>
          <HomePage />
        </AuthProviders>
      // </RouterContext.Provider>
    )

    // const heading = screen.getByRole('heading', { level: 1 })

    // expect(heading).toBeInTheDocument()
  })
})
