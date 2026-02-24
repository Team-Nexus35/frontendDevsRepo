import styles from './howItWorks.module.css'

const items = [
    {
        sn: '01',
        title: 'Sign up',
        p: 'Create your free account in under 60 seconds',
    }, 

    {
        sn: '02',
        title: 'Complete profile',
        p: 'Answer questions about your business',
    },

    {
        sn: '03',
        title: 'Ai Matching',
        p: 'Our algorithm finds your best matches',
    },

    {
        sn: '04',
        title: 'Apply',
        p: 'Review ranked opportunities and apply',
    },
]

export default function HowItWorks () {
    return <div className={styles.sectionWrapper}>

        <div className={styles.wrapper}>

            <h2 className={styles.headingTitle}>How It Works</h2>

            <p className={styles.subTitle}>Four simple steps to find your perfect funding match</p>

        </div>

        <ul className={styles.ul}>
            {
                items.map((item, index)=>{

                    return<div key={index} className={styles.li} >

                        <p className={styles.sn} >{item.sn}</p>

                        <h3 className={styles.title}>{item.title}</h3>

                        <p className={styles.p}>{item.p}</p>
                    </div>
                })
            }
        </ul>

    </div>
}