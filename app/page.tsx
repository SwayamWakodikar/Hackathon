'use client';
import React from 'react';
import Landingpage from '../components/Pages/landingpage';

const App = () => { 
  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white">
      
      <main>
        <Landingpage/>
      </main>

      {/* VANGUARD FOOTER: Minimalist, Transparent, and Italicized */}
      <footer className="relative z-10 py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] tracking-[0.5em] text-blue-300 uppercase font-black italic">
              &copy; 2026 Vplace <span className="text-gray-500/40">//</span> All rights reserved.
            </p>
            <div className="flex gap-15">
              {[
              { 
                name: 'Swayam Wakodikar', 
                role: 'Frontend Developer', 
                contact: 'swayam.w06@gmail.com', 
                links: [
                { name: 'GitHub', url: 'https://github.com/SwayamWakodikar' },
                { name: 'Portfolio', url: 'https://swayamwakodikar.vercel.app' }
                ]
              },
              { 
                name: 'Krish Patel', 
                role: 'UI/UX Designer', 
                contact: 'krishpatel6529@gmail.com', 
                links: [
                { name: 'GitHub', url: 'https://github.com/Death-Desu' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/krish-patel-b69832318/' }
                ]
              },
              { 
                name: 'Aryan Vishwakarma', 
                role: 'Backend Developer', 
                contact: 'aryanvishwakarma275@gmail.com', 
                links: [
                { name: 'GitHub', url: 'https://github.com/Aryan-202' },
                { name: 'Portfolio', url: 'https://welcomearyan.vercel.app' }
                ]
              },
              { 
                name: 'Vedant Harane', 
                role: 'Database Administrator', 
                contact: 'vedantharanevvh@gmail.com', 
                links: [
                { name: 'GitHub', url: 'https://github.com/LearnerGamer' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vedant-harane-4b95a7315/' }
                ]
              },
              { 
                name: 'VPLACE Repository', 
                role: '', 
                contact: '', 
                links: [
                { name: 'GitHub Repo', url: 'https://github.com/SwayamWakodikar/Hackathon.git' }
                ]
              }
              ].map((member, index) => (
              <div key={index} className="text-[10px] text-zinc-500">
                <p className="font-bold uppercase text-blue-300">{member.name}</p>
                {member.role && <p className="italic text-blue-400">{member.role}</p>}
                {member.contact && <p className='text-blue-500'>Contact: {member.contact}</p>}
                <div className="flex gap-4 mt-1 text-blue-400">
                {member.links.map((link, linkIndex) => (
                  <a 
                  key={linkIndex} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tracking-[0.3em] uppercase font-bold hover:text-blue-500 transition-colors"
                  >
                  {link.name}
                  </a>
                ))}
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;