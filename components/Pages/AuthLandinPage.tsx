import React from 'react'
import AuthNavbar from '../AuthNavbar'; // Importing the new Authenticated Navbar
import HeroSection from '../hero'; // Assuming these paths remain valid relative to this file
import ResumeEnhancerSection from '../resumesection';
import AIBasedTrainerSection from '../aibasedtrainersection';
import Particles from '../Particles';
import Reveal from '../Anime/Reveal';
import HeroSectionOne from '../hero-section-demo-1';
import LightRays from '../LightRays';
import AuthHero from '../AuthHero';
import AuthResume from '../AuthResume';
import AuthTrainerSection from '../ui/AuthTrainer';
const AuthLandingPage = () => {
  return (
    // Outer div for the entire application wrapper
    <>
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
    <LightRays
    raysOrigin="top-center"
    raysColor="#ffffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={0.60}
    followMouse={true}
    mouseInfluence={0.0}
    noiseAmount={0.1}
    distortion={0}
    className="custom-rays"
  />
  
</div>
    <div className="min-h-screen mt-24"> 
      <AuthNavbar />
      
      <main>
        <Reveal>
          <AuthHero/>
        </Reveal>
        <Reveal><AuthResume/></Reveal>
        <Reveal><AuthTrainerSection /></Reveal>
        
        
      </main>
    </div>
    </>
    
  );
}

export default AuthLandingPage