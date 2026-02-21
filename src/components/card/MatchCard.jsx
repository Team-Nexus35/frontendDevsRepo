import "./MatchCard.css";
import DollarSvg from "../../assets/icons/dollarmatch.svg?react";
import ClockSvg from "../../assets/icons/clockmatch.svg?react";
import TrophySvg from "../../assets/icons/trophy.svg?react";
import EligibleSvg from "../../assets/icons/eligible.svg?react";
import LevelSvg from "../../assets/icons/level.svg?react";
import GrowthSvg from "../../assets/icons/growth.svg?react";

const fmt = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`);

function DollarIcon() {
  return <DollarSvg />;
}

function ClockIcon() {
  return <ClockSvg />;
}

function TrophyIcon() {
  return <TrophySvg />;
}

function ScoreSquare({ score, loading }) {
  const getScoreBg = (score) => {
    if (score >= 90) return "#00B848";
    if (score >= 80) return "#FACC15";
    if (score < 70) return "#EF4444";
    return "#9333EA";
  };

  const bgColor = getScoreBg(score);

  return (
    <div
      className="gmc-scoreSquare"
      style={{ background: loading ? "var(--success)" : bgColor }}
    >
      {loading ? (
        <span className="gmc-scoreLoading">…</span>
      ) : (
        <>
          <span className="gmc-scoreNum">{score}%</span>
          <span className="gmc-scoreLabel">MATCH</span>
        </>
      )}
    </div>
  );
}

function Stat({ icon, label, value, loading, className }) {
  return (
    <div className="gmc-stat">
      <div className={`gmc-statIcon ${className || ""}`}>
        {icon}
      </div>
      <div>
        <div className="gmc-statLabel">{label}</div>
        {loading ? (
          <div className="gmc-skeleton" style={{ width: 80 }} />
        ) : (
          <div className="gmc-statValue">{value}</div>
        )}
      </div>
    </div>
  );
}


export default function GrantMatchCard({
  grant,
  analysis,
  loading,
  aiLoading,
  revealed,
  onApply,
}) {
  return (
    <div className={`gmc-card ${revealed ? "revealed" : ""}`}>

      {/* ── Match Banner ─────────────────────────────────────────── */}
      <div className="gmc-matchBanner">
        <ScoreSquare score={analysis?.score ?? 0} loading={aiLoading} />

        <div className="gmc-bannerContent">
          <div className="gmc-bannerHeader">
            <span className="gmc-grantBadge">Grant</span>
            {!aiLoading && (
              <div className="">
                <span className="gmc-eligibleBadge">
                  <EligibleSvg />
                  Fully Eligible
                </span>
              </div>
            )}
          </div>

          <div className="gmc-info">
            <h3 className="gmc-aiTitle">AI Match Analysis</h3>

            {aiLoading ? (
              <>
                <div className="gmc-skeleton" style={{ width: "100%", marginBottom: 8 }} />
                <div className="gmc-skeleton" style={{ width: "80%" }} />
              </>
            ) : (
              <p className="gmc-aiSummary">{analysis.summary}</p>
            )}
          </div>

          {!aiLoading && (
            <div className="gmc-levelRow">
              <div className="gmc-level">
                <LevelSvg />
                <span className="gmc-levelText">
                  Match Level: <strong>{analysis.level}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

     
      <div className="gmc-grantSection">

        <div className="gmc-grantTop">
          <div className="gmc-grantLogoWrap">
            <div
              className="gmc-grantLogo"
            >
              <GrowthSvg />
            </div>
          </div>

          <div className="gmc-grantInfo">
            {loading ? (
              <>
                <div className="gmc-skeleton" style={{ width: 300, height: 28, marginBottom: 8 }} />
                <div className="gmc-skeleton" style={{ width: 160 }} />
              </>
            ) : (
              <>
                <h1 className="gmc-grantName">{grant.name}</h1>
                <p className="gmc-providerName">{grant.provider}</p>
              </>
            )}

            <div className="gmc-tags">
              {loading
                ? [120, 140, 100].map((w, i) => (
                    <div
                      key={i}
                      className="gmc-skeleton"
                      style={{ width: w, height: 26, borderRadius: 20 }}
                    />
                  ))
                : grant.tags.map((t) => (
                    <span key={t} className="gmc-tag">{t}</span>
                  ))}
              {!loading && grant.extraTagCount > 0 && (
                <span className="gmc-tag gmc-tag--accent">
                  +{grant.extraTagCount} more
                </span>
              )}
            </div>
          </div>
        </div>

  
        <div className="gmc-statsRow">
          <Stat
            icon={<DollarIcon />}
            className="stat-dollar-icon"
            label="Funding Amount"
            value={loading ? "" : `${fmt(grant.fundingMin)} – ${fmt(grant.fundingMax)}`}
            loading={loading}
          />
        
          <Stat
            icon={<ClockIcon />}
            className="stat-clock-icon"
            label="Processing Time"
            value={grant?.processingTime}
            loading={loading}
          />
        

          <Stat
            icon={<TrophyIcon />}
            className="stat-trophy-icon"
            label="Success Rate"
            value={loading ? "" : `${grant.successRate}%`}
            loading={loading}
          />
        </div>

   
        <button className="gmc-cta" onClick={onApply}>
          Click Here
        </button>

      </div>

    </div>
  );
}
