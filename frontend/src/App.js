import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import LoginSignupForm from './components/LoginSignupForm';
import Dashboard from './pages/Dashboard'; 
import CreateCard from './pages/CreateCard';  
import TrangChu from './pages/TrangChu';  
import FeaturedTemplates from './pages/FeaturedTemplates';            
import Donate from './pages/Donate';      
import LienHe from './pages/LienHe'; 
import Snowfall from './snowfall/Snowfall';
import ManageCards from './pages/ManageCards'
import AdditionalInfo from './components/AdditionalInfo'; 
import './styles.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const [user, setUser] = useState(null);

  const openLoginForm = () => {
    setFormType('login');
    setIsModalOpen(true);
  };

  const openSignupForm = () => {
    setFormType('signup');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    alert('Bạn đã đăng xuất');
  };

  return (
    <Router>
      <div className="App">
        <Snowfall /> {/* Thêm hiệu ứng tuyết rơi */}
        <Header 
          user={user} 
          openLoginForm={openLoginForm} 
          openSignupForm={openSignupForm} 
          handleLogout={handleLogout}
          setUser={setUser}
        />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/trangChu" element={<TrangChu />} />
          <Route path="/featuredTemplates" element={<FeaturedTemplates />} />
          <Route path="/Donate" element={<Donate />} />
          <Route path="/LienHe" element={<LienHe />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/create-card/:id" element={<CreateCard />} />
          <Route path="/manage-cards" element={<ManageCards  />} />
          
        </Routes>
        
        {isModalOpen && (
          <LoginSignupForm type={formType} closeModal={closeModal} setUser={setUser} />
        )}
        <Features />
        <AdditionalInfo/>
      </div>
    </Router>
  );
}

export default App;
