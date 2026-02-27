

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './policy.module.css';
import NewButton from '../../components/newButton/newButton'

const Section = ({ title, children }) => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {children}
  </section>
);

const List = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item, i) => (
      <li key={i} className={styles.listItem}>
        <span className={styles.bullet} />
        {item}
      </li>
    ))}
  </ul>
);

const OrderedList = ({ items }) => (
  <ol className={styles.orderedList}>
    {items.map((item, i) => (
      <li key={i} className={styles.orderedItem}>
        <span className={styles.orderedNum}>{String(i + 1).padStart(2, "0")}</span>
        {item}
      </li>
    ))}
  </ol>
);

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          {/* <div className={styles.badge}>Privacy Policy</div> */}
          <h1 className={styles.title}>TERMS & PRIVACY POLICY</h1>
          <p className={styles.subtitle}>
            How we collect, use, and protect your data
          </p>
        </header>

        <div className={styles.card}>
          <Section title="Data We Collect">
            <p className={styles.intro}>
              Information collected from SMEs using the web application includes:
            </p>
            <OrderedList
              items={[
                "Name and contact details of the SME",
                "Email address of the SME",
                "Business information",
                "Location data",
                "Account credentials and details",
                "AI query inputs",
              ]}
            />
          </Section>

          <div className={styles.divider} />

          <Section title="How We Use Your Data">
            <p className={styles.intro}>The data collected is used to:</p>
            <OrderedList
              items={[
                "Provide grant matching services — match SMEs to grants for which they are most eligible",
                "Improve AI scoring and recommendation functionality",
                "Communicate platform updates to SMEs",
                "Ensure platform security",
                "Comply with legal obligations",
              ]}
            />
          </Section>

          <div className={styles.divider} />

          <Section title="Legal Basis for Processing">
            <List
              items={[
                "User consent",
                "Contractual necessity",
                "Legitimate business interests",
                "Compliance with applicable data protection laws",
              ]}
            />
          </Section>

          <div className={styles.divider} />

          <Section title="Data Security">
            <p className={styles.intro}>
              To ensure data is securely protected, we implement:
            </p>
            <List
              items={[
                "Encryption in transit (HTTPS)",
                "Access control restrictions",
                "Secure hosting environments",
                "Routine security monitoring and checkup",
              ]}
            />
          </Section>

          <div className={styles.divider} />

          <Section title="Data Retention">
            <p className={styles.text}>
              The personal data of SMEs collected is retained only as long as
              necessary to provide services or meet legal obligations.
            </p>
          </Section>

          <div className={styles.divider} />

          <Section title="Your Rights">
            <p className={styles.intro}>
              Users may request data according to their legal rights via official
              contact channels. Requests may include:
            </p>
            <List
              items={[
                "Access to their data",
                "Correction of inaccurate data",
                "Deletion of their data",
                "Withdrawal of consent",
                "Where applicable, the transferability of data",
              ]}
            />
          </Section>

          <div className={styles.divider} />

          <Section title="Third-Party Sharing">
            <p className={styles.intro}>
              All third parties must adhere to appropriate security standards.
              If required, data may be shared with:
            </p>
            <List
              items={[
                "Hosting providers",
                "Analytics providers",
                "AI service providers",
              ]}
            />
            <p className={styles.note}>
              In the event of a data breach, affected users and regulators will
              be notified in accordance with applicable law.
            </p>
          </Section>

          <div className={styles.divider} />

          <Section title="Contact Information">
            <p className={styles.text}>
              For privacy inquiries or complaints, please reach out to us:
            </p>
            <div className={styles.contactBlock}>
              <a href="mailto:wtfellowship@tech4dev.com" className={styles.email}>
                wtfellowship@tech4dev.com
              </a>
              <a href="mailto:teamnexus@tech4dev.com" className={styles.email}>
                teamnexus@tech4dev.com
              </a>
              <p className={styles.team}>WTF Capstone Project — Group 35</p>
            </div>
          </Section>
        </div>

        <div className={styles.footer}>
          <NewButton variant="outline" text='Go back' 
          className={styles.closeBtn} btnFunction={handleClose}/>
        </div>
      </div>
    </div>
  );
}