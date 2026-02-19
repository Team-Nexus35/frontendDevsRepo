import Card from '../../card/card.jsx'
import styles from './whyIF.module.css'
import whyIF1 from '../../../assets/icons/whyIF1.png'
import whyIF2 from '../../../assets/icons/whyIF2.png'
import whyIF3 from '../../../assets/icons/whyIF3.png'
import whyIF4 from '../../../assets/icons/whyIF4.png'

export default function WhyImaraFund () {
    return <div className={styles.sectionWrapper} >
        <div className={styles.wrapper}> 
            <div className={styles.texts}>
            <h2 className={styles.h2}>Why Choose Imara Fund AI?</h2>
            <p className={styles.p}>Powerful features designed to help you find and secure the right funding for your business</p>
            </div>

            <span className={styles.cardsWrapper}>
                <Card 
                heading='AI-Powered Matching' 
                pText='Our intelligent algorithm analyzes your 
                business profile and matches you with the most 
                relevant funding opportunities.'
                icon={whyIF1}
                />

                <Card 
                heading='Ranked Results'
                pText='Get opportunities ranked by
                compatibility score, so you can
                focus on applications with the
                highest success potential.'
                icon={whyIF2}
                
                />

                <Card
                heading='Grants & Loans' 
                pText='Access both grant funding (no
                repayment) and flexible loan
                options from trusted providers
                nationwide.'
                icon={whyIF3}
                />

                <Card 
                heading='Quick Process'
                pText='Complete your profile in minutes
                and instantly see matched
                opportunities. No more
                searching through hundreds of
                options.'
                icon={whyIF4}
                />
            </span>
        </div>
    </div>
}
