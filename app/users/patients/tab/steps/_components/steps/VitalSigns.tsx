import AddTriage from '@/app/users/patients/tab/steps/_components/AddTriage'

const VitalSigns = ({ patientID }: { patientID: string }) => {
  return (
    <AddTriage patientID={patientID} />
  )
}

export default VitalSigns
