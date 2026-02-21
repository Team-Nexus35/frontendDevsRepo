import styles from './readySection.module.css'
import Button from '../../buttons/button'
import NewButton from '../../../components/newButton/newButton'
import BlackArrowRight from '../../../assets/icons/BlackArrowRight'

export default function Ready () {
    return <section className={styles.section}>
        <div >
        <h2>Ready to Find Your Perfect Funding Match?</h2>
        <p>Join thousands of SMEs who have found funding opportunities through our platform</p>
        <NewButton 
                text='Get Started Free'
                variant='filledWhite'
                Icon= {BlackArrowRight}
                style={{ padding: '1.5rem' }}
                 />
        </div>
    </section>
}