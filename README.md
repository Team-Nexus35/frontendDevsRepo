# ImaraFund — Frontend

A React application that helps small businesses discover and apply for grants, loans, and accelerator programs using AI-powered matching.

---

## Tech Stack

- **React 18** with React Router v6
- **Vite** (build tool)
- **CSS Modules** + plain CSS (BEM-style class naming)
- **Sora** Google Font

---

## User Flow

```
Landing Page (/)
    → Register / Login
    → Onboarding Form Step 1 (/getStarted1)
    → Onboarding Form Step 2 (/getStarted2)
    → Onboarding Form Step 3 (/getStarted3)  ← submits full profile to API
    → Grant Match Page (/grant-matches)       ← lists all AI-ranked matches
    → Accelerator Detail Page (/accelerator)  ← detailed view of best match
```

---

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LandingPage` | Marketing landing page |
| `/register` | `RegisterPage` | User registration |
| `/login` | `LoginPage` | User login |
| `/getStarted1` | `FormOne` | Onboarding step 1 |
| `/getStarted2` | `FormTwo` | Onboarding step 2 |
| `/getStarted3` | `FormThree` | Onboarding step 3 — Business Capability & Impact |
| `/grant-matches` | `GrantMatchPage` | AI-matched funding opportunities list |
| `/accelerator` | `Accelerator` | Best match detail view |

---

## Key Features

### 1. Onboarding — Step 3: Business Capability & Impact
**File:** [`src/pages/questionPages/questionPage3/questionPage3.jsx`](src/pages/questionPages/questionPage3/questionPage3.jsx)

The final onboarding step collects financial and capability data:

| Field | Type | Description |
|-------|------|-------------|
| `funding_need_usd` | Number | How much funding the business needs |
| `annual_revenue_usd` | Number | Annual revenue in USD |
| `innovation_level` | Select | Low / Medium / High / Very High |
| `has_prototype` | Select | Yes / No |
| `targets_underserved` | Select | Yes / No |

- Validates all fields before submission
- POSTs the full business profile to `POST /api/readiness`
- On success, navigates to `/grant-matches`
- Displays inline server errors if the API call fails

---

### 2. Grant Match Page
**File:** [`src/pages/grantMatch/grantMatch.jsx`](src/pages/grantMatch/grantMatch.jsx)
**Styles:** [`src/pages/grantMatch/GrantMatchPage.css`](src/pages/grantMatch/GrantMatchPage.css)

The main results page showing all AI-ranked funding opportunities.

**Sections:**
- **Hero banner** — gradient header with business profile summary and a "Run Matching" button
- **Stats grid** — 4 cards: Total Matches, Excellent Matches, Eligible, Grants Available
- **Filter bar** — search by name/org, filter by type (Grant/Loan) and match quality
- **Match cards list** — ranked by AI compatibility score

**Run Matching button behaviour:**
1. Calls `POST /api/match/:businessId/run` to trigger the matching engine
2. Calls `GET /api/match/:businessId` to retrieve results
3. Falls back to built-in mock data if the API is unavailable
4. Navigates to `/accelerator` after matching completes

---

### 3. Components

#### `FundingMatchCard`
**File:** [`src/components/matchPage/FundingMatchCard.jsx`](src/components/matchPage/FundingMatchCard.jsx)
**Styles:** [`src/components/matchPage/FundingMatchCard.css`](src/components/matchPage/FundingMatchCard.css)

Displays a single funding opportunity. Each card includes:

| Section | Content |
|---------|---------|
| Score circle | Circular % match badge |
| Type badge | Grant or Loan pill |
| Title row | Name, organization, Eligible badge, quality badge |
| AI Analysis | AI-generated compatibility summary |
| Funding metadata | Amount range, processing time, interest rate (loans only) |
| Strengths | Green checkmark list |
| Weaknesses | Red X list |
| Areas to Improve | Orange arrow list (shown when present) |
| Actions | "View Full Details" + "Save for Later" buttons |

Match quality badge colours: `Excellent` → green · `Good` → blue · `Fair/Poor` → grey

#### `StatCard`
**File:** [`src/components/matchPage/StatCard.jsx`](src/components/matchPage/StatCard.jsx)
**Styles:** [`src/components/matchPage/StatCard.css`](src/components/matchPage/StatCard.css)

Reusable summary card. Props: `value`, `label`, `icon`, `iconBg`.

#### `FilterBar`
**File:** [`src/components/matchPage/FilterBar.jsx`](src/components/matchPage/FilterBar.jsx)

Search + dropdown filter bar used on the Grant Match page. Accepts business profile tags, a search string, type filter, and match quality filter.

---

### 4. Accelerator Detail Page
**File:** [`src/pages/MatchPage/Accelerator.jsx`](src/pages/MatchPage/Accelerator.jsx)

Detailed view for the best-matched funding opportunity.

- On mount, triggers matching (`POST /api/match/3/run`) then fetches results (`GET /api/match/3`)
- Picks the top result and maps it to the card display shape
- Shows loading skeletons while data loads
- Renders `GrantMatchCard` + "Your Strengths" section + `GrantDetails`
- Falls back to mock data if the API is unavailable
- Header "Back" button navigates to `/grant-matches`

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/readiness` | Submit full business profile from onboarding |
| `POST` | `/api/match/:id/run` | Trigger the AI matching engine |
| `GET` | `/api/match/:id` | Retrieve ranked funding matches |

Base URL: `http://localhost:5000`

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

> Make sure the backend API is running on `http://localhost:5000` before using the matching features. All pages fall back to mock data gracefully if the API is unavailable.

---

## File Structure

```
src/
├── App.jsx                          # Route definitions
├── pages/
│   ├── landingPage/
│   ├── register/
│   ├── login/
│   ├── grantMatch/
│   │   ├── grantMatch.jsx           # Grant Match Page
│   │   └── GrantMatchPage.css
│   ├── MatchPage/
│   │   ├── Accelerator.jsx          # Accelerator Detail Page
│   │   └── Accelerator.css
│   └── questionPages/
│       ├── questionPage1/
│       ├── questionPage2/
│       └── questionPage3/
│           ├── questionPage3.jsx    # Onboarding Step 3
│           └── questionPage3.module.css
└── components/
    ├── form/                        # Shared form context + fields
    ├── card/                        # GrantMatchCard
    ├── GrantHeader.jsx              # Top navigation bar
    ├── GrandDetails.jsx             # Grant details section
    └── matchPage/
        ├── FundingMatchCard.jsx     # Funding opportunity card
        ├── FundingMatchCard.css
        ├── StatCard.jsx             # Stats display card
        ├── StatCard.css
        ├── FilterBar.jsx            # Search + filter bar
        └── FilterBar.css
```
