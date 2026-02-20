import './GrandDetails.css';
import EligibilitySvg from "./../assets/icons/eligibility.svg?react";
import DocumentSvg from "./../assets/icons/document.svg?react";
import CheckSvg from "./../assets/icons/check-circle.svg?react";
import Footer from './footer';


const BENEFITS = [
  "No repayment required",
  "Retain 100% business ownership",
  "Access to business mentorship",
  "Networking opportunities",
  "Brand credibility boost",
];

const ELIGIBLE_INDUSTRIES = [
  "Technology & Software",
  "E-commerce & Retail",
  "Manufacturing",
  "Healthcare & Medical Services",
  "Food & Beverage",
  "Professional Services",
  "Construction & Real Estate",
  "Agriculture & Farming",
  "Education & Training",
  "Transportation & Logistics",
  "Tourism & Hospitality",
  "Energy & Utilities",
  "Financial Services",
  "Media & Entertainment",
  "Arts & Creative Services",
  "Other",
];

const BUSINESS_STAGES = ["Startup (0-2 years)", "Early Growth (2-5 years)"];

const EMPLOYEE_RANGES = [
  "Just me (Solo)",
  "2-5 employees",
  "6-10 employees",
  "11-25 employees",
];

const REQUIRED_DOCUMENTS = [
  "Pitch deck (max 15 slides)",
  "Product demo or screenshots",
  "Business model canvas",
  "Founder bios and LinkedIn profiles",
  "Market research",
  "Financial Projections"
];

const steps = [
  "Online pitch deck submission",
  "Product demo or prototype review",
  "Founder interview",
  "Due diligence",
  "Terms negotiation and funding",
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function GrantDetails() {

  // Replace "/apply" with your actual route
  const handleApply = () => {
    window.location.href = "/apply";
  };

  return (
    <div className="gd-wrapper">

      {/* ── About This Opportunity ─────────────────────────────── */}
      <section className="gd-section">
        <h2 className="gd-sectionTitle">About This Opportunity</h2>
        <p className="gd-body">
          Non-repayable grant funding for innovative small businesses developing
          new products, services, or technologies.
          <br />
          Focus on businesses with high growth potential and market impact.
        </p>
      </section>

      {/* Key Benefits  */}
      <section className="gd-section">
        <h2 className="gd-sectionTitle">Key Benefits</h2>
        <ul className="gd-benefitsList">
          {BENEFITS.map((b) => (
            <li key={b} className="gd-benefitItem">
              <CheckSvg className="gd-checkIcon" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Eligibility Criteria  */}
      <section className="gd-section">
        <h2 className="gd-sectionTitle gd-sectionTitle--icon">
          <EligibilitySvg className="gd-titleIcon" />
          Eligibility Criteria
        </h2>

        <div className="gd-criteriaBlock">
          <p className="gd-criteriaLabel">Eligible Industries:</p>
          <div className="gd-industryGrid">
            {ELIGIBLE_INDUSTRIES.map((ind) => (
              <span key={ind} className="gd-industryItem">{ind}</span>
            ))}
          </div>
        </div>

        <div className="gd-criteriaBlock">
          <p className="gd-criteriaLabel">Business Stages:</p>
          <div className="gd-stageRow">
            {BUSINESS_STAGES.map((s) => (
              <span key={s} className="gd-stageChip">{s}</span>
            ))}
          </div>
        </div>

        <div className="gd-criteriaRow">
          <div className="gd-criteriaBlock">
            <p className="gd-criteriaLabel">Minimum Years in Business:</p>
            <p className="gd-criteriaValue">0 years</p>
          </div>
          <div className="gd-criteriaBlock">
            <p className="gd-criteriaLabel">Employee Range:</p>
            <p className="gd-criteriaValue">{EMPLOYEE_RANGES.join(", ")}</p>
          </div>
        </div>
      </section>

      {/*  Required Documents */}
      <section className="gd-section">
        <h2 className="gd-sectionTitle gd-sectionTitle--icon">
          <DocumentSvg className="gd-titleIcon" />
          Required Documents
        </h2>
        <p className="gd-body">
          Prepare the following documents before starting your application:
        </p>
        <ol className="gd-docList">
          {REQUIRED_DOCUMENTS.map((doc, i) => (
            <li key={doc} className="gd-docItem">
              <span className="gd-docNum">{i + 1}</span>
              <span>{doc}</span>
            </li>
          ))}
        </ol>
      </section>

      {/*Application Process */}
      <section className="ap-wrapper">
        <div className="ap-card">
          <h2 className="ap-title">Application Process</h2>
          <ul className="ap-list">
            {steps.map((step, i) => (
              <li key={i} className="ap-item">
                <span className="ap-badge">{i + 1}</span>
                <span className="ap-stepText">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ap-banner">
          <div className="ap-bannerLeft">
            <h3 className="ap-bannerTitle">Ready to Apply?</h3>
            <p className="ap-bannerSub">
              Review the requirements and prepare your documents to strengthen your application.
            </p>
          </div>
          <button className="ap-bannerBtn" onClick={handleApply}>
            Click Here
          </button>
        </div>

        <Footer/>      

      </section>

    </div>
  );
}
