"use client";

import React, { useState } from "react";
import { 
  IconChevronLeft, 
  IconChevronRight, 
  IconCalendarEvent, 
  IconClock, 
  IconVideo,
  IconUser
} from "@tabler/icons-react";
import Particles from "@/components/Particles";

const MockInterviewScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Dummy data for upcoming meetings
  const upcomingMeetings = [
    {
      id: 1,
      title: "Mock Interview: System Design",
      date: "2024-03-15", // dynamic in real app
      time: "10:00 AM",
      interviewer: "Sarah Jenkins",
      type: "Technical"
    },
    {
      id: 2,
      title: "Behavioral Round Practice",
      date: "2024-03-18",
      time: "2:30 PM",
      interviewer: "Michael Chen",
      type: "Behavioral"
    },
    {
      id: 3,
      title: "Frontend Architecture",
      date: "2024-03-22",
      time: "11:00 AM",
      interviewer: "Alex Johnson",
      type: "Technical"
    }
  ];

  // Calendar Logic
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of current month
    for (let i = 1; i <= totalDays; i++) {
        const isSelected = selectedDate && 
            selectedDate.getDate() === i && 
            selectedDate.getMonth() === currentDate.getMonth() && 
            selectedDate.getFullYear() === currentDate.getFullYear();
        
        const isToday = new Date().getDate() === i &&
            new Date().getMonth() === currentDate.getMonth() &&
            new Date().getFullYear() === currentDate.getFullYear();

        days.push(
            <button
                key={i}
                onClick={() => handleDateClick(i)}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${isSelected 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-110" 
                        : isToday 
                            ? "border border-blue-500 text-blue-400" 
                            : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
                    }
                `}
            >
                {i}
            </button>
        );
    }

    return days;
  };

  return (
    <>
      {/* Background Particles - Matching InterviewDashboard */}
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

      <div className="flex-1 flex flex-col p-8 min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
            
            {/* Header */}
            <div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    Schedule <span className="text-blue-500 italic">Interviews</span>
                </h1>
                <p className="text-gray-400 text-lg">Manage your mock interviews and practice sessions.</p>
            </div>


            <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Left Column: Upcoming Meetings */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                        <IconCalendarEvent className="text-blue-500" /> Upcoming Meetings
                    </h2>
                    
                    <div className="space-y-4">
                        {upcomingMeetings.map((meeting) => (
                            <div 
                                key={meeting.id}
                                className="group bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-blue-900/30 transition-all duration-300 shadow-lg hover:shadow-blue-900/20"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{meeting.title}</h3>
                                        <div className="flex items-center gap-2 text-blue-400 text-sm mt-1">
                                            <span className="bg-blue-500/20 px-2 py-0.5 rounded text-xs font-semibold uppercase">{meeting.type}</span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-500/10 p-2 rounded-lg">
                                        <IconVideo className="text-blue-400 w-6 h-6" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <IconClock className="w-4 h-4 text-blue-500" />
                                        <span>{meeting.date} • {meeting.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconUser className="w-4 h-4 text-blue-500" />
                                        <span>{meeting.interviewer}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-blue-500/10 flex justify-end">
                                     <button className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 text-sm font-medium hover:bg-blue-600 hover:text-white transition-all">
                                        View Details
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Custom Calendar Scheduler */}
                <div className="flex-1">
                     <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                        <IconCalendarEvent className="text-blue-500" /> Schedule New
                    </h2>

                    <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-xl">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-8">
                             <h3 className="text-2xl font-bold text-white">
                                {monthNames[currentDate.getMonth()]} <span className="text-blue-500">{currentDate.getFullYear()}</span>
                             </h3>
                             <div className="flex gap-2">
                                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                    <IconChevronLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                    <IconChevronRight className="w-6 h-6" />
                                </button>
                             </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-y-4 justify-items-center mb-4">
                            {daysOfWeek.map(day => (
                                <span key={day} className="text-blue-400 font-semibold text-sm uppercase">{day}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 justify-items-center">
                            {renderCalendarDays()}
                        </div>
                        
                        {/* Selected Date Action */}
                        <div className="mt-8 pt-6 border-t border-blue-500/20">
                            <div className="flex flex-col gap-4">
                                <p className="text-gray-300 text-center">
                                    {selectedDate 
                                        ? `Selected: ${selectedDate.toDateString()}` 
                                        : "Select a date to schedule"}
                                </p>
                                <button 
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!selectedDate}
                                >
                                    Proceed to Time Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default MockInterviewScheduler;
