import './FundingMatchCard.css';

/* ── Circular score badge ── */
function CircularScore({ score }) {
  return (
    <div className="circular-score">
      <div className="circular-score__label">
        <span className="circular-score__number">{score}</span>
        <span className="circular-score__percent">%</span>
      </div>
      <span className="circular-score__match">MATCH</span>
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

        {/* Funding amount + processing time + rate */}
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
          {match.rate && (
            <div className="fmc__meta-item">
              <span className="fmc__meta-label">Interest Rate</span>
              <span className="fmc__meta-value fmc__meta-value--rate">{match.rate}</span>
            </div>
          )}
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

        {/* Areas to Improve */}
        {match.areasToImprove && match.areasToImprove.length > 0 && (
          <div className="fmc__improve">
            <p className="fmc__improve-label">Areas to Improve</p>
            <div className="fmc__improve-list">
              {match.areasToImprove.map((item, i) => (
                <div key={i} className="fmc__improve-item">
                  <span className="fmc__improve-icon">&#9650;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
