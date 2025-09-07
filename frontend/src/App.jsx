// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import Account from "./pages/Account";
import Complaints from "./pages/Complaints";
import Map from "./pages/Map";
import Tracking from "./pages/Tracking"

import Modules from "./pages/Modules";
import VideoPage from "./pages/VideoPage";
import ContentPage from "./pages/ContentPage";
import QuizPage from "./pages/QuizPage";
import ActivityPage from "./pages/ActivityPage";
import PledgePage from "./pages/PledgePage";
import FinalQuizPage from "./pages/FinalQuizPage";
import CertificationPage from "./pages/CertificationPage";
import { ProgressProvider } from "./context/ProgressContent";
import BuySell from "./pages/BuySell";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import CommunityPage from "./pages/CommunityPage";
import Communities from "./pages/Communities";

export default function App() {
  return (
    <Router>
      <ProgressProvider >
      <Sidebar />
      <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/buyandsell" element={<BuySell />} />
          <Route path="/buyandsell" element={<BuySell />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community/:id" element={<CommunityPage />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/map" element={<Map />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />

          {/* Modules */}
          <Route path="/modules" element={<Modules />} />

          {/* Module Sections */}
          <Route path="/video/:moduleId" element={<VideoPage />} />
          <Route path="/content/:moduleId" element={<ContentPage />} />
          <Route path="/quiz/:moduleId" element={<QuizPage />} />
          <Route path="/activity/:moduleId" element={<ActivityPage />} />
          <Route path="/pledge/:moduleId" element={<PledgePage />} />
          <Route path="/quiz/final" element={<FinalQuizPage />} />
          <Route path="/certificate" element={<CertificationPage />} />
           <Route path="/tracking" element={<Tracking />} />
          {/* Optional: Catch all route */}
          <Route
            path="*"
            element={
              <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </main>
      </ProgressProvider>
    </Router>
  );
}
