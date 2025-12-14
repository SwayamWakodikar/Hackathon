// src/App.tsx

'use client'; // <-- THIS FIXES THE ERROR
import { signIn } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Landingpage from './components/Pages/landingpage';

// --- Main Application Component ---
const App = () => { 
  return (
    // Outer div for the entire application wrapper
    <div className="min-h-screen">
      
      <main>
        <Landingpage/>
      </main>

      <footer className="py-8 bg-card text-center text-muted-foreground border-t border-border">
        <p>&copy; 2025 Vplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;