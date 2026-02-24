import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, SelectFormField, ProgressBar } from '../../../components/form/form'
import BusinessBasicsIcon from '../../../assets/icons/businessBasics'
import styles from './questionPage1.module.css'
import { useState } from 'react'

const sectorOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'fintech', label: 'Financial Technology (FinTech)' },
  { value: 'healthcare', label: 'Healthcare & Medical Services' },
  { value: 'agriculture', label: 'Agriculture & Farming' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing & Industrial' },
  { value: 'education', label: 'Education & Training' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'construction', label: 'Construction & Infrastructure' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'consulting', label: 'Business Consulting' },
  { value: 'government', label: 'Government & Public Sector' },
  { value: 'non_profit', label: 'Non-Profit / Social Enterprise' },
]

const stageOptions = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'early', label: 'Early Stage' },
  { value: 'growth', label: 'Growth Stage' },
]

const yesNoOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
]

export default function FormOne() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()
  const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}

  if (!formData.company_name.trim())
    newErrors.company_name = 'Business name is required'

  if (!formData.nationality.trim())
    newErrors.nationality = 'Registration country is required'
  else if (!/^[a-zA-Z\s]+$/.test(formData.nationality.trim()))
    newErrors.nationality = 'Country name must contain letters only'

  if (!formData.sector)
    newErrors.sector = 'Please select a sector'

  if (!formData.business_stage)
    newErrors.business_stage = 'Please select a business stage'

  if (formData.business_registered === '' || formData.business_registered === undefined)
    newErrors.business_registered = 'Please select an option'

  if (formData.business_age_months === '' || formData.business_age_months === undefined)
    newErrors.business_age_months = 'Business age is required'
  else if (!/^\d+$/.test(String(formData.business_age_months)))
    newErrors.business_age_months = 'Business age must be a whole number (e.g. 18)'
  else if (Number(formData.business_age_months) <= 0)
    newErrors.business_age_months = 'Business age must be greater than 0'

  return newErrors
}

  const handleNext = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    navigate('/getStarted2')
  }

  return (
    <Form
      currentStep='1'
      percentComplete='40'
      title='Business Identity & Registration'
      description='Tell us about your business'
      icon={BusinessBasicsIcon}
      progressBar={<ProgressBar percentComplete={40} />}
      onNext={handleNext}
      showPrevious={false}
    >
      <div className={styles.childrenWrapper}>

        <TextFormField
          label='Business Name'
          required
          value={formData.company_name}
          placeholder='Enter your business name'
          error={errors.company_name}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'company_name', value: e.target.value })
          }
        />

        <SelectFormField
          label='Sector'
          required
          options={sectorOptions}
          value={formData.sector}
          error={errors.sector}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'sector', value: e.target.value })
          }
        />

        <TextFormField
          label='Registration Country'
          placeholder='e.g Nigeria'
          required
          value={formData.nationality}
          error={errors.nationality}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'nationality', value: e.target.value })
          }
        />

        <SelectFormField
          label='Business Stage'
          required
          options={stageOptions}
          value={formData.business_stage}
          error={errors.business_stage}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'business_stage', value: e.target.value })
          }
        />

        <TextFormField
          label='Business Age (Months)'
          type='number'
          placeholder='e.g 18'
          required
          value={formData.business_age_months}
          error={errors.business_age_months}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'business_age_months', value: e.target.value })
          }
        />

        <SelectFormField
          label='Business Registered?'
          required
          options={yesNoOptions}
          value={formData.business_registered}
          error={errors.business_registered}
          onChange={e =>
            dispatch({ type: 'UPDATE_FIELD', field: 'business_registered', value: e.target.value === 'true' })
          }
        />

      </div>
    </Form>
  )
}
