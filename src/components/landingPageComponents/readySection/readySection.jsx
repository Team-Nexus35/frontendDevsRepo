import styles from './readySection.module.css'
import Button from '../../buttons/button'

export default function Ready () {
    return <section className={styles.section}>
        <div >
        <h2>Ready to Find Your Perfect Funding Match?</h2>
        <p>Join thousands of SMEs who have found funding opportunities through our platform</p>
        <Button variant='heroSectionWhiteBtn' text='Start Your Free Match' />
        </div>
    </section>
}