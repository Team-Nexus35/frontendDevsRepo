import "./GrantHeader.css";
import { useNavigate } from "react-router-dom";
import LogoSvg from "./../assets/icons/logo.svg?react";
import ArrowBackSvg from "./../assets/icons/ArrowBack.svg?react";

export default function GrantHeader({ onBack }) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate("/"));

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
