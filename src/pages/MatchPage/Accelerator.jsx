import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrantMatchCard from "../../components/card/MatchCard";
import GrantHeader from "../../components/GrantHeader";
import styles from "./Accelerator.module.css";

export default function Accelerator() {
  const navigate = useNavigate();
  const [grant, setGrant] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('selected_match');
    if (!raw) { setLoading(false); return; }

    const match = JSON.parse(raw);

    setGrant({
      id: match.id,
      name: match.title,
      provider: match.organization,
      tags: match.targetSectors
        ? match.targetSectors.split('|').map((s) => s.trim()).filter(Boolean)
        : [],
      extraTagCount: 0,
      fundingMin: match.fundingMin ?? 0,
      fundingMax: match.fundingMax ?? 0,
      processingTime: match.processingTime || 'Contact provider',
      successRate: match.score ?? 0,
      website: match.website ?? '',
      country: match.country ?? '',
      repaymentRequired: match.repaymentRequired ?? false,
      scoreBreakdown: match.scoreBreakdown ?? null,
    });

    setAnalysis({
      score: match.score ?? 0,
      level: match.matchQuality ?? 'Good',
      summary: match.aiAnalysis ?? '',
      strengths: extractStrengths(match),
    });

    setLoading(false);
    setTimeout(() => setRevealed(true), 100);
  }, []);

  const extractStrengths = (match) => {
    const strengths = [];
    const bd = match.scoreBreakdown;
    if (bd) {
      if (bd.geographic >= 30) strengths.push('Strong geographic alignment with funder location');
      if (bd.sector >= 20)     strengths.push("Your sector matches the funder's target industries");
      if (bd.amount_fit >= 15) strengths.push('Your funding request fits within their typical range');
      if (bd.stage >= 8)       strengths.push('Your business stage meets their eligibility criteria');
    }
    if (match.isEligible) strengths.push('You meet the core eligibility requirements');
    if (strengths.length === 0) strengths.push('Review AI advice below for detailed positioning tips');
    return strengths;
  };

  const handleApply = () => {
    if (grant?.website) window.open(grant.website, '_blank');
  };

  const ptColor = (val) =>
    val >= 30 ? '#16a34a' : val >= 15 ? '#d97706' : '#dc2626';

  /* ── No grant selected ── */
  if (!loading && !grant) {
    return (
      <div className={styles.page}>
        <GrantHeader onBack={() => navigate('/grant-matches')} />
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No grant selected</h2>
          <p className={styles.emptyText}>Please go back and select a funding opportunity to view details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} id="accelerator">

      <GrantHeader onBack={() => navigate('/grant-matches')} />

      <div className={styles.content}>

        {/* ── TITLE SECTION ── */}
        {!loading && grant && (
          <div className={styles.titleSection}>
            <div className={styles.metaPill}>
              <span className={styles.pillType}>
                {grant.repaymentRequired ? 'Loan' : 'Grant'}
              </span>
              {grant.country && (
                <>
                  <span className={styles.pillDot}>·</span>
                  <span className={styles.pillCountry}>{grant.country}</span>
                </>
              )}
            </div>
            <h1 className={styles.grantName}>{grant.name}</h1>
            <p className={styles.provider}>{grant.provider}</p>
            {grant.website && (
              <a href={grant.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                {grant.website} ↗
              </a>
            )}
          </div>
        )}

        {/* ── SCORE BREAKDOWN ── */}
        {!loading && grant?.scoreBreakdown && (
          <div className={styles.scoreCard}>
            <h3 className={styles.scoreCardTitle}>Score Breakdown</h3>
            <div className={styles.scoreGrid}>
              {Object.entries(grant.scoreBreakdown).map(([key, val]) => (
                <div key={key} className={styles.scoreRow}>
                  <span className={styles.scoreKey}>{key.replace('_', ' ')}</span>
                  <span className={styles.scoreVal} style={{ color: ptColor(val) }}>{val} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GRANT MATCH CARD ── */}
        <GrantMatchCard
          grant={grant}
          analysis={analysis}
          loading={loading}
          aiLoading={loading}
          revealed={revealed}
          onApply={handleApply}
        />

        {/* ── STRENGTHS CARD ── */}
        <div className={`${styles.strengthsCard} ${revealed ? styles.revealed : ''}`}>
          <div className={styles.strengthsHeader}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#16a34a" strokeWidth="1.8" />
              <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className={styles.strengthsTitle}>Your Strengths</h2>
          </div>
          {loading ? (
            <div className={styles.skeletonList}>
              {[200, 170, 210].map((w, i) => (
                <div key={i} className={styles.skeleton} style={{ width: w }} />
              ))}
            </div>
          ) : (
            <ul className={styles.strengthsList}>
              {analysis?.strengths?.map((s, i) => (
                <li key={i} className={styles.strengthItem} style={{ animationDelay: `${i * 0.12}s` }}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className={styles.checkIcon}>
                    <path d="M3 7.5l3 3 6-6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── ABOUT THIS OPPORTUNITY ── */}
        {!loading && grant && (
          <div className={styles.aboutSection}>

            <div className={styles.aboutBlock}>
              <h2 className={styles.aboutTitle}>About This Opportunity</h2>
              <p className={styles.aboutText}>
                {grant.repaymentRequired
                  ? `This is a repayable loan offered by ${grant.provider} to support businesses in ${grant.country}. Loan recipients retain full business ownership and gain access to a network of funders and mentors.`
                  : `Non-repayable grant funding for innovative small businesses developing new products, services, or technologies. Focus on businesses with high growth potential and market impact.`
                }
              </p>
            </div>

            <div className={styles.divider} />

            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>Key Benefits</h2>
              <ul className={styles.benefitsList}>
                {(grant.repaymentRequired
                  ? [
                      'Flexible repayment schedule',
                      'Retain 100% business ownership',
                      'Access to business mentorship',
                      'Networking opportunities',
                      'Competitive interest rates',
                    ]
                  : [
                      'No repayment required',
                      'Retain 100% business ownership',
                      'Access to business mentorship',
                      'Networking opportunities',
                      'Brand credibility boost',
                    ]
                ).map((b, i) => (
                  <li key={i} className={styles.benefitItem}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.benefitIcon}>
                      <circle cx="9" cy="9" r="8.5" stroke="#16a34a" strokeWidth="1.2" />
                      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.divider} />

            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
                  <circle cx="10" cy="10" r="9" stroke="#155DFC" strokeWidth="1.5" />
                  <path d="M7 10h6M10 7v6" stroke="#155DFC" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Eligibility Criteria
              </h2>

              <div className={styles.eligibilityGrid}>
                <div className={styles.eligibilityBlock}>
                  <p className={styles.eligibilityLabel}>Eligible Industries:</p>
                  <div className={styles.tagCloud}>
                    {(grant.tags?.length > 0 ? grant.tags : [
                      'Technology & Software', 'E-commerce & Retail', 'Manufacturing',
                      'Healthcare & Medical Services', 'Food & Beverage', 'Professional Services',
                      'Construction & Real Estate', 'Agriculture & Farming', 'Education & Training',
                      'Tourism & Hospitality', 'Energy & Utilities', 'Financial Services',
                      'Media & Entertainment', 'Arts & Creative Services', 'Other',
                    ]).map((t, i) => (
                      <span key={i} className={styles.eligTag}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.eligibilityTwoCol}>
                  <div>
                    <p className={styles.eligibilityLabel}>Business Stages:</p>
                    <div className={styles.stageRow}>
                      <span className={styles.stagePill}>Startup (0-2 years)</span>
                      <span className={styles.stagePill}>Early Growth (2-5 years)</span>
                    </div>
                  </div>
                  <div>
                    <p className={styles.eligibilityLabel}>Minimum Years in Business:</p>
                    <p className={styles.eligibilityValue}>0 years</p>
                  </div>
                  <div>
                    <p className={styles.eligibilityLabel}>Employee Range:</p>
                    <p className={styles.eligibilityValue}>Just me (Solo), 2-5 employees, 6-10 employees, 11-25 employees</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Required Documents */}
            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
                  <rect x="3" y="2" width="14" height="16" rx="2" stroke="#9810FA" strokeWidth="1.5" />
                  <path d="M6 7h8M6 10h8M6 13h5" stroke="#9810FA" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Required Documents
              </h2>
              <p className={styles.aboutText}>Prepare the following documents before starting your application:</p>
              <ol className={styles.docList}>
                {[
                  'Pitch deck (max 15 slides)',
                  'Product demo or screenshots',
                  'Business model canvas',
                  'Founder bios and LinkedIn profiles',
                  'Market research',
                  'Financial projections',
                ].map((doc, i) => (
                  <li key={i} className={styles.docItem}>
                    <span className={styles.docNum}>{i + 1}</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.divider} />

            {/* Application Process */}
            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>Application Process</h2>
              <ol className={styles.processList}>
                {[
                  'Online pitch deck submission',
                  'Product demo or prototype review',
                  'Founder interview',
                  'Due diligence',
                  'Terms negotiation and funding',
                ].map((step, i) => (
                  <li key={i} className={styles.processItem}>
                    <span className={styles.processNum}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        )}

        {/* ── READY TO APPLY CTA BANNER ── */}
        {!loading && grant?.website && (
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerLeft}>
              <h3 className={styles.ctaBannerTitle}>Ready to Apply?</h3>
              <p className={styles.ctaBannerText}>
                Review the requirements and prepare your documents to strengthen your application.
              </p>
            </div>
            <button className={styles.ctaBannerBtn} onClick={handleApply}>
              Click Here
            </button>
          </div>
        )}

      </div>

      <footer className={styles.footer}>
        <p>© 2026 FundMatch AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
