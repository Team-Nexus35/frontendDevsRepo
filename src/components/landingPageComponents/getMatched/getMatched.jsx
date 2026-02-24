import styles from './getMatched.module.css'
import greenTick from '../../../assets/icons/greenTick.png'

function Bullet ({text}) {
    return <span className={styles.bullet}>
        <img src={greenTick} />
        <h4>{text}</h4>
    </span>
}

export default function GetMatched () {
    return <section className={styles.section}>

        <div className={styles.wrapper}>

            <div className={styles.leftDiv}>
                <h2>Get Matched with Opportunities You Actually Qualify For</h2>
                <p>Stop applying to programs you're not eligible for. Our AI 
                ensures you only see opportunities that match your business 
                profile, saving you time and increasing your success rate.</p>

                <div className={styles.bullets}>
                    <Bullet text='Smart eligibility checking before you apply' />
                    <Bullet text='Smart eligibility checking before you apply' />
                    <Bullet text='Both grants (no repayment) and flexible loans' />
                    <Bullet text='Detailed requirements and application guides' />
                    <Bullet text='Track all your applications in one place' />
                </div>

            </div>

            <div className={styles.rightDiv} >

                <div className={styles.rightDiv1}>

                    <span>
                        <p>Match Score</p>
                        <p>94%</p>
                    </span>

                    <input type="range" min="0" max="100" value="90" id="myRange" />


                </div>

                <div className={styles.rightDiv2}>

                    <h4>Innovation Grant Program</h4>
                    <p>$50,000 - $150,000 • Grant</p>

                    <span className={styles.rightDiv2Span}>
                        <p>Fully Eligible</p>
                        <p>Your Industry</p>
                    </span>

                </div>

            </div>
        </div>

    </section>
}