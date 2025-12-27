import React from 'react'
import NavBar from '../navbar';
import HeroSection from '../hero';
import ResumeEnhancerSection from '../resumesection';
import AIBasedTrainerSection from '../aibasedtrainersection';
import Particles from '../Particles';
import Reveal from '../Anime/Reveal';
import HeroSectionOne from '../hero-section-demo-1';
import LightRays from '../LightRays';
const Landingpage = () => {
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
    <div className="min-h-screen"> 
      <NavBar />
      
      <main>
        <Reveal>
          <HeroSectionOne/>
          {/* // <HeroSection /> */}
        </Reveal>
        <Reveal><ResumeEnhancerSection /></Reveal>
        <Reveal><AIBasedTrainerSection /></Reveal>
        
        
      </main>
    </div>
    </>
    
  );
}


export default Landingpage

