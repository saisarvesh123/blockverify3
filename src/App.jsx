import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Intro from "./pages/intro";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Security from "./pages/Security";
import Developers from "./pages/Developers";
import Login from "./pages/Login";

import AddRecord from "./pages/AddRecord";
import VerifyRecord from "./pages/VerifyRecord";     
import VerifyPage from "./pages/VerifyPage";         
import Documentverify from "./pages/Documentverify"; 

// ✅ ORGANIZATION DASHBOARD IMPORT
import OrganizationDashboard from "./pages/OrganizationDashboard";

function Layout() {

  const location = useLocation();

  return (
    <>
      {/* Navbar hide on Intro */}
      {location.pathname !== "/intro" && <Navbar />}

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* INTRO */}
        <Route path="/intro" element={<Intro />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* OLD VERIFY PAGE */}
        <Route path="/verify" element={<VerifyRecord />} />

        {/* NEW VERIFY SYSTEM */}
        <Route path="/verify-document" element={<VerifyPage />} />
        <Route path="/verify-document/:id" element={<Documentverify />} />

        {/* VERIFY RECORD */}
        <Route path="/verify-record" element={<VerifyRecord />} />

        {/* ADD RECORD */}
        <Route path="/add" element={<AddRecord />} />

        {/* OTHER PAGES */}
        <Route path="/product" element={<Product />} />
        <Route path="/security" element={<Security />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ ORGANIZATION DASHBOARD */}
        <Route
          path="/organization-dashboard"
          element={<OrganizationDashboard />}
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;