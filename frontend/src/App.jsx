// src/App.jsx
// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Send, Trash2, Bot, Mic, MicOff, Download, Upload } from "lucide-react"; 
// Components & Pages
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Complaints from "./pages/Complaints";
import Map from "./pages/Map";
import Modules from "./pages/Modules";
import VideoPage from "./pages/VideoPage";
import ContentPage from "./pages/ContentPage";
import QuizPage from "./pages/QuizPage";
import ActivityPage from "./pages/ActivityPage";
import PledgePage from "./pages/PledgePage";
import FinalQuizPage from "./pages/FinalQuizPage";
import CertificationPage from "./pages/CertificationPage";
import BuySell from "./pages/BuySell";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ParticipantForm from "./components/ParticipantForm";

import { ProgressProvider } from "./context/ProgressContent";
import AdminDashboard from "./components/AdminDashboard";
import MunicipalDashboard from "./components/MunicipalDashboard";
import Chatbot from "./components/Chatbot";
import RewardsSection from "./pages/Rewards-section";
import Communities from "./pages/Communities";
import CommunityPage from "./pages/CommunityPage";
import UserCommunityPage from "./pages/UserCommunityPage";
import GreenChampionForm from "./components/GreenChampionForm";

export default function App() {
  // Profile Page (Protected)
  function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch("/api/auth/profile")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }, []);

    const logout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    };

    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        {user ? (
          <div className="p-6 bg-white shadow rounded text-center space-y-3">
            <h1 className="text-xl font-bold">Welcome {user.name}</h1>
            <p>{user.email}</p>
            <button
              onClick={logout}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

  return (
    <Router>
      <ProgressProvider>
        <Sidebar />
        <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            {/* <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> */}

            {/* Public Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/buyandsell" element={<BuySell />} />
            <Route path="/participantsform" element={<ParticipantForm />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/map" element={<Map />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/video/:moduleId" element={<VideoPage />} />
            <Route path="/content/:moduleId" element={<ContentPage />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/activity/:moduleId" element={<ActivityPage />} />
            <Route path="/pledge/:moduleId" element={<PledgePage />} />
            <Route path="/quiz/final" element={<FinalQuizPage />} />
            <Route path="/certificate" element={<CertificationPage />} />
            <Route path="/rewards" element={<RewardsSection />} />

            {/* Committee Pages */}
            <Route path="/green-champions" element={<GreenChampionForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/userCommunity" element={<UserCommunityPage />} />
            <Route path="/profile" element={<Account />} />

            <Route
              path="/municipal"
              element={
                <MunicipalDashboard
                  adminToken="secure-admin-token"
                  city="Ghaziabad"
                />
              }
            />

            {/* 404 */}
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

        <Chatbot />
      </ProgressProvider>
    </Router>
  );
}
