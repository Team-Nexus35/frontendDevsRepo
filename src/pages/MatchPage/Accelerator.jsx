import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrantMatchCard from "../../components/card/MatchCard";
import "./Accelerator.css";
import GrantDetails from "../../components/GrandDetails";
import GrantHeader from "../../components/GrantHeader";

const BASE_URL = "http://localhost:5000/api";
const BUSINESS_ID = 3;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── Fallback mock data (used when the real API is unavailable) ── */
const MOCK_API = {
  fetchGrant: async () => {
    await delay(400);
    return {
      id: "minority-biz-accelerator",
      name: "Minority Business Accelerator Fund",
      provider: "Equity Growth Partners",
      tags: ["Technology & Software", "E-commerce & Retail", "Manufacturing"],
      extraTagCount: 13,
      fundingMin: 10000,
      fundingMax: 75000,
      processingTime: "1-2 weeks",
      successRate: 52,
      logoColor: "#5B4FE8",
    };
  },
  fetchAnalysis: async () => {
    await delay(500);
    return {
      score: 95,
      level: "Excellent",
      summary:
        "Outstanding match! Your E-commerce & Retail business is perfectly aligned with this grant.",
      strengths: [
        "Industry aligns with grant requirements",
        "Business stage matches target criteria",
        "Years of operation meet eligibility",
      ],
    };
  },
};

/* ── Map a match result from GET /api/match/:id into the card shape ── */
function mapMatchToGrant(match) {
  return {
    id: match.id ?? match.grant_id ?? "api-result",
    name: match.title ?? match.name ?? "Funding Opportunity",
    provider: match.organization ?? match.provider ?? "",
    tags: match.tags ?? [],
    extraTagCount: 0,
    fundingMin: match.fundingMin ?? match.funding_min ?? 0,
    fundingMax: match.fundingMax ?? match.funding_max ?? 0,
    processingTime: match.processingTime ?? match.processing_time ?? "—",
    successRate: match.score ?? match.match_score ?? null,
    logoColor: "#155DFC",
  };
}

function mapMatchToAnalysis(match) {
  return {
    score: match.score ?? match.match_score ?? null,
    level: match.matchQuality ?? match.match_quality ?? match.level ?? "Good",
    summary: match.aiAnalysis ?? match.ai_analysis ?? match.summary ?? "",
    strengths: match.strengths ?? [],
  };
}

export default function Accelerator() {
  const navigate = useNavigate();

  const [grant, setGrant] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        /* Step 1 — POST http://localhost:5000/api/match/3/run  (trigger matching) */
        const runRes = await fetch(`${BASE_URL}/match/${BUSINESS_ID}/run`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!runRes.ok) throw new Error(`Run failed: ${runRes.status}`);

        /* Step 2 — GET http://localhost:5000/api/match/3  (retrieve results) */
        const resultsRes = await fetch(`${BASE_URL}/match/${BUSINESS_ID}`);
        if (!resultsRes.ok) throw new Error(`Results failed: ${resultsRes.status}`);

        const data = await resultsRes.json();

        /* The API may return an array or an object with a matches/results key */
        const list = Array.isArray(data)
          ? data
          : data.matches ?? data.results ?? data.data ?? [];

        const best = list[0];
        if (best) {
          setGrant(mapMatchToGrant(best));
          setLoading(false);
          setTimeout(() => setRevealed(true), 100);
          setAnalysis(mapMatchToAnalysis(best));
          setAiLoading(false);
          return;
        }
        throw new Error("No matches returned");
      } catch (err) {
        /* API unavailable — fall back to mock data */
        console.warn("Live API unavailable, using mock data:", err.message);
        const g = await MOCK_API.fetchGrant();
        setGrant(g);
        setLoading(false);
        setTimeout(() => setRevealed(true), 100);
        const ai = await MOCK_API.fetchAnalysis();
        setAnalysis(ai);
        setAiLoading(false);
      }
    })();
  }, []);

  const handleApply = () => {
    console.log("Apply clicked for grant:", grant?.id);
  };

  return (
    <div className="page" id="accelerator">

      {/* "Back to Dashboard" navigates to the grant matches page */}
      <GrantHeader onBack={() => navigate("/grant-matches")} />

      <GrantMatchCard
        grant={grant}
        analysis={analysis}
        loading={loading}
        aiLoading={aiLoading}
        revealed={revealed}
        onApply={handleApply}
      />

      <div className={`strengthsCard ${revealed ? "revealed" : ""}`}>
        <div className="strengthsHeader">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <circle cx="9" cy="9" r="8" stroke="#00C07F" strokeWidth="1.8" />
            <path
              d="M5.5 9l2.5 2.5 4.5-4.5"
              stroke="#00C07F"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="strengthsTitle">Your Strengths</h2>
        </div>

        {aiLoading ? (
          [200, 170, 210].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: w, height: 16, marginBottom: 14 }}
            />
          ))
        ) : (
          <ul className="strengthsList">
            {analysis?.strengths?.map((s, i) => (
              <li
                key={i}
                className="strengthItem"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  style={{ marginRight: 10, flexShrink: 0 }}
                >
                  <path
                    d="M3 7.5l3 3 6-6"
                    stroke="#00C07F"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
<GrantDetails/>

    </div>
  );
}
//   return (
//     <div className="page" id="accelerator">
//       <div className="blob1" />
//       <div className="blob2" />

//       <GrantMatchCard
//         grant={grant}
//         analysis={analysis}
//         loading={loading}
//         aiLoading={aiLoading}
//         revealed={revealed}
//         onApply={handleApply}
//       />

//       <div className={`strengthsCard ${revealed ? "revealed" : ""}`}>
//         <div className="strengthsHeader">
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//             fill="none"
//             style={{ marginRight: 8 }}
//           >
//             <circle cx="9" cy="9" r="8" stroke="#00C07F" strokeWidth="1.8" />
//             <path
//               d="M5.5 9l2.5 2.5 4.5-4.5"
//               stroke="#00C07F"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//             />
//           </svg>
//           <h2 className="strengthsTitle">Your Strengths</h2>
//         </div>

//         {aiLoading ? (
//           [200, 170, 210].map((w, i) => (
//             <div
//               key={i}
//               className="skeleton"
//               style={{ width: w, height: 16, marginBottom: 14 }}
//             />
//           ))
//         ) : (
//           <ul className="strengthsList">
//             {analysis?.strengths?.map((s, i) => (
//               <li
//                 key={i}
//                 className="strengthItem"
//                 style={{ animationDelay: `${i * 0.12}s` }}
//               >
//                 <svg
//                   width="15"
//                   height="15"
//                   viewBox="0 0 15 15"
//                   fill="none"
//                   style={{ marginRight: 10, flexShrink: 0 }}
//                 >
//                   <path
//                     d="M3 7.5l3 3 6-6"
//                     stroke="#00C07F"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
