import styles from './landingPage.module.css'

import HeroSection from '../../components/landingPageComponents/heroSection/heroSection'
import AsideLandingPage1 from '../../components/landingPageComponents/asideLandingPage1/asideLandingPage1'


export default function LandingPage () 
    {
    return <div className={styles.wrapper}>
        <HeroSection />
        <AsideLandingPage1 />
        </div>
    }