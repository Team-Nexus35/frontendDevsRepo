// import { Form, TextFormField, SelectFormField, ProgressBar } from "../../../components/form/form"
// import LegalStructureIcon from '../../../assets/icons/legalStructure'
// import styles from './questionPage2.module.css'

// export default function FormTwo () {
//     return<div>
//         <Form 
//         currentStep='2'
//         percentComplete='40'
//         title='Legal Structure & Timeline'
//         description='Business registration details'
//         icon={LegalStructureIcon}
//          progressBar={<ProgressBar percentComplete={40} />}
//          >

//         <div className={styles.childrenWrapper}>
//             <SelectFormField label='Legal Structure' id='legalStructure' 
//             required placeholder='Select Legal Structure' />

//             <TextFormField label='Year Established' id='yearEstablished' 
//             required placeholder='2026'
//             note='Enter the year your business was officially established' />

//             <TextFormField label='Registration Number (Optional)' 
//             id='registrationNumber' placeholder='123456789'/>

//         </div>

//         </Form>
    
//         </div>
// }

// FormTwo.jsx
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, SelectFormField, ProgressBar } from '../../../components/form/form'
import LegalStructureIcon from '../../../assets/icons/legalStructure'
import styles from './questionPage2.module.css'

const legalStructureOptions = [
  { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llc', label: 'LLC' },
  { value: 'corporation', label: 'Corporation' },
]

export default function FormTwo() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()

  const handleNext = () => navigate('/formThree')
  const handlePrevious = () => navigate('/formOne')

  return (
    <div>
      <Form
        currentStep='2'
        percentComplete='40'
        title='Legal Structure & Timeline'
        description='Business registration details'
        icon={LegalStructureIcon}
        progressBar={<ProgressBar percentComplete={40} />}
        onNext={handleNext}
        onPrevious={handlePrevious}
      >
        <div className={styles.childrenWrapper}>
          <SelectFormField
            label='Legal Structure' id='legalStructure' required
            placeholder='Select Legal Structure'
            options={legalStructureOptions}
            value={formData.legalStructure}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'legalStructure', value: e.target.value })}
          />
          <TextFormField
            label='Year Established' id='yearEstablished' required
            placeholder='2026'
            note='Enter the year your business was officially established'
            value={formData.yearEstablished}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'yearEstablished', value: e.target.value })}
          />
          <TextFormField
            label='Registration Number (Optional)' id='registrationNumber'
            placeholder='123456789'
            value={formData.registrationNumber}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'registrationNumber', value: e.target.value })}
          />
        </div>
      </Form>
    </div>
  )
}

//overall, get actual option list array for selectField inputs