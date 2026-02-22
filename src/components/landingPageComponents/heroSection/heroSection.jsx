import styles from './heroSection.module.css'
import NewButton from '../../../components/newButton/newButton'
import Button from '../../buttons/button'
import WhiteArrowRight from '../../../assets/icons/whiteArrowRight'
import tempLogo from '../../../assets/images/tempLogo.png'
import { useNavigate } from 'react-router-dom'


export default function HeroSection () {
    
        const navigate = useNavigate()

    return <div className={styles.wrapper}>

            <div className={styles.circleLeft} />
            <div className={styles.circleRight} />
            <img className={styles.logo} src={tempLogo} />
            <h1 className={styles.heading1}>Find Perfect Funding for Your Business</h1>
            <p className={styles.text} >Stop wasting time searching. Our AI matches your SME with the most relevant grants and loans in seconds. Get personalized recommendations based on your unique business profile.</p>

            <span className={styles.btns}>
                <NewButton 
                text='Get Started Free'
                variant='filledBlack'
                Icon= {WhiteArrowRight}
                style={{ padding: '1.5rem 1rem' }}
                btnFunction={() => navigate('/formOne')}
                 />

                 <NewButton 
                text='Watch Demo'
                variant='filledWhite' style={{ padding: '1.5rem' }} />
            </span>

            <p className={styles.asideText}>✓ Free to use ✓ No credit card required ✓ 2-minute setup</p>
        
        </div>
    }