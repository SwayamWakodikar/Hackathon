"use client"
import React from 'react'
import { IconDeviceLaptop } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Particles from "@/components/Particles";

const InterviewPage = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.01}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="bg-transparent flex flex-1 flex-col items-center justify-center h-full p-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-md"
        >
          <div className="h-24 w-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
            <IconDeviceLaptop className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            AI Interview
          </h1>
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
            </span>
            Coming Soon
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            We're building an intelligent interview simulator to help you ace your next technical round. Stay tuned!
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default InterviewPage