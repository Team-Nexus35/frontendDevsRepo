import styles from './heroSection.module.css'
import { useNavigate } from 'react-router-dom'

import Button from '../../buttons/button'
import WhiteArrowRight from '../../../assets/icons/whiteArrowRight'
import tempLogo from '../../../assets/images/tempLogo.png'

export default function HeroSection () {
    const navigate = useNavigate()

    return <div className={styles.wrapper}>
            <img className={styles.logo} src={tempLogo} />
            <h1 className={styles.heading1}>Find Perfect Funding for Your Business</h1>
            <p className={styles.text} >Stop wasting time searching. Our AI matches your SME with the most relevant grants and loans in seconds. Get personalized recommendations based on your unique business profile.</p>

            <span className={styles.btns}>
                <Button text='Get started free' Icon={WhiteArrowRight} variant='heroSectionBtn' btnFunction={() => navigate('/grant-matches')} />
                <Button text='Watch Demo' variant='heroSectionWhiteBtn' />
            </span>

            <p className={styles.asideText}>✓ Free to use ✓ No credit card required ✓ 2-minute setup</p>

        </div>
    }