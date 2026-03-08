import { useState, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { LanguageContext } from "../LanguageContext";

const supabase = createClient(
  "https://mbvypecubjqdxbeegjqj.supabase.co",
"sb_publishable_MvQT0_Vr3KVc4LbNqTeOrA_FkYvp5fN");

function Login() {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      title: "BlockVerify Login",
      create: "Create Account",
      email: "Email",
      password: "Password",
      login: "Login",
      signup: "Sign Up",
      newUser: "New user?",
      already: "Already have account?",
      loginHere: "Login here",
      signupHere: "Sign up here",
      success: "Login Successful ✔",
      signupDone: "Signup successful. Now login."
    }
  };

  const t = content[language] || content.en;

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAuth = async () => {
    if (loading) return; // prevent spam clicks
    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }
        alert(t.signupDone);
        setIsSignup(false);
        setLoading(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }

        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          setLoggedIn(true);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loggedIn) {
    return (
      <div style={dashboardStyle}>
        <h1>Welcome to BlockVerify 🚀</h1>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      {showPopup && <div style={popupStyle}>{t.success}</div>}

      <video autoPlay muted loop playsInline style={videoStyle}>
        <source src="/videos.mp4" type="video/mp4" />
      </video>

      <div style={overlayStyle}></div>

      <div style={cardStyle}>
        <h2 style={{ color: "white" }}>
          {isSignup ? t.create : t.title}
        </h2>

        <input
          type="email"
          placeholder={t.email}
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={t.password}
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleAuth} disabled={loading}>
          {loading ? "Please wait..." : isSignup ? t.signup : t.login}
        </button>

        <p style={{ color: "white", marginTop: "15px" }}>
          {isSignup ? t.already : t.newUser}{" "}
          <span
            style={{ color: "#a855f7", cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? t.loginHere : t.signupHere}
          </span>
        </p>
      </div>
    </div>
  );
}

/* STYLES */

const wrapperStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden"
};

const videoStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -2
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: -1
};

const cardStyle = {
  width: "400px",
  padding: "40px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 0 35px rgba(0,255,255,0.4)",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "12px 0",
  borderRadius: "12px",
  border: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,#00ffff,#00c3ff)",
  fontWeight: "bold",
  cursor: "pointer"
};

const popupStyle = {
  position: "fixed",
  top: "40px",
  background: "#22c55e",
  color: "white",
  padding: "14px 30px",
  borderRadius: "10px",
  fontWeight: "bold",
  zIndex: 1000
};

const dashboardStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a",
  color: "white"
};

export default Login;