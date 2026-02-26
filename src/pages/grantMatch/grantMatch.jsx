import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GrantMatchPage.css';

import GrantHeader from '../../components/GrantHeader';
import StatCard from '../../components/matchPage/StatCard';
import FilterBar from '../../components/matchPage/FilterBar';
import FundingMatchCard from '../../components/matchPage/FundingMatchCard';

const CREATE_COMPANY_URL = '/ai-api/api/v1/companies';
const MATCH_URL = (companyId) => `/ai-api/api/v1/match/${companyId}`;

/* ════════════════════════════════════════
   Icons
   ════════════════════════════════════════ */

function TotalMatchesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13.739 12.445L14.497 16.708C14.505 16.758 14.498 16.810 14.476 16.856C14.455 16.902 14.419 16.940 14.375 16.966C14.331 16.991 14.281 17.003 14.230 16.999C14.179 16.995 14.131 16.975 14.091 16.943L12.301 15.599C12.215 15.535 12.110 15.500 12.002 15.500C11.894 15.500 11.789 15.535 11.703 15.599L9.910 16.943C9.871 16.975 9.822 16.994 9.772 16.998C9.721 17.002 9.671 16.991 9.626 16.966C9.582 16.940 9.546 16.902 9.525 16.856C9.504 16.810 9.497 16.758 9.505 16.708L10.262 12.445" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 13C13.657 13 15 11.657 15 10C15 8.343 13.657 7 12 7C10.343 7 9 8.343 9 10C9 11.657 10.343 13 12 13Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExcellentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H22V13" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EligibleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GrantsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2V22" stroke="#E60076" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 5H9.5C8.572 5 7.682 5.369 7.025 6.025C6.369 6.682 6 7.572 6 8.5C6 9.428 6.369 10.319 7.025 10.975C7.682 11.631 8.572 12 9.5 12H14.5C15.428 12 16.319 12.369 16.975 13.025C17.631 13.682 18 14.572 18 15.5C18 16.428 17.631 17.319 16.975 17.975C16.319 18.631 15.428 19 14.5 19H6" stroke="#E60076" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   Page component
   ════════════════════════════════════════ */

export default function GrantMatchPage() {
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [matches, setMatches] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [matchFilter, setMatchFilter] = useState('');

  const handleFindMatches = async () => {
    setStatus('loading');
    setError(null);

    try {
      const profileRaw = localStorage.getItem('readiness_profile');
      if (!profileRaw) throw new Error('No business profile found. Please complete the readiness form first.');

      const profile = JSON.parse(profileRaw);
      const headers = { 'Content-Type': 'application/json' };

      // Step 1 — Register company in AI service
      const createRes = await fetch(CREATE_COMPANY_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          company_name: profile.company_name,
          sector: profile.sector,
          nationality: profile.nationality,
          business_stage: profile.business_stage,
          business_registered_in: profile.business_registered_in,
          founder_age: profile.founder_age,
          founder_gender: profile.founder_gender,
          business_age_months: profile.business_age_months,
          annual_revenue_usd: profile.annual_revenue_usd,
          employees: profile.employees,
          funding_need_usd: profile.funding_need_usd,
          innovation_level: profile.innovation_level,
          has_prototype: profile.has_prototype,
          targets_underserved: profile.targets_underserved,
        }),
      });

      const createText = await createRes.text();
      if (!createRes.ok) throw new Error(`Failed to register company: ${createRes.status} — ${createText}`);

      const companyData = JSON.parse(createText);
      const aiCompanyId = companyData?.id;
      if (!aiCompanyId) throw new Error('AI service did not return a company ID.');

      // Step 2 — Run matching
      const matchRes = await fetch(MATCH_URL(aiCompanyId), { method: 'POST', headers });
      const matchText = await matchRes.text();
      if (!matchRes.ok) throw new Error(`Matching failed: ${matchRes.status} — ${matchText}`);

      const data = JSON.parse(matchText);
      const rawMatches = data.matches ?? [];
      const aiSum = data.ai_summary ?? data.ai_recommendation ?? '';

      const normalised = rawMatches.map((m, i) => ({
        id: i + 1,
        score: m.match_score ?? 0,
        type: m.repayment_required === 'True' || m.repayment_required === true ? 'Loan' : 'Grant',
        title: m.program_name ?? 'Untitled',
        organization: m.institution ?? '',
        country: m.country ?? '',
        matchQuality: m.match_score >= 80 ? 'Excellent' : m.match_score >= 60 ? 'Good' : 'Fair',
        isEligible: m.match_score >= 50,
        aiAnalysis: m.ai_advice ?? '',
        fundingMin: 0,
        fundingMax: m.funding_amount ?? 0,
        currency: '$',
        rate: null,
        processingTime: '',
        strengths: [],
        weaknesses: [],
        areasToImprove: [],
        scoreBreakdown: m.score_breakdown ?? null,
        website: m.website ?? '',
        targetSectors: m.target_sectors ?? '',
        repaymentRequired: m.repayment_required === 'True' || m.repayment_required === true,
      }));

      setMatches(normalised);
      setCompanyName(data.company_name ?? profile.company_name ?? 'Your Business');
      setAiSummary(aiSum);
      setStatus('done');

    } catch (err) {
      console.error('Match error:', err);
      setError(err.message);
      setStatus('idle');
    }
  };

  // Save selected match to localStorage then go to accelerator
  const handleCardClick = (match) => {
    localStorage.setItem('selected_match', JSON.stringify(match));
    navigate('/accelerator');
  };

  const totalMatches = matches.length;
  const excellentCount = matches.filter((m) => m.matchQuality === 'Excellent').length;
  const eligibleCount = matches.filter((m) => m.isEligible).length;
  const grantsCount = matches.filter((m) => m.type === 'Grant').length;

  const filteredMatches = matches.filter((match) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      match.title.toLowerCase().includes(searchTerm) ||
      match.organization.toLowerCase().includes(searchTerm);
    const matchesType = typeFilter === '' || match.type?.toLowerCase() === typeFilter;
    const matchesQuality = matchFilter === '' || match.matchQuality?.toLowerCase() === matchFilter;
    return matchesSearch && matchesType && matchesQuality;
  });

  if (status === 'loading') {
    return (
      <div className="gmp" id="grant-matches">
        <GrantHeader />
        <main className="gmp__main">
          <div className="gmp__hero">
            <span className="gmp__hero-label">AI-Matched Opportunities</span>
            <h1 className="gmp__heading">Finding your matches…</h1>
            <p className="gmp__subheading">Our AI is analysing your profile against available opportunities.</p>
          </div>
          <div className="gmp__loading">
            {[1, 2, 3].map((i) => <div key={i} className="gmp__skeleton" />)}
          </div>
        </main>
      </div>
    );
  }

  if (status === 'idle') {
    return (
      <div className="gmp" id="grant-matches">
        <GrantHeader />
        <main className="gmp__main">
          <div className="gmp__hero">
            <span className="gmp__hero-label">AI-Matched Opportunities</span>
            <h1 className="gmp__heading">Ready to Find Your Funding Matches?</h1>
            <p className="gmp__subheading">
              Our AI will analyse your business profile and match you with the best funding opportunities available.
            </p>
            {error && <p style={{ color: 'red', marginTop: 12, fontSize: 14 }}>{error}</p>}
            <button className="gmp__find-btn" onClick={handleFindMatches}>Find My Matches</button>
            <p style={{ marginTop: 12, fontSize: 13, color: '#888', cursor: 'pointer' }} onClick={() => navigate('/getStarted1')}>
              ← Update my profile
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="gmp" id="grant-matches">
      <GrantHeader />
      <main className="gmp__main">

        <div className="gmp__hero">
          <span className="gmp__hero-label">AI-Matched Opportunities</span>
          <h1 className="gmp__heading">Your Personalized Funding Matches</h1>
          <p className="gmp__subheading">
            Based on your <strong>{companyName}</strong> profile, we found{' '}
            <strong>{matches.length} funding opportunities</strong> ranked by compatibility.
          </p>
          {aiSummary && (
            <p className="gmp__ai-rec"><strong>AI Summary:</strong> {aiSummary}</p>
          )}
        </div>

        <div className="gmp__stats">
          <StatCard value={totalMatches} label="Total Matches" icon={<TotalMatchesIcon />} iconBg="#EFF6FF" />
          <StatCard value={excellentCount} label="Excellent Matches" icon={<ExcellentIcon />} iconBg="#F0FDF4" />
          <StatCard value={eligibleCount} label="Eligible" icon={<EligibleIcon />} iconBg="#EEF2FF" />
          <StatCard value={grantsCount} label="Grants Available" icon={<GrantsIcon />} iconBg="#FEF9C3" />
        </div>

        <FilterBar
          tags={[companyName].filter(Boolean)}
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          matchFilter={matchFilter}
          onMatchChange={setMatchFilter}
        />

        <div className="gmp__results-header">
          <h2 className="gmp__results-count">{filteredMatches.length} Opportunities Found</h2>
          <p className="gmp__results-sub">Ranked by AI compatibility score</p>
        </div>

        <div className="gmp__cards-list">
          {matches.length === 0 ? (
            <div className="gmp__empty">
              <p className="gmp__empty-title">No matches found</p>
              <p className="gmp__empty-text">{aiSummary || 'No suitable matches found for your profile at this time.'}</p>
              <button className="gmp__find-btn" onClick={handleFindMatches} style={{ marginTop: 16 }}>Try Again</button>
            </div>
          ) : filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <FundingMatchCard
                key={match.id}
                match={match}
                onClick={() => handleCardClick(match)}
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
