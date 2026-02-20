import './FundingMatchCard.css';

/* ── Circular SVG score indicator ── */
function CircularScore({ score }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.33
  const filledLength = (score / 100) * circumference;
  const offset = circumference - filledLength;

  const getColor = (s) => {
    if (s >= 85) return '#16A34A'; // green
    if (s >= 70) return '#D97706'; // amber
    if (s >= 50) return '#EA580C'; // orange
    return '#DC2626';              // red
  };

  const color = getColor(score);

  return (
    <div className="circular-score">
      <svg className="circular-score__svg" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="9"
        />
        {/* Colored progress arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      {/* Percentage text in the center */}
      <div className="circular-score__label" style={{ color }}>
        <span className="circular-score__number">{score}</span>
        <span className="circular-score__percent">%</span>
      </div>
    </div>
  );
}

/* ── Helper to format ₦ amounts ── */
function formatAmount(amount, currency) {
  if (amount >= 1000000) return `${currency}${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${currency}${(amount / 1000).toFixed(0)}K`;
  return `${currency}${amount.toLocaleString()}`;
}

/* ── Main card component ── */
export default function FundingMatchCard({ match, onClick }) {
  const getMatchBadgeClass = (quality) => {
    const q = quality.toLowerCase();
    if (q === 'excellent') return 'fmc__badge--excellent';
    if (q === 'good') return 'fmc__badge--good';
    return 'fmc__badge--fair';
  };

  const handleSave = (e) => {
    // Stop the card's onClick from firing when "Save for Later" is clicked
    e.stopPropagation();
    alert('Saved for later! (your team can implement this feature)');
  };

  return (
    <article
      className="fmc"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${match.title}`}
    >
      {/* ── Left column: score circle + type badge ── */}
      <div className="fmc__left">
        <CircularScore score={match.score} />
        <span className={`fmc__type-badge fmc__type-badge--${match.type.toLowerCase()}`}>
          {match.type}
        </span>
      </div>

      {/* ── Right column: all the card content ── */}
      <div className="fmc__right">

        {/* Title row */}
        <div className="fmc__title-row">
          <div className="fmc__title-block">
            <h3 className="fmc__title">{match.title}</h3>
            <p className="fmc__org">{match.organization}</p>
          </div>
          <div className="fmc__badges">
            {match.isEligible && (
              <span className="fmc__badge fmc__badge--eligible">&#10003; Eligible</span>
            )}
            <span className={`fmc__badge ${getMatchBadgeClass(match.matchQuality)}`}>
              {match.matchQuality} Match
            </span>
          </div>
        </div>

        {/* AI analysis box */}
        <div className="fmc__ai-box">
          <p className="fmc__ai-label">Why this matches you:</p>
          <p className="fmc__ai-text">{match.aiAnalysis}</p>
        </div>

        {/* Funding amount + processing time */}
        <div className="fmc__meta">
          <div className="fmc__meta-item">
            <span className="fmc__meta-label">Funding Amount</span>
            <span className="fmc__meta-value">
              {formatAmount(match.fundingMin, match.currency)} &ndash; {formatAmount(match.fundingMax, match.currency)}
            </span>
          </div>
          <div className="fmc__meta-item">
            <span className="fmc__meta-label">Processing Time</span>
            <span className="fmc__meta-value">{match.processingTime}</span>
          </div>
        </div>

        {/* Strengths and weaknesses */}
        <div className="fmc__pros-cons">
          <div className="fmc__pros">
            {match.strengths.map((item, i) => (
              <div key={i} className="fmc__pro-item">
                <span className="fmc__check">&#10003;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="fmc__cons">
            {match.weaknesses.map((item, i) => (
              <div key={i} className="fmc__con-item">
                <span className="fmc__x">&#10007;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="fmc__actions">
          <button className="fmc__btn-primary" onClick={onClick}>
            View Full Details
          </button>
          <button className="fmc__btn-link" onClick={handleSave}>
            Save for Later
          </button>
        </div>

      </div>
    </article>
  );
}
