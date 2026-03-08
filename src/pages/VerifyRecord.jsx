import { useState } from "react";
import SHA256 from "crypto-js/sha256";
import { verifyHash } from "../blockchain";
import "./VerifyRecord.css";

export default function VerifyRecord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!file) return alert("Upload PDF first");

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {

      const hash = SHA256(e.target.result).toString();

      const result = await verifyHash(hash);

      setLoading(false);

      /* EXISTING ALERT */
      alert(result ? "✅ Authentic Document" : "❌ Fake Document");

      /* 🆕 ADD THIS PART → SAVE ALL DOCS (VERIFIED + FAKE) */

      const existingDocs =
        JSON.parse(localStorage.getItem("orgDocs")) || [];

      const newDoc = {
        name: file.name,

        /* ISO date for correct month graph */
        date: new Date().toISOString(),

        /* status dynamic */
        status: result ? "Verified" : "Fake"
      };

      existingDocs.unshift(newDoc);

      localStorage.setItem("orgDocs", JSON.stringify(existingDocs));

    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Document</h2>

        {/* Hidden Input */}
        <input
          type="file"
          accept="application/pdf"
          id="fileUpload"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />

        {/* Custom Choose Button */}
        <label htmlFor="fileUpload" className="choose-btn">
          {file ? file.name : "Choose PDF File"}
        </label>

        <button className="verify-btn" onClick={handleVerify}>
          {loading ? "Verifying..." : "Verify on Blockchain"}
        </button>
      </div>
    </div>
  );
}