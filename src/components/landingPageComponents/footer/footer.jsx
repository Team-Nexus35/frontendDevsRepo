import styles from './footer.module.css'
import tempLogo from '../../../assets/images/tempLogo.png'

const footerLinks = [
    {
        heading: 'For Applicants',
        links: [
            'Discover Grant',
            'AI Grant Matching',
            'Check Eligibility',
            'AI Recommendation Engine',
        ],
    },
    {
        heading: 'For Funders',
        links: [
            'AI Applicant Screening',
            'Manage Submission',
            'Verification and Compliance',
            'Partner With Us',
        ],
    },
    {
        heading: 'Support & Help',
        links: [
            'About Us',
            'Contact',
            'Privacy Policy',
            'Terms of Service',
        ],
    },
]

function FooterColumn({ heading, links }) {
    return (
        <div className={styles.column}>
            <h4>{heading}</h4>
            <ul>
                {links.map((link) => (
                    <li key={link}>
                        <a href="#" className={styles.link}>{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.section1}>
            <div className={styles.brand}>

                <img className={styles.logo} src={tempLogo} />
                <p className={styles.tagline}>
                    Connecting business owner with funding opportunities to create positive change.
                </p>

            </div>

            <div className={styles.divider} />

            <nav className={styles.linksSection}>
                {footerLinks.map((column) => (
                    <FooterColumn
                        key={column.heading}
                        heading={column.heading}
                        links={column.links}
                    />
                ))}
            </nav>
            </section>

            <section className={styles.section2}>
                <p className={styles.lastP}>© 2026 FundMatch AI. All rights reserved.</p>
            </section>
        </footer>
    )
}