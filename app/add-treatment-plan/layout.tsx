import '../globals.css'
import { Providers } from '../providers'

const TreatmentPlanLayout = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>
}

export default TreatmentPlanLayout
