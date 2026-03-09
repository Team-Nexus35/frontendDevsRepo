import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, SelectFormField, ProgressBar } from '../../../components/form/form'
import FounderDemographicsIcon from '../../../assets/icons/legalStructure'
import styles from './questionPage2.module.css'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_say', label: 'Prefer not to say' },
]

export default function FormTwo() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()
  const [errors, setErrors] = useState({})

  const validate = () => {
  const newErrors = {}

  if (formData.founder_age === '' || formData.founder_age === undefined)
    newErrors.founder_age = 'Founder age is required'
  else if (!/^\d+$/.test(String(formData.founder_age)))
    newErrors.founder_age = 'Age must be a whole number (e.g. 30)'
  else if (Number(formData.founder_age) < 18 || Number(formData.founder_age) > 100)
    newErrors.founder_age = 'Please enter a valid age between 18 and 100'

  if (formData.employees === '' || formData.employees === undefined)
    newErrors.employees = 'Number of employees is required'
  else if (!/^\d+$/.test(String(formData.employees)))
    newErrors.employees = 'Employees must be a whole number (e.g. 5)'
  else if (Number(formData.employees) < 1)
    newErrors.employees = 'Must have at least 1 employee'
  
  if (!formData.founder_gender)
    newErrors.founder_gender = 'Please select a gender'

  return newErrors
}

  const handleNext = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    navigate('/getStarted3')
  }

  const handlePrevious = () => navigate('/getStarted1')

  return (
    <div>
      <Form
        currentStep='2'
        percentComplete='40'
        title='Founder Demographics/Team Profile'
        description='Tell us about the business founder'
        icon={FounderDemographicsIcon}
        progressBar={<ProgressBar percentComplete={40} />}
        onNext={handleNext}
        onPrevious={handlePrevious}
      >
        <div className={styles.childrenWrapper}>

          <TextFormField
            label='Founder Age'
            id='founderAge'
            required
            placeholder='e.g. 30'
            type='number'
            value={formData.founder_age}
            error={errors.founder_age}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'founder_age', value: e.target.value })
            }
          />

          <SelectFormField
            label='Founder Gender'
            id='founderGender'
            required
            placeholder='Select gender'
            options={genderOptions}
            value={formData.founder_gender}
            error={errors.founder_gender}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'founder_gender', value: e.target.value })
            }
          />

          <TextFormField
            label='Number of Employees'
            id='employees'
            required
            type='number'
            placeholder='e.g 5'
            value={formData.employees}
            error={errors.employees}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'employees', value: e.target.value })
            }
          />

        </div>
      </Form>
    </div>
  )
}