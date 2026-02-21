import { Form, TextFormField, SelectFormField, ProgressBar } from "../../../components/form/form"
import BusinessBasicsIcon from '../../../assets/icons/businessBasics'
import styles from './questionPage1.module.css'

export default function FormOne () {
    return<div>
        <Form 
        currentStep='1'
        percentComplete='20'
        title='Business Basics'
        description='Tell us about your business'
        icon={BusinessBasicsIcon}
         progressBar={<ProgressBar percentComplete={20} />}
         >

        <div className={styles.childrenWrapper}>
            <TextFormField label='Business Name' id='businessName' 
            required placeholder='Your Business Inc.' />

            <SelectFormField label='Industry' id='industry' 
            required placeholder='Select your industry' />

            <SelectFormField label='Business Stage' id='businessStage' 
            required placeholder='Select your business stage' />

        </div>

        </Form>
        


        </div>
}

