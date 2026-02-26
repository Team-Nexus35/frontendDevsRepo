import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrantMatchCard from "../../components/card/MatchCard";
import "./Accelerator.css";
import GrantHeader from "../../components/GrantHeader";

const fmt = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`);

export default function Accelerator() {
  const navigate = useNavigate();
  const [grant, setGrant] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('selected_match');
    if (!raw) {
      setLoading(false);
      return;
    }

    const match = JSON.parse(raw);

    // Map match data to what GrantMatchCard expects
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

  // Pull key strengths from the score breakdown
  const extractStrengths = (match) => {
    const strengths = [];
    const bd = match.scoreBreakdown;
    if (bd) {
      if (bd.geographic >= 30) strengths.push('Strong geographic alignment with funder location');
      if (bd.sector >= 20) strengths.push('Your sector matches the funder\'s target industries');
      if (bd.amount_fit >= 15) strengths.push('Your funding request fits within their typical range');
      if (bd.stage >= 8) strengths.push('Your business stage meets their eligibility criteria');
    }
    if (match.isEligible) strengths.push('You meet the core eligibility requirements');
    if (strengths.length === 0) strengths.push('Review AI advice below for detailed positioning tips');
    return strengths;
  };

  const handleApply = () => {
    if (grant?.website) {
      window.open(grant.website, '_blank');
    }
  };

  if (!loading && !grant) {
    return (
      <div className="page" id="accelerator">
        <GrantHeader />
        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
          <h2>No grant selected</h2>
          <p style={{ color: '#888', marginTop: 8 }}>Please go back and select a funding opportunity to view details.</p>
          <button
            onClick={() => navigate('/grant-matches')}
            style={{ marginTop: 24, padding: '12px 24px', borderRadius: 8, background: '#155DFC', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15 }}
          >
            ← Back to Matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" id="accelerator">
      <div className="blob1" />
      <div className="blob2" />

      <GrantHeader />

      {/* Back button */}
      <div style={{ padding: '16px 24px 0' }}>
        <button
          onClick={() => navigate('/grant-matches')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#155DFC', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to Matches
        </button>
      </div>

      {/* Grant header info */}
      {!loading && grant && (
        <div style={{ padding: '16px 24px 0' }}>
          <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
            {grant.repaymentRequired ? 'Loan' : 'Grant'} · {grant.country}
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{grant.name}</h1>
          <p style={{ color: '#555', marginTop: 4 }}>{grant.provider}</p>

          {grant.website && (
            <a
              href={grant.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#155DFC', marginTop: 4, display: 'inline-block' }}
            >
              {grant.website} ↗
            </a>
          )}
        </div>
      )}

      {/* Score breakdown */}
      {!loading && grant?.scoreBreakdown && (
        <div style={{ margin: '20px 24px', padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Score Breakdown</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {Object.entries(grant.scoreBreakdown).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#555', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: val >= 30 ? '#00A63E' : val >= 15 ? '#F59E0B' : '#EF4444' }}>
                  {val} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GrantMatchCard */}
      <GrantMatchCard
        grant={grant}
        analysis={analysis}
        loading={loading}
        aiLoading={loading}
        revealed={revealed}
        onApply={handleApply}
      />

      {/* AI Advice */}
      {!loading && analysis?.summary && (
        <div style={{ margin: '0 24px 24px', padding: '20px 24px', background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: '#1e40af' }}>💡 AI Advice</h3>
          <p style={{ fontSize: 14, color: '#1e3a8a', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Strengths card */}
      <div className={`strengthsCard ${revealed ? "revealed" : ""}`}>
        <div className="strengthsHeader">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: 8 }}>
            <circle cx="9" cy="9" r="8" stroke="#00C07F" strokeWidth="1.8" />
            <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#00C07F" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <h2 className="strengthsTitle">Your Strengths</h2>
        </div>

        {loading ? (
          [200, 170, 210].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: w, height: 16, marginBottom: 14 }} />
          ))
        ) : (
          <ul className="strengthsList">
            {analysis?.strengths?.map((s, i) => (
              <li key={i} className="strengthItem" style={{ animationDelay: `${i * 0.12}s` }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginRight: 10, flexShrink: 0 }}>
                  <path d="M3 7.5l3 3 6-6" stroke="#00C07F" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Apply CTA */}
      {!loading && grant?.website && (
        <div style={{ padding: '0 24px 40px', textAlign: 'center' }}>
          <button
            onClick={handleApply}
            style={{ padding: '14px 40px', background: '#155DFC', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', maxWidth: 400 }}
          >
            Apply Now ↗
          </button>
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>You'll be redirected to the funder's website</p>
        </div>
      )}

    </div>
  );
}
