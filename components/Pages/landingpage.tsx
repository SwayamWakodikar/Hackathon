import React from 'react'
import NavBar from '../navbar';
import HeroSection from '../hero';
import ResumeEnhancerSection from '../resumesection';
import AIBasedTrainerSection from '../aibasedtrainersection';
import Particles from '../Particles';
import Reveal from '../Anime/Reveal';
import HeroSectionOne from '../hero-section-demo-1';
const Landingpage = () => {
  return (
    // Outer div for the entire application wrapper
    <>
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
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