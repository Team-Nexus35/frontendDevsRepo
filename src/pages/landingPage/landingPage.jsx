import styles from './landingPage.module.css'
import HeroSection from "../../components/heroSection/heroSection"
import AsideLandingPage1 from "../../components/asideLandingPage1/asideLandingPage1"


export default function LandingPage () 
    {
    return <div className={styles.wrapper}>
        <HeroSection />
        <AsideLandingPage1 />
        </div>
    }