import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'
import { tertiaryColor } from '@/constants/color'
import { useState } from 'react'
import Select from 'react-select'

const FamilyPlanningModal = () => {
  const [onFamilyPlanning, setonFamilyPanning] = useState(false)

  const dataOptions = [
    {
      id: 'condoms',
      label: 'Condoms'
    },
    {
      id: 'implant',
      label: 'Implants'
    },
    {
      id: 'lam',
      label: 'Lactational Amenorrhea Methods'
    },
    {
      id: 'iud',
      label: 'Intrauterine Device'
    },
    {
      id: 'diaphragm',
      label: 'Diaphragm/Cervical Cap'
    },
    {
      id: 'injectable',
      label: 'Injectable'
    },
    {
      id: 'tubalLitigation',
      label: 'Tubal Litigation'
    },
    {
      id: 'vasectomy',
      label: 'Vasectomy'
    },
    {
      id: 'oralContraceptives',
      label: 'Oral Contraceptives'
    },
    {
      id: 'emergencyContraceptive',
      label: 'Emergency Contraceptive'
    },
    {
      id: 'fertilityAwareness',
      label: 'Fertility Awareness'
    },
    {
      id: 'other',
      label: 'Other'
    }
  ]
  const [reason, setReason] = useState('')
  const [notOnFamilyPlanning, setNotOnFamilyPlanning] = useState(false)
  const [considersFamilyPlanning, setConsidersFamilyPlanning] = useState(false)
  return (
    <div className={`bg-[${tertiaryColor}] w-full flex justify-between items-center p-1`}>
      <p className='font-bold'>Family Planning</p>

      <CaseManagerDialog label="NEW ART">
        <p>Family Planning</p>

        <CustomCheckbox
          label="On Family Planning"
          value={onFamilyPlanning}
          onChange={setonFamilyPanning}
        />

        {onFamilyPlanning && <Select options={dataOptions} />}

        <CustomCheckbox
          label="Considers Family Planning"
          value={considersFamilyPlanning}
          onChange={setConsidersFamilyPlanning}
        />

        {/* {considersFamilyPlanning && (
        <FamilyPanning
          condoms={condoms}
          diaphragm={diaphragm}
          emergencyContraceptive={emergencyContraceptive}
          fertilityAwareness={fertilityAwareness}
          implant={implant}
          injectable={injectable}
          iud={iud}
          lam={lam}
          oralContraceptives={oralContraceptives}
          other={other}
          setCondoms={setCondoms}
          setDiaphragm={setDiaphragm}
          setEmergencyContraceptive={setEmergencyContraceptive}
          setFertilityAwareness={setFertilityAwareness}
          setIUD={setIUD}
          setImplant={setImplant}
          setInjectable={setInjectable}
          setLAM={setLAM}
          setOralContraceptives={setOralContraceptives}
          setOther={setOther}
          setTubalLitigation={setTubalLitigation}
          setVasectomy={setVasectomy}
          tubalLitigation={tubalLitigation}
          vasectomy={vasectomy}
        />
      )} */}

        <CustomCheckbox
          label="Not Using Family Planning"
          value={notOnFamilyPlanning}
          onChange={setNotOnFamilyPlanning}
        />

        {notOnFamilyPlanning && (
          <div className="pl-4">
            <CustomSelect
              value={reason}
              onChange={setReason}
              data={[
                {
                  id: 'Wants To get Pregnant',
                  label: 'Wants To get Pregnant'
                },
                {
                  id: 'Thinks cant Pregnant',
                  label: 'Wants To get Pregnant'
                },
                {
                  id: 'Not Sexually Active',
                  label: 'Not Sexually Active'
                }
              ]}
            />
          </div>
        )}
      </CaseManagerDialog>
    </div>
  )
}

export default FamilyPlanningModal
