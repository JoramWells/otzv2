declare interface ViralLoadInterface {
  isVLValid: boolean
  dateOfVL: MomentInput
  dateOfNextVL: MomentInput
  vlJustification: string
  vlResults: number
  id: any
  patient: {
    firstName: string
    middleName: string
  }
  createdAt: MomentInput
  // render?: (props: any) => React.ReactNode
}
