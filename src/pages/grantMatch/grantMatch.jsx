import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GrantMatchPage.css';

import GrantHeader from '../../components/GrantHeader';
import StatCard from '../../components/matchPage/StatCard';
import FilterBar from '../../components/matchPage/FilterBar';
import FundingMatchCard from '../../components/matchPage/FundingMatchCard';

/* ════════════════════════════════════════
   Icons for stat cards (simple inline SVGs)
   ════════════════════════════════════════ */

function TotalMatchesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="4" height="14" rx="1" />
      <rect x="9" y="4" width="4" height="17" rx="1" />
      <rect x="16" y="10" width="4" height="11" rx="1" />
    </svg>
  );
}

function ExcellentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function EligibleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function GrantsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

/* ════════════════════════════════════════
   Business profile data
   ════════════════════════════════════════ */

const BUSINESS = {
  name: 'Nexus Autos',
  industry: 'Transportation & Logistics',
  stage: 'Early Growth (2-5 years)',
  location: 'Nigeria, Abuja',
};

/* ════════════════════════════════════════
   Mock funding matches data
   ════════════════════════════════════════ */

const MATCHES = [
  {
    id: 1,
    score: 95,
    type: 'Grant',
    title: 'CBN MSME Development Fund',
    organization: 'Central Bank of Nigeria',
    matchQuality: 'Excellent',
    isEligible: true,
    aiAnalysis:
      'Your business profile strongly aligns with this fund. Transportation & Logistics is a priority sector, your Abuja location is within the target region, and your early-growth stage meets all requirements.',
    fundingMin: 500000,
    fundingMax: 2000000,
    currency: '₦',
    processingTime: '4-6 weeks',
    strengths: [
      'Business stage matches perfectly',
      'Located in the target region',
      'Industry is a priority sector',
    ],
    weaknesses: ['High competition expected'],
  },
  {
    id: 2,
    score: 80,
    type: 'Grant',
    title: 'BOI Youth Entrepreneurship Fund',
    organization: 'Bank of Industry',
    matchQuality: 'Excellent',
    isEligible: true,
    aiAnalysis:
      "Strong alignment with BOI's focus on growth-stage businesses. Your logistics operations qualify for this fund targeting transport infrastructure development.",
    fundingMin: 1000000,
    fundingMax: 5000000,
    currency: '₦',
    processingTime: '6-8 weeks',
    strengths: ['Revenue stage qualifies', 'Priority sector for BOI'],
    weaknesses: [
      'Requires 2 years of audited accounts',
      'Competitive application process',
    ],
  },
  {
    id: 3,
    score: 75,
    type: 'Loan',
    title: 'SMEDAN SME Financing Scheme',
    organization: 'SMEDAN',
    matchQuality: 'Good',
    isEligible: true,
    aiAnalysis:
      'Good match for your profile. SMEDAN supports logistics companies in FCT with flexible repayment terms suited to early-growth businesses like yours.',
    fundingMin: 250000,
    fundingMax: 1000000,
    currency: '₦',
    processingTime: '3-4 weeks',
    strengths: ['Fast processing time', 'Flexible repayment terms'],
    weaknesses: ['Loan requires collateral', 'Limited to FCT businesses'],
  },
  {
    id: 4,
    score: 65,
    type: 'Grant',
    title: 'NITDA Digital Economy Fund',
    organization: 'NITDA',
    matchQuality: 'Good',
    isEligible: false,
    aiAnalysis:
      'Partial match — this fund targets tech-enabled businesses. Adding a digital component (e.g. fleet management software) to your operations could improve your eligibility significantly.',
    fundingMin: 500000,
    fundingMax: 3000000,
    currency: '₦',
    processingTime: '8-12 weeks',
    strengths: ['Large funding range', 'No repayment required'],
    weaknesses: [
      'Requires a technology component',
      'Long processing time',
      'Very competitive',
    ],
  },
  {
    id: 5,
    score: 40,
    type: 'Loan',
    title: 'BoA Agricultural Value Chain Fund',
    organization: 'Bank of Agriculture',
    matchQuality: 'Fair',
    isEligible: false,
    aiAnalysis:
      'Low alignment — this fund primarily targets agricultural businesses. Your transport services could qualify only as agricultural logistics support, which is a small portion of the fund.',
    fundingMin: 200000,
    fundingMax: 800000,
    currency: '₦',
    processingTime: '6-10 weeks',
    strengths: ['Low interest rate'],
    weaknesses: [
      'Agriculture-focused sector',
      'Limited to farm transportation',
      'Strict eligibility criteria',
    ],
  },
];

/* ════════════════════════════════════════
   Page component
   ════════════════════════════════════════ */

export default function GrantMatchPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [matchFilter, setMatchFilter] = useState('');

  /* ── Compute stats from data ── */
  const totalMatches = MATCHES.length;
  const excellentCount = MATCHES.filter((m) => m.matchQuality === 'Excellent').length;
  const eligibleCount = MATCHES.filter((m) => m.isEligible).length;
  const grantsCount = MATCHES.filter((m) => m.type === 'Grant').length;

  /* ── Filter matches based on search + dropdowns ── */
  const filteredMatches = MATCHES.filter((match) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      match.title.toLowerCase().includes(searchTerm) ||
      match.organization.toLowerCase().includes(searchTerm);

    const matchesType = typeFilter === '' || match.type.toLowerCase() === typeFilter;
    const matchesQuality =
      matchFilter === '' || match.matchQuality.toLowerCase() === matchFilter;

    return matchesSearch && matchesType && matchesQuality;
  });

  /* ── Navigate to detail page when a card is clicked ── */
  const handleCardClick = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };

  return (
    <div className="gmp">
      {/* ── Top navigation header ── */}
      <GrantHeader />

      <main className="gmp__main">

        {/* ── Page title & subtitle ── */}
        <div>
          <h1 className="gmp__heading">Your Personalized Funding Matches</h1>
          <p className="gmp__subheading">
            Based on your <strong>{BUSINESS.name}</strong> business profile &nbsp;|&nbsp;
            {BUSINESS.industry} &nbsp;|&nbsp; {BUSINESS.location}
          </p>
        </div>

        {/* ── Stats cards row ── */}
        <div className="gmp__stats">
          <StatCard
            value={totalMatches}
            label="Total Matches"
            icon={<TotalMatchesIcon />}
            iconBg="#EFF6FF"
          />
          <StatCard
            value={excellentCount}
            label="Excellent Matches"
            icon={<ExcellentIcon />}
            iconBg="#F0FDF4"
          />
          <StatCard
            value={eligibleCount}
            label="Eligible"
            icon={<EligibleIcon />}
            iconBg="#EEF2FF"
          />
          <StatCard
            value={grantsCount}
            label="Grants Available"
            icon={<GrantsIcon />}
            iconBg="#FEF9C3"
          />
        </div>

        {/* ── Filter bar (tags + search + dropdowns) ── */}
        <FilterBar
          tags={[BUSINESS.name, BUSINESS.industry, BUSINESS.stage, BUSINESS.location]}
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          matchFilter={matchFilter}
          onMatchChange={setMatchFilter}
        />

        {/* ── Results header ── */}
        <div className="gmp__results-header">
          <h2 className="gmp__results-count">{filteredMatches.length} Opportunities Found</h2>
          <p className="gmp__results-sub">Ranked by AI compatibility score</p>
        </div>

        {/* ── Match cards ── */}
        <div className="gmp__cards-list">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <FundingMatchCard
                key={match.id}
                match={match}
                onClick={() => handleCardClick(match.id)}
              />
            ))
          ) : (
            <p className="gmp__no-results">No opportunities match your filters.</p>
          )}
        </div>

      </main>
    </div>
  );
}
