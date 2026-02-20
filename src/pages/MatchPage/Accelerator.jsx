import { useState, useEffect } from "react";
import GrantMatchCard from "../../components/card/MatchCard";
import "./Accelerator.css";
import GrantDetails from "../../components/GrandDetails";
import GrantHeader from "../../components/GrantHeader";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// const API = {
//   // Fetch a single grant by ID
//   fetchGrant: async (id = "minority-biz-accelerator") => {
//     const res = await fetch(`${BASE_URL}/grants/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch grant");
//     return res.json();
//   },

//   // Fetch the business profile of the current user
//   fetchBusinessProfile: async () => {
//     const res = await fetch(`${BASE_URL}/business-profile`);
//     if (!res.ok) throw new Error("Failed to fetch business profile");
//     return res.json();
//   },

//   // Fetch match analysis for a specific grant
//   fetchMatchAnalysis: async ({ grantId }) => {
//     const res = await fetch(`${BASE_URL}/match-analysis`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ grantId }),
//     });

//     if (!res.ok) throw new Error("Failed to fetch match analysis");
//     return res.json();
//   },
// };

// export default function Accelerator() {
//   const [grant, setGrant] = useState(null);
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [aiLoading, setAiLoading] = useState(true);
//   const [revealed, setRevealed] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         // Fetch grant and business profile
//         const [g, b] = await Promise.all([
//           API.fetchGrant(),
//           API.fetchBusinessProfile(),
//         ]);

//         setGrant(g);
//         setLoading(false);
//         setTimeout(() => setRevealed(true), 100);

//         // Fetch AI match analysis (backend handles business profile)
//         const ai = await API.fetchMatchAnalysis({ grantId: g.id });
//         setAnalysis(ai);
//         setAiLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//         setAiLoading(false);
//       }
//     })();
//   }, []);

//   const handleApply = () => {
//     // Navigate to application page or open modal
//     console.log("Apply clicked for grant:", grant?.id);
//   };

// Mock API
const API = {
  // Fetch a single grant by ID (mocked)
  fetchGrant: async (id = "minority-biz-accelerator") => {
    await delay(400); // simulate network
    return {
      id,
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

  // Fetch the business profile (mocked)
  fetchBusinessProfile: async () => {
    await delay(300);
    return {
      name: "Your E-commerce & Retail Business",
      industry: "E-commerce & Retail",
      stage: "Early Stage",
      yearsOperating: 0,
      isMinority: true,
    };
  },

  // Fetch AI match analysis (mocked)
  fetchMatchAnalysis: async ({ grant, business }) => {
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

export default function Accelerator() {
  const [grant, setGrant] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
         const b = await API.fetchBusinessProfile();
        const g = await API.fetchGrant();

        setGrant(g);
        setLoading(false);
        setTimeout(() => setRevealed(true), 100);

        const ai = await API.fetchMatchAnalysis({ grant: g, business: b });
        setAnalysis(ai);
        setAiLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
        setAiLoading(false);
      }
    })();
  }, []);

  const handleApply = () => {
    console.log("Apply clicked for grant:", grant?.id);
  };

  return (
    <div className="page" id="accelerator">
      
      <GrantHeader/>

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
