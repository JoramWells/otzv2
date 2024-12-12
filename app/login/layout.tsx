'use client'

import { Provider } from 'react-redux'
import '../globals.css'
import { store } from '@/lib/store'

// import { Providers } from '../providers'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider
    store={store}
    >
      <div >{children}</div>
    </Provider>
  )
}

export default PatientLayout
