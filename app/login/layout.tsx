'use client'

import '../globals.css'

// import { Providers } from '../providers'
import { ChakraProvider } from '@chakra-ui/react'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ChakraProvider>
          <div className="flex flex-row">

              {children}
          </div>
      </ChakraProvider>
  )
}

export default PatientLayout
