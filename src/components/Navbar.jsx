import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../LanguageContext";

function Navbar() {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="navbar">
      <h2>BlockVerify</h2>

      <div className="nav-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/product">{t("product")}</Link>
        <Link to="/security">{t("security")}</Link>
        <Link to="/developers">{t("developers")}</Link>
        <Link to="/login">{t("login")}</Link>

        <select
          className="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>

        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;