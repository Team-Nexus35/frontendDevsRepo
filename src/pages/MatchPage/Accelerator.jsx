
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrantMatchCard from "../../components/card/MatchCard";
import styles from "./Accelerator.module.css";

const fmt = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`);

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

  if (!loading && !grant) {
    return (
      <div className={styles.page}>
        {/* Sticky back bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => navigate('/grant-matches')}>
            ← Back to Matches
          </button>
        </div>
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No grant selected</h2>
          <p className={styles.emptyText}>Please go back and select a funding opportunity to view details.</p>
          <button className={styles.applyBtn} onClick={() => navigate('/grant-matches')}>
            ← Back to Matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} id="accelerator">

      <div className={styles.topBar}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(-1)} 
        >
          ← Back to Matches
        </button>
      </div>

      <div className={styles.content}>

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

            {/* Grant name — Arial heading */}
            <h1 className={styles.grantName}>{grant.name}</h1>

            {/* Provider — Segoe UI */}
            <p className={styles.provider}>{grant.provider}</p>

            {/* Website link */}
            {grant.website && (
              <a
                href={grant.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                {grant.website} ↗
              </a>
            )}
          </div>
        )}

        {/* ── SCORE BREAKDOWN CARD ── */}
        {!loading && grant?.scoreBreakdown && (
          <div className={styles.scoreCard}>
            <h3 className={styles.scoreCardTitle}>Score Breakdown</h3>
            <div className={styles.scoreGrid}>
              {Object.entries(grant.scoreBreakdown).map(([key, val]) => (
                <div key={key} className={styles.scoreRow}>
                  <span className={styles.scoreKey}>
                    {key.replace('_', ' ')}
                  </span>
                  <span
                    className={styles.scoreVal}
                    style={{ color: ptColor(val) }}
                  >
                    {val} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GRANT MATCH CARD (existing component — untouched) ── */}
        <GrantMatchCard
          grant={grant}
          analysis={analysis}
          loading={loading}
          aiLoading={loading}
          revealed={revealed}
          onApply={handleApply}
        />

        {/* ── AI ADVICE BOX ── */}
        {!loading && analysis?.summary && (
          <div className={styles.aiBox}>
            <div className={styles.aiBoxHeader}>
              <span className={styles.aiBoxIcon}>💡</span>
              <h3 className={styles.aiBoxTitle}>AI Match Analysis</h3>
            </div>
            <p className={styles.aiBoxText}>{analysis.summary}</p>
          </div>
        )}

        {/* ── STRENGTHS CARD ── */}
        <div className={`${styles.strengthsCard} ${revealed ? styles.revealed : ''}`}>
          <div className={styles.strengthsHeader}>
            {/* Checkmark circle icon */}
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
                <li
                  key={i}
                  className={styles.strengthItem}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className={styles.checkIcon}>
                    <path d="M3 7.5l3 3 6-6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── APPLY CTA ── */}
        {!loading && grant?.website && (
          <div className={styles.ctaSection}>
            <button className={styles.applyBtn} onClick={handleApply}>
              Apply Now ↗
            </button>
            <p className={styles.ctaNote}>You'll be redirected to the funder's website</p>
          </div>
        )}

      </div>
    </div>
  );
}
