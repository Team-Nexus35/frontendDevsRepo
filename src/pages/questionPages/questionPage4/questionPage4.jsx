import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, SelectFormField, ProgressBar } from '../../../components/form/form'
import FinancialIcon from '../../../assets/icons/financialIcon'
import styles from './questionPage4.module.css'

const revenueOptions = [
  { value: 'under-1m', label: 'Under ₦1M' },
  { value: '1m-10m', label: '₦1M - ₦10M' },
  { value: '10m-100m', label: '₦10M - ₦100M' },
  { value: 'above-100m', label: 'Above ₦100M' },
]

const profitabilityOptions = [
  { value: 'profitable', label: 'Profitable' },
  { value: 'break-even', label: 'Breaking Even' },
  { value: 'pre-revenue', label: 'Pre-Revenue' },
  { value: 'loss', label: 'Operating at a Loss' },
]

const employeeOptions = [
  { value: '1', label: 'Just Me' },
  { value: '2-10', label: '2 - 10' },
  { value: '11-50', label: '11 - 50' },
  { value: '51-200', label: '51 - 200' },
  { value: '200+', label: '200+' },
]

export default function FormFour() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()

  // UI-only step — no API call
  const handleNext = () => navigate('/getStarted5')
  const handlePrevious = () => navigate('/getStarted3')

  return (
    <div>
      <Form
        currentStep='4'
        percentComplete='80'
        title='Financial & Team Size'
        description='Tell us about your business performance'
        icon={FinancialIcon}
        progressBar={<ProgressBar percentComplete={80} />}
        onNext={handleNext}
        onPrevious={handlePrevious}
      >
        <div className={styles.childrenWrapper}>

          <SelectFormField
            label='Annual Revenue' id='annualRevenue' required
            placeholder='Select revenue range'
            options={revenueOptions}
            value={formData.annualRevenue}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'annualRevenue', value: e.target.value })}
          />

          <SelectFormField
            label='Current Profitability' id='currentProfitability' required
            placeholder='Select profitability status'
            options={profitabilityOptions}
            value={formData.currentProfitability}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'currentProfitability', value: e.target.value })}
          />

          <SelectFormField
            label='Number of Employees' id='numberOfEmployees' required
            placeholder='Select employee count'
            options={employeeOptions}
            value={formData.numberOfEmployees}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'numberOfEmployees', value: e.target.value })}
          />

        </div>
      </Form>
    </div>
  )
}
