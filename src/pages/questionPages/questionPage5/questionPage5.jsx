
import { Form, SelectFormField, CheckboxFormField, CheckboxGroup, ProgressBar } from "../../../components/form/form"
import styles from './questionPage5.module.css'
import FundingNeedsIcon from '../../../assets/icons/fundingNeeds'

export default function FormFive() {
    return (
        <div>
            <Form
                currentStep='5'
                percentComplete='100'
                title='Funding Needs & Readiness'
                description='What are you looking to fund?'
                icon={FundingNeedsIcon}
                progressBar={<ProgressBar percentComplete={100} />}
                nextText='Complete & Find Matches'
            >
                <div className={styles.childrenWrapper}>

                    <CheckboxGroup label='Funding Purpose' required>
                        <div className={styles.checkboxGrid}>
                            <CheckboxFormField id='working-capital' label='Working Capital' />
                            <CheckboxFormField id='equipment-purchase' label='Equipment Purchase' />
                            <CheckboxFormField id='inventory' label='Inventory' />
                            <CheckboxFormField id='business-expansion' label='Business Expansion' />
                            <CheckboxFormField id='marketing-sales' label='Marketing & Sales' />
                            <CheckboxFormField id='hiring-training' label='Hiring & Training' />
                            <CheckboxFormField id='technology-software' label='Technology & Software' />
                            <CheckboxFormField id='real-estate-facilities' label='Real Estate/Facilities' />
                            <CheckboxFormField id='research-development' label='Research & Development' />
                            <CheckboxFormField id='debt-refinancing' label='Debt Refinancing' />
                        </div>
                    </CheckboxGroup>

                    <SelectFormField label='Funding Amount Needed'
                    id='fundingAmountNeeded'
                    required placeholder='Select funding amount range' />

                    <CheckboxGroup label='Application Readiness'>
                        <CheckboxFormField id='business-plan' label='I have a business plan ready' />
                        <CheckboxFormField id='financial-statements' label='I have financial statements prepared' />
                        <CheckboxFormField id='bank-account' label='I have a business bank account' />
                        <CheckboxFormField id='collateral' label='I have assets that can serve as collateral' />
                    </CheckboxGroup>

                    <div className={styles.almostDoneCard}>
                        <div className={styles.almostDoneHeader}>
                            <span className={styles.almostDoneIcon}>✓</span>
                            <span className={styles.almostDoneTitle}>Almost Done!</span>
                        </div>
                        <p className={styles.almostDoneText}>
                            Once you complete this profile, our AI will instantly analyze and rank funding opportunities based on your business profile. You'll see match scores and personalized recommendations.
                        </p>
                    </div>

                </div>
            </Form>
        </div>
    )
}