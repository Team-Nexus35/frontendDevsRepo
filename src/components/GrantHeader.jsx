import "./GrantHeader.css";
import LogoSvg from "./../assets/icons/logo.svg?react";
import ArrowBackSvg from "./../assets/icons/ArrowBack.svg?react";

export default function GrantHeader({ onBack }) {

  const handleBack = onBack ?? (() => window.history.back());

  return (
    <header className="gh-header">

      <button className="gh-back" onClick={handleBack}>
        <ArrowBackSvg/>
        Back to Dashboard
      </button>

      <div className="gh-logo">
        <LogoSvg />
      </div>

    </header>
  );
}
