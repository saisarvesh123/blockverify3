import { useState, useContext } from "react";
import SHA256 from "crypto-js/sha256";
import { registerHash } from "../blockchain";
import { LanguageContext } from "../LanguageContext";

export default function AddRecord() {

  const { t } = useContext(LanguageContext);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");

  const handleUpload = async () => {
     console.log("Upload button clicked");
    if (!file) return alert(t("uploadFirst"));

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const wordArray = SHA256(e.target.result).toString();

      setHash(wordArray);

      await registerHash(wordArray);

      setLoading(false);
      alert(t("success"));
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">

        <h1>{t("register")}</h1>

        <label className="file-label">
          {file ? file.name : t("choose")}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {hash && (
          <div className="hash-box">
            <p>{t("generatedHash")}</p>
            <small>{hash}</small>
          </div>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? t("processing") : t("upload")}
        </button>

      </div>
    </div>
  );
}