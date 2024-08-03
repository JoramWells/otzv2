'use client'

import '../globals.css'

// import { Providers } from '../providers'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
          <div className="flex flex-row">

              {children}
          </div>
  )
}

export default PatientLayout
