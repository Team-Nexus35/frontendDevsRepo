import { Form, TextFormField, SelectFormField, ProgressBar } from "../../../components/form/form"
import styles from './questionPage4.module.css'
import  FinancialIcon from '../../../assets/icons/financialIcon'

export default function FormFour () {
    return<div>
        <Form 
        currentStep='4'
        percentComplete='80'
        title='Financial & Team Size'
        description='Tell us about your business performance'
        icon={ FinancialIcon}
         progressBar={<ProgressBar percentComplete={80} />}
         >

        <div className={styles.childrenWrapper}>
            <SelectFormField label='Annual Revenue' 
            id='annualRevenue' 
            required placeholder='Select revenue range' />

            <SelectFormField label='Current Profitability' 
            id='currentProfitability' 
            required placeholder='Select profitability status' />

            <SelectFormField label='Number of Employees' 
            id='numberOfEmployees' required placeholder='Select employee count'/>

        </div>

        </Form>
    
        </div>
}

