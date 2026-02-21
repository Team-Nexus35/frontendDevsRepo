import { Form, TextFormField, SelectFormField, ProgressBar } from "../../../components/form/form"
import styles from './questionPage3.module.css'
import BusinessLocationIcon from '../../../assets/icons/businessLocation'

export default function FormThree () {
    return<div>
        <Form 
        currentStep='3'
        percentComplete='60'
        title='Business Location'
        description='Where is your business located?'
        icon={BusinessLocationIcon}
         progressBar={<ProgressBar percentComplete={60} />}
         >

        <div className={styles.childrenWrapper}>
            <TextFormField label='Country' id='country' 
            required placeholder='Nigeria' />

            <span>
               <TextFormField label='State/Region' id='state/Region' 
                required placeholder='Abuja' />

                <TextFormField label='City' id='city' 
                required placeholder='Wuse' /> 
            </span>

            <div className={styles.lastDiv}>
                <strong>Note:</strong>
                <p>Location helps us match you with regional and national funding opportunities</p>
            </div>

        </div>

        </Form>
    
        </div>
}

