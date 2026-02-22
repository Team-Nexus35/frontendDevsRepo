import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, TextFormField, SelectFormField, ProgressBar } from '../../../components/form/form'
import BusinessBasicsIcon from '../../../assets/icons/businessBasics'
import styles from './questionPage1.module.css'

const industryOptions = [
  { value: 'tech', label: 'Technology' },
  { value: 'retail', label: 'Retail' },
  { value: 'healthcare', label: 'Healthcare' },
  // JUST FOR TESTING, REMOVE AND REPLACE WITH ACTUAL OPTIONS
]

const businessStageOptions = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'startup', label: 'Startup' },
  { value: 'growth', label: 'Growth' },
  // JUST FOR TESTING, REMOVE AND REPLACE WITH ACTUAL OPTIONS
]

export default function FormOne() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()

  const handleNext = () => navigate('/formTwo')

  return (
    <div>
      <Form
        currentStep='1'
        percentComplete='20'
        title='Business Basics'
        description='Tell us about your business'
        icon={BusinessBasicsIcon}
        progressBar={<ProgressBar percentComplete={20} />}
        onNext={handleNext}
        showPrevious={false}
        //ask if showPrevious should be false or decide where to navigate to
      >
        <div className={styles.childrenWrapper}>
          <TextFormField
            label='Business Name' id='businessName' required
            placeholder='Your Business Inc.'
            value={formData.businessName}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'businessName', value: e.target.value })}
          />
          <SelectFormField
            label='Industry' id='industry' required
            placeholder='Select your industry'
            options={industryOptions}
            value={formData.industry}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'industry', value: e.target.value })}
          />
          <SelectFormField
            label='Business Stage' id='businessStage' required
            placeholder='Select your business stage'
            options={businessStageOptions}
            value={formData.businessStage}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'businessStage', value: e.target.value })}
          />
        </div>
      </Form>
    </div>
  )
}


// overall:
// determine location for previous btn to navigate to,
// get array of list for options of select fields