import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, SelectFormField, ProgressBar } from '../../../components/form/form'
import FundingNeedsIcon from '../../../assets/icons/fundingNeeds'
import styles from './questionPage3.module.css'

const READINESS_URL = 'https://backend-production-aa3a.up.railway.app/api/readiness'

const innovationOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'very_high', label: 'Very High' },
]

const yesNoOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
]

export default function FormThree() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const validate = () => {
    const newErrors = {}

    if (formData.funding_need_usd === '' || formData.funding_need_usd === undefined)
      newErrors.funding_need_usd = 'Funding amount is required'
    else if (!/^\d+(\.\d+)?$/.test(String(formData.funding_need_usd)))
      newErrors.funding_need_usd = 'Please enter a valid number (e.g. 50000)'
    else if (Number(formData.funding_need_usd) <= 0)
      newErrors.funding_need_usd = 'Funding amount must be greater than 0'

    if (formData.annual_revenue_usd === '' || formData.annual_revenue_usd === undefined)
      newErrors.annual_revenue_usd = 'Annual revenue is required'
    else if (!/^\d+(\.\d+)?$/.test(String(formData.annual_revenue_usd)))
      newErrors.annual_revenue_usd = 'Please enter a valid number (e.g. 20000)'
    else if (Number(formData.annual_revenue_usd) < 0)
      newErrors.annual_revenue_usd = 'Revenue cannot be negative'

    if (!formData.innovation_level)
      newErrors.innovation_level = 'Please select an innovation level'

    if (formData.has_prototype === '' || formData.has_prototype === undefined)
      newErrors.has_prototype = 'Please select an option'

    if (formData.targets_underserved === '' || formData.targets_underserved === undefined)
      newErrors.targets_underserved = 'Please select an option'

    return newErrors
  }

  const handleNext = async () => {
    if (!formData.company_name || !formData.sector || !formData.nationality || !formData.founder_age) {
      setSubmitError('Missing information from previous steps. Please go back to page 1 and fill all fields.')
      return
    }

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSubmitError(null)

    const token = localStorage.getItem('token')

    const payload = {
      company_name: formData.company_name.trim(),
      sector: formData.sector,
      nationality: formData.nationality.trim(),
      business_stage: formData.business_stage,
      business_registered_in: formData.nationality.trim(),
      business_registered: Boolean(formData.business_registered),
      founder_age: Number(formData.founder_age),
      founder_gender: formData.founder_gender,
      business_age_months: Number(formData.business_age_months),
      annual_revenue_usd: Number(formData.annual_revenue_usd),
      employees: Number(formData.employees),
      funding_need_usd: Number(formData.funding_need_usd),
      innovation_level: formData.innovation_level,
      has_prototype: Boolean(formData.has_prototype),
      targets_underserved: Boolean(formData.targets_underserved),
    }

    try {
      const response = await fetch(READINESS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const rawText = await response.text()
      let data = null
      try {
        data = JSON.parse(rawText)
        console.log('Readiness response:', JSON.stringify(data, null, 2))
      } catch {
        console.warn('Response not JSON:', rawText)
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
          data?.error ||
          (data?.errors ? JSON.stringify(data.errors) : null) ||
          `Server error: ${response.status}`
        )
      }

      // Store the full profile payload in localStorage
      // so grantMatch page can register it in the AI service when user clicks "Find Matches"
      localStorage.setItem('readiness_profile', JSON.stringify(payload))
      console.log('Profile saved to localStorage for matching')

      navigate('/getStarted4')

    } catch (err) {
      console.error('Submit error:', err)
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrevious = () => navigate('/getStarted2')

  return (
    <div>
      <Form
        currentStep='3'
        percentComplete='60'
        title='Business Capability & Impact'
        description='Tell us about your business strength and funding needs'
        icon={FundingNeedsIcon}
        progressBar={<ProgressBar percentComplete={60} />}
        onNext={handleNext}
        onPrevious={handlePrevious}
        nextText={isSubmitting ? 'Saving...' : 'Next'}
      >
        <div className={styles.childrenWrapper}>

          <TextFormField
            label='Funding Needed (USD)'
            id='funding_need_usd'
            required
            type='number'
            placeholder='e.g 50000'
            value={formData.funding_need_usd}
            error={errors.funding_need_usd}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'funding_need_usd', value: e.target.value })
            }
          />

          <TextFormField
            label='Annual Revenue (USD)'
            id='annual_revenue_usd'
            required
            type='number'
            placeholder='e.g 20000'
            value={formData.annual_revenue_usd}
            error={errors.annual_revenue_usd}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'annual_revenue_usd', value: e.target.value })
            }
          />

          <SelectFormField
            label='Innovation Level'
            id='innovation_level'
            required
            placeholder='Select innovation level'
            options={innovationOptions}
            value={formData.innovation_level}
            error={errors.innovation_level}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'innovation_level', value: e.target.value })
            }
          />

          <SelectFormField
            label='Does your business have a prototype?'
            id='has_prototype'
            required
            placeholder='Select option'
            options={yesNoOptions}
            value={formData.has_prototype}
            error={errors.has_prototype}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'has_prototype', value: e.target.value === 'true' })
            }
          />

          <SelectFormField
            label='Does your business target underserved communities?'
            id='targets_underserved'
            required
            placeholder='Select option'
            options={yesNoOptions}
            value={formData.targets_underserved}
            error={errors.targets_underserved}
            onChange={e =>
              dispatch({ type: 'UPDATE_FIELD', field: 'targets_underserved', value: e.target.value === 'true' })
            }
          />

        </div>

        {submitError && (
          <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>
            {submitError}
          </p>
        )}

      </Form>
    </div>
  )
}
