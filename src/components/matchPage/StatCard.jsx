import './StatCard.css';

export default function StatCard({ icon, value, label, iconBg }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon-box" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className="stat-card__info">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </div>
    </div>
  );
}
