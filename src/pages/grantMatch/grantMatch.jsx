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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.739 12.445L14.497 16.708C14.505 16.758 14.498 16.810 14.476 16.856C14.455 16.902 14.419 16.940 14.375 16.966C14.331 16.991 14.281 17.003 14.230 16.999C14.179 16.995 14.131 16.975 14.091 16.943L12.301 15.599C12.215 15.535 12.110 15.500 12.002 15.500C11.894 15.500 11.789 15.535 11.703 15.599L9.910 16.943C9.871 16.975 9.822 16.994 9.772 16.998C9.721 17.002 9.671 16.991 9.626 16.966C9.582 16.940 9.546 16.902 9.525 16.856C9.504 16.810 9.497 16.758 9.505 16.708L10.262 12.445" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 13C13.657 13 15 11.657 15 10C15 8.343 13.657 7 12 7C10.343 7 9 8.343 9 10C9 11.657 10.343 13 12 13Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExcellentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H22V13" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EligibleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GrantsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22" stroke="#E60076" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 5H9.5C8.572 5 7.682 5.369 7.025 6.025C6.369 6.682 6 7.572 6 8.5C6 9.428 6.369 10.319 7.025 10.975C7.682 11.631 8.572 12 9.5 12H14.5C15.428 12 16.319 12.369 16.975 13.025C17.631 13.682 18 14.572 18 15.5C18 16.428 17.631 17.319 16.975 17.975C16.319 18.631 15.428 19 14.5 19H6" stroke="#E60076" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   Business profile data
   ════════════════════════════════════════ */

const BUSINESS = {
  name: 'IMARAFUND',
  industry: 'Transportation & Logistics ',
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
    title: 'Communities Innovation Fund',
    organization: 'SMEs Grant for Communites',
    matchQuality: 'Excellent',
    isEligible: true,
    aiAnalysis:
      'Outstanding match! Your Transportation & Logistics  business is perfectly aligned with this hybrid. You meet all  key requirements and this opportunity could significantly support your growth.',
    fundingMin: 150000,
    fundingMax: 100000,
    currency: '$',
    processingTime: '4-6 weeks',
    strengths: [
      'Your indutry aligns perfectly with this opportunity',
      'Business stage matches target criteria',
      'Located in the target region',
      'Industry is a priority sector',
    ],
    weaknesses: ['High competition expected'],
  },
  {
    id: 2,
    score: 80,
    type: 'Loan',
    title: 'SME Growth Loan Program',
    organization: 'Community Development Bank',
    matchQuality: 'Excellent',
    isEligible: true,
    aiAnalysis:
      "Strong match. Your business profile aligns well with this loan, though you may want to strengthen a few areas before applying.",
    fundingMin: 25000,
    fundingMax: 500000,
    currency: '$',
    rate: '4.5%-7.5% APR',
    processingTime: '2-4 weeks',
    strengths: ['Your industry aligns with this opportunity', 'Low interest rate',
      'Revenue stage qualifies', 'Priority sector for BOI'],
    weaknesses: [
      'Requires 2 years of audited accounts',
      'Competitive application process',
    ],
  },
  {
    id: 3,
    score: 75,
    type: 'Loan',
    title: 'Rural Business Development Grant',
    organization: 'Rural Economic Development Authority',
    matchQuality: 'Good',
    isEligible: true,
    aiAnalysis:
      'Strong match. Your business profile aligns well with this grant, though you may want to strengthen a few areas before applying.',
    fundingMin: 50000,
    fundingMax: 5000000,
    currency: '$',
    processingTime: '6-8 weeks',
    strengths: ['Fast processing time', 'Flexible repayment terms'],
    weaknesses: ['Loan requires collateral', 'Limited to FCT businesses'],
  },
  {
    id: 4,
    score: 65,
    type: 'Grant',
    title: 'Small Business Innovation Grant',
    organization: 'Federal Small Business Administration',
    matchQuality: 'Good',
    isEligible: false,
    aiAnalysis:
      'Moderate match. While you meet some requirements for this grant, there are several areas that need attention to improve your chances.',
    fundingMin: 10000,
    fundingMax: 150000,
    currency: '$',
    processingTime: '6-8 weeks',
    strengths: [
      'Your business stage matches the target criteria',
      'Your revenue is within the target range',
       'Large funding range',
       'No repayment required'],
    weaknesses: [
      'Requires a technology component',
      'Your industry may not be the primary focus',
      ' Need 1 more year(s) in business',
      'Long processing time',
      'Very competitive',
    ],
  },
  {
    id: 5,
    score: 40,
    type: 'Loan',
    title: 'SME Growth Loan Program',
    organization: 'Community Development Bank',
    matchQuality: 'poor',
    isEligible: false,
    aiAnalysis:
      'Limited match. This loan may not be the best fit for your current business profile. Consider other opportunities or work on meeting key requirements.',
    fundingMin: 250000,
    fundingMax: 500000,
    currency: '$',
    rate: '4.5%-7.5% APR',
    processingTime: '2-4 weeks',
    strengths: [
      'Your industry aligns with this opportunity',
      'Low interest rate',
    ],
    weaknesses: [
      'Agriculture-focused sector',
      'Limited to farm transportation',
      'Strict eligibility criteria',
    ],
    areasToImprove: [
      'This opportunity targets different business stages',
      ' Need 2 more year(s) in business',
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

        {/* ── Hero / gradient title banner ── */}
        <div className="gmp__hero">
          <span className="gmp__hero-label">AI-Matched Opportunities</span>
          <h1 className="gmp__heading">Your Personalized Funding Matches</h1>
          <p className="gmp__subheading">
            Based on your <strong>{BUSINESS.industry}</strong> business profile, we found{' '}
            <strong>{MATCHES.length} funding opportunities</strong> ranked by compatibility.
          </p>
        </div>

        {/* ── Stats cards grid (2×2) ── */}
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

      <footer className="gmp__footer">
        <p>© 2026 FundMatch AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
