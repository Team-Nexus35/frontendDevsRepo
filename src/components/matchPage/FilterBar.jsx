import './FilterBar.css';

export default function FilterBar({
  tags,
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  matchFilter,
  onMatchChange,
}) {
  return (
    <div className="filter-bar">
      {/* Business profile tag pills */}
      <div className="filter-bar__tags">
        {tags.map((tag, index) => (
          <span key={index} className="filter-bar__tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Search input + filter dropdowns */}
      <div className="filter-bar__controls">
        <div className="filter-bar__search-wrapper">
          <svg
            className="filter-bar__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="filter-bar__search-input"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="filter-bar__select"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="grant">Grant</option>
          <option value="loan">Loan</option>
        </select>

        <select
          className="filter-bar__select"
          value={matchFilter}
          onChange={(e) => onMatchChange(e.target.value)}
        >
          <option value="">All Matches</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>
    </div>
  );
}
