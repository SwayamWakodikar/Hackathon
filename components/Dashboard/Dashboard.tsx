"use client"

import ResumeTab from './ResumeBar'

const Dashboard = () => {
  return (
    <div className='bg-white dark:bg-black'>
        
        <ResumeTab
  title="AI Generated Resume"
  subtitle="AI Generated Resume"
  onClick={() => {
    // Handle click event here  
    console.log("AI Generated Resume clicked");
  }}
/>

        
    </div>
  )
}

export default Dashboard