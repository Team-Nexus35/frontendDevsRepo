import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../components/form/formContext'
import { Form, SelectFormField, CheckboxFormField, CheckboxGroup, ProgressBar } from '../../../components/form/form'
import FundingNeedsIcon from '../../../assets/icons/fundingNeeds'
import styles from './questionPage5.module.css'

const fundingAmountOptions = [
  { value: 'under-500k', label: 'Under ₦500K' },
  { value: '500k-5m', label: '₦500K - ₦5M' },
  { value: '5m-50m', label: '₦5M - ₦50M' },
  { value: 'above-50m', label: 'Above ₦50M' },
]

export default function FormFive() {
  const navigate = useNavigate()
  const { formData, dispatch } = useForm()

  const handleSubmit = () => navigate('/grant-matches')
  const handlePrevious = () => navigate('/getStarted4')

  const updateCheckbox = (group, field, value) => {
    dispatch({ type: 'UPDATE_CHECKBOX', group, field, value })
  }

  return (
    <div>
      <Form
        currentStep='5'
        percentComplete='100'
        title='Funding Needs & Readiness'
        description='What are you looking to fund?'
        icon={FundingNeedsIcon}
        progressBar={<ProgressBar percentComplete={100} />}
        onNext={handleSubmit}
        onPrevious={handlePrevious}
        nextText='Complete & Find Matches'
      >
        <div className={styles.childrenWrapper}>

          <CheckboxGroup label='Funding Purpose' required>
            <div className={styles.checkboxGrid}>

              <CheckboxFormField id='working-capital' label='Working Capital'
                checked={formData.fundingPurpose.workingCapital}
                onChange={e => updateCheckbox('fundingPurpose', 'workingCapital', e.target.checked)} />

              <CheckboxFormField id='equipment-purchase' label='Equipment Purchase'
                checked={formData.fundingPurpose.equipmentPurchase}
                onChange={e => updateCheckbox('fundingPurpose', 'equipmentPurchase', e.target.checked)} />

              <CheckboxFormField id='inventory' label='Inventory'
                checked={formData.fundingPurpose.inventory}
                onChange={e => updateCheckbox('fundingPurpose', 'inventory', e.target.checked)} />

              <CheckboxFormField id='business-expansion' label='Business Expansion'
                checked={formData.fundingPurpose.businessExpansion}
                onChange={e => updateCheckbox('fundingPurpose', 'businessExpansion', e.target.checked)} />

              <CheckboxFormField id='marketing-sales' label='Marketing & Sales'
                checked={formData.fundingPurpose.marketingSales}
                onChange={e => updateCheckbox('fundingPurpose', 'marketingSales', e.target.checked)} />

              <CheckboxFormField id='hiring-training' label='Hiring & Training'
                checked={formData.fundingPurpose.hiringTraining}
                onChange={e => updateCheckbox('fundingPurpose', 'hiringTraining', e.target.checked)} />

              <CheckboxFormField id='technology-software' label='Technology & Software'
                checked={formData.fundingPurpose.technologySoftware}
                onChange={e => updateCheckbox('fundingPurpose', 'technologySoftware', e.target.checked)} />

              <CheckboxFormField id='real-estate-facilities' label='Real Estate/Facilities'
                checked={formData.fundingPurpose.realEstateFacilities}
                onChange={e => updateCheckbox('fundingPurpose', 'realEstateFacilities', e.target.checked)} />

              <CheckboxFormField id='research-development' label='Research & Development'
                checked={formData.fundingPurpose.researchDevelopment}
                onChange={e => updateCheckbox('fundingPurpose', 'researchDevelopment', e.target.checked)} />

              <CheckboxFormField id='debt-refinancing' label='Debt Refinancing'
                checked={formData.fundingPurpose.debtRefinancing}
                onChange={e => updateCheckbox('fundingPurpose', 'debtRefinancing', e.target.checked)} />

            </div>
          </CheckboxGroup>

          <SelectFormField
            label='Funding Amount Needed' id='fundingAmountNeeded' required
            placeholder='Select funding amount range'
            options={fundingAmountOptions}
            value={formData.fundingAmountNeeded}
            onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'fundingAmountNeeded', value: e.target.value })}
          />

          <CheckboxGroup label='Application Readiness'>

            <CheckboxFormField id='business-plan' label='I have a business plan ready'
              checked={formData.applicationReadiness.businessPlan}
              onChange={e => updateCheckbox('applicationReadiness', 'businessPlan', e.target.checked)} />

            <CheckboxFormField id='financial-statements' label='I have financial statements prepared'
              checked={formData.applicationReadiness.financialStatements}
              onChange={e => updateCheckbox('applicationReadiness', 'financialStatements', e.target.checked)} />

            <CheckboxFormField id='bank-account' label='I have a business bank account'
              checked={formData.applicationReadiness.bankAccount}
              onChange={e => updateCheckbox('applicationReadiness', 'bankAccount', e.target.checked)} />

            <CheckboxFormField id='collateral' label='I have assets that can serve as collateral'
              checked={formData.applicationReadiness.collateral}
              onChange={e => updateCheckbox('applicationReadiness', 'collateral', e.target.checked)} />

          </CheckboxGroup>

          <div className={styles.almostDoneCard}>
            <div className={styles.almostDoneHeader}>
              <span className={styles.almostDoneIcon}>✓</span>
              <span className={styles.almostDoneTitle}>Almost Done!</span>
            </div>
            <p className={styles.almostDoneText}>
              Once you complete this profile, our AI will instantly analyze and rank funding opportunities
              based on your business profile. You'll see match scores and personalized recommendations.
            </p>
          </div>

        </div>
      </Form>
    </div>
  )
}
