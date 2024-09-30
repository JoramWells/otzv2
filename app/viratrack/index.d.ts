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
  createdAt: Date | string
  updatedAt: Date | string
  // render?: (props: any) => React.ReactNode
}
