import { Form, TextFormField, SelectFormField, ProgressBar } from "../../../components/form/form"
import LegalStructureIcon from '../../../assets/icons/legalStructure'
import styles from './questionPage2.module.css'

export default function FormTwo () {
    return<div>
        <Form 
        currentStep='2'
        percentComplete='40'
        title='Legal Structure & Timeline'
        description='Business registration details'
        icon={LegalStructureIcon}
         progressBar={<ProgressBar percentComplete={40} />}
         >

        <div className={styles.childrenWrapper}>
            <SelectFormField label='Legal Structure' id='legalStructure' 
            required placeholder='Select Legal Structure' />

            <TextFormField label='Year Established' id='yearEstablished' 
            required placeholder='2026'
            note='Enter the year your business was officially established' />

            <TextFormField label='Registration Number (Optional)' 
            id='registrationNumber' placeholder='123456789'/>

        </div>

        </Form>
    
        </div>
}

