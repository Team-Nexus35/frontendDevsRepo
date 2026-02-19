import styles from './landingPage.module.css'

import HeroSection from '../../components/landingPageComponents/heroSection/heroSection'
import AsideLandingPage1 from '../../components/landingPageComponents/asideLandingPage1/asideLandingPage1'
import WhyImaraFund from '../../components/landingPageComponents/whyIF/whyIF'
import HowItWorks from '../../components/landingPageComponents/howItWorks/howItWorks'
import GetMatched from '../../components/landingPageComponents/getMatched/getMatched'
import Ready from '../../components/landingPageComponents/readySection/readySection'
import Footer from '../../components/landingPageComponents/footer/footer'


export default function LandingPage () 
    {
    return <div className={styles.wrapper}>
        <HeroSection />
        <AsideLandingPage1 />
        <WhyImaraFund />
        <HowItWorks />
        <GetMatched />
        <Ready />
        <Footer />
        </div>
    }