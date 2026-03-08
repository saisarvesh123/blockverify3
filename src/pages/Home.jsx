import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

function Home() {

  const { language } = useContext(LanguageContext);

  const content = {

    en: {
      title1: "Secure & Transparent",
      title2: "Blockchain Record Verification",
      desc: "A next-generation digital record platform ensuring immutability, security and complete trust.",
      btnUser: "User",
      btnOrg: "Organization",
      f1: "Immutable Records",
      f1d: "Records cannot be altered once stored.",
      f2: "Advanced Security",
      f2d: "SHA-256 hashing and blockchain encryption.",
      f3: "Instant Verification",
      f3d: "Verify documents using unique record ID."
    },

    hi: {
      title1: "सुरक्षित और पारदर्शी",
      title2: "ब्लॉकचेन रिकॉर्ड सत्यापन",
      desc: "एक आधुनिक डिजिटल प्लेटफ़ॉर्म जो डेटा की सुरक्षा और विश्वसनीयता सुनिश्चित करता है।",
      btnUser: "उपयोगकर्ता",
      btnOrg: "संगठन",
      f1: "अपरिवर्तनीय रिकॉर्ड",
      f1d: "एक बार स्टोर होने के बाद रिकॉर्ड बदले नहीं जा सकते।",
      f2: "उन्नत सुरक्षा",
      f2d: "SHA-256 हैशिंग और ब्लॉकचेन एन्क्रिप्शन।",
      f3: "तुरंत सत्यापन",
      f3d: "यूनिक रिकॉर्ड आईडी से दस्तावेज़ सत्यापित करें।"
    },

    es: {
      title1: "Seguro y Transparente",
      title2: "Verificación de Registros Blockchain",
      desc: "Una plataforma digital moderna que garantiza inmutabilidad y seguridad.",
      btnUser: "Usuario",
      btnOrg: "Organización",
      f1: "Registros Inmutables",
      f1d: "Los registros no pueden modificarse una vez almacenados.",
      f2: "Seguridad Avanzada",
      f2d: "Hashing SHA-256 y encriptación blockchain.",
      f3: "Verificación Instantánea",
      f3d: "Verifica documentos con ID único."
    },

    fr: {
      title1: "Sécurisé et Transparent",
      title2: "Vérification Blockchain",
      desc: "Une plateforme numérique moderne garantissant sécurité et confiance.",
      btnUser: "Utilisateur",
      btnOrg: "Organisation",
      f1: "Enregistrements Immuables",
      f1d: "Les données ne peuvent pas être modifiées après stockage.",
      f2: "Sécurité Avancée",
      f2d: "Hachage SHA-256 et chiffrement blockchain.",
      f3: "Vérification Instantanée",
      f3d: "Vérifiez les documents avec ID unique."
    },

    de: {
      title1: "Sicher und Transparent",
      title2: "Blockchain-Datenprüfung",
      desc: "Eine moderne digitale Plattform für Sicherheit und Vertrauen.",
      btnUser: "Benutzer",
      btnOrg: "Organisation",
      f1: "Unveränderliche Datensätze",
      f1d: "Datensätze können nach Speicherung nicht geändert werden.",
      f2: "Erweiterte Sicherheit",
      f2d: "SHA-256 Hashing und Blockchain-Verschlüsselung.",
      f3: "Sofortige Verifizierung",
      f3d: "Dokumente mit eindeutiger ID prüfen."
    }

  };

  const t = content[language] || content.en;

  return (
    <>
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      >
        <source src="/videos.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: -1
        }}
      ></div>

      <div className="hero">
        <div className="hero-content">
          <h1>
            {t.title1} <br />
            {t.title2}
          </h1>

          <p>{t.desc}</p>

          {/* USER + ORGANIZATION BUTTONS */}
          <div style={{ display: "flex", gap: "20px", marginTop: "25px" }}>

            {/* USER DASHBOARD */}
            <Link to="/dashboard" className="primary-btn">
              {t.btnUser}
            </Link>

            {/* ORGANIZATION DASHBOARD */}
            <Link to="/organization-dashboard" className="primary-btn">
              {t.btnOrg}
            </Link>

          </div>

        </div>
      </div>

      <div className="features button-features">
        <div className="feature-grid">

          <div className="feature-btn">
            <h3>{t.f1}</h3>
            <p>{t.f1d}</p>
          </div>

          <div className="feature-btn">
            <h3>{t.f2}</h3>
            <p>{t.f2d}</p>
          </div>

          <div className="feature-btn">
            <h3>{t.f3}</h3>
            <p>{t.f3d}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;