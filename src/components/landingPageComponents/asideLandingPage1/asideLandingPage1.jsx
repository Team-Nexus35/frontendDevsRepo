
import styles from './asideLandingPage1.module.css'

import dollarIcon from '../../../assets/icons/dollarIcon.png'
import oppIcon from '../../../assets/icons/oppIcon.png'
import peopleIcon from '../../../assets/icons/peopleIcon.png'

const SectionItems = [
    {
        icon: dollarIcon,
        text: '$150M+',
        subText: 'Funding Matched'
    },

    {
        icon: peopleIcon,
        text: '5,000+',
        subText: 'SMEs Funded'
    },

    {
        icon: oppIcon,
        text: "2500+",
        subText: "Active Opportunities"
    }

]

export default function AsideLandingPage1 () {
    return (
        <section>
            <ul className={styles.ul}>{
                
                SectionItems.map((item, index)=> {

                    return (
                        <li className={styles.li} key={index}>

                            <img className={styles.icon} src={item.icon} />

                            <h2 className={styles.h2} >{item.text}</h2>

                            <p className={styles.subText} >{item.subText}</p>
                        </li>
                    )

                })

                }
                
            </ul>

        </section>
    )
}