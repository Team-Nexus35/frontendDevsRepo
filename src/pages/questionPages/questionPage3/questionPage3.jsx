import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, ProgressBar } from '../../../components/form/form'
import BusinessLocationIcon from '../../../assets/icons/businessLocation'
import styles from './questionPage3.module.css'

export default function FormThree() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()

  const handleNext = () => navigate('/formFour')
  const handlePrevious = () => navigate('/formTwo')

  return (
    <div>
      <Form
        currentStep='3'
        percentComplete='60'
        title='Business Location'
        description='Where is your business located?'
        icon={BusinessLocationIcon}
        progressBar={<ProgressBar percentComplete={60} />}
        onNext={handleNext}
        onPrevious={handlePrevious}
      >
        <div className={styles.childrenWrapper}>
          <TextFormField
            label='Country' id='country' required placeholder='Nigeria'
            value={formData.country}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'country', value: e.target.value })}
          />
          <span>
            <TextFormField
              label='State/Region' id='stateRegion' required placeholder='Abuja'
              value={formData.stateRegion}
              onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'stateRegion', value: e.target.value })}
            />
            <TextFormField
              label='City' id='city' required placeholder='Wuse'
              value={formData.city}
              onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'city', value: e.target.value })}
            />
          </span>
          <div className={styles.lastDiv}>
            <strong>Note:</strong>
            <p>Location helps us match you with regional and national funding opportunities</p>
          </div>
        </div>
      </Form>
    </div>
  )
}