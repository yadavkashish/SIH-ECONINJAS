// src/App.jsx
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Account from './pages/Account';
import BuyAndSell from './pages/Buy&Sell';
import Communities from './pages/Communities';
import Complaints from './pages/Complaints';
import Home from './pages/Home';
import Map from './pages/Map';









export default function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/buyandsell" element={<BuyAndSell />} />
        <Route path="/communities" element={<Communities/>} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/map" element={<Map />} />
        

        {/* <Route path="/redeem" element={<Redeem />} /> */}
      </Routes>
    </Router>
  );
}
