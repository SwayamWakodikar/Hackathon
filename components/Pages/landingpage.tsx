import React from 'react'
import NavBar from '../navbar';
import HeroSection from '../hero';
import ResumeEnhancerSection from '../resumesection';
import AIBasedTrainerSection from '../aibasedtrainersection';
const Landingpage = () => {
  return (
    // Outer div for the entire application wrapper
    <div className="min-h-screen"> 
      <NavBar />
      
      <main>
        <HeroSection />
        <ResumeEnhancerSection />
        <AIBasedTrainerSection />
      </main>
    </div>
  );
}

export default Landingpage