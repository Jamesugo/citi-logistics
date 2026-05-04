import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CompanyProfile from './pages/CompanyProfile';
import DeliveryRequest from './pages/DeliveryRequest';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Pages that have their own full-screen layout (no shared footer)
const FULL_SCREEN_ROUTES = ['/login', '/signup'];

function AppContent() {
  const { pathname } = useLocation();
  const isFullScreen = FULL_SCREEN_ROUTES.includes(pathname);

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      {!isFullScreen && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/request" element={<DeliveryRequest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {!isFullScreen && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
