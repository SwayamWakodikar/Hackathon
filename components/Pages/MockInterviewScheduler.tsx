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

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("09:00 AM");

  const handleConfirmSchedule = () => {
    // Logic to save the schedule would go here
    setIsTimeModalOpen(false);
    setSelectedTime("09:00 AM");
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

      <div className="flex-1 flex flex-col p-8 min-h-screen relative">
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
                                    onClick={() => setIsTimeModalOpen(true)}
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

       {/* Time Selection Modal */}
       {isTimeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-blue-500/30 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsTimeModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">Select Time Slot</h3>
            <p className="text-blue-400 mb-6">
              {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="flex gap-4 justify-center mb-8">
              {/* Hour Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Hour</label>
                <select 
                  value={selectedTime?.split(':')[0] || "09"}
                  onChange={(e) => {
                    const currentParts = selectedTime ? selectedTime.split(/[: ]/) : ["09", "00", "AM"];
                    setSelectedTime(`${e.target.value}:${currentParts[1]} ${currentParts[2]}`);
                  }}
                  className="bg-blue-950/30 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors w-24 text-center appearance-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                    <option key={h} value={h.toString().padStart(2, '0')} className="bg-gray-900">
                      {h.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-2xl text-gray-500 self-end mb-3">:</span>

              {/* Minute Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Minute</label>
                <select 
                  value={selectedTime?.split(/[: ]/)[1] || "00"}
                  onChange={(e) => {
                    const currentParts = selectedTime ? selectedTime.split(/[: ]/) : ["09", "00", "AM"];
                    setSelectedTime(`${currentParts[0]}:${e.target.value} ${currentParts[2]}`);
                  }}
                  className="bg-blue-950/30 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors w-24 text-center appearance-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                    <option key={m} value={m.toString().padStart(2, '0')} className="bg-gray-900">
                      {m.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Period Selection */}
              <div className="flex flex-col gap-2">
                 <label className="text-sm text-gray-400">AM/PM</label>
                 <select 
                   value={selectedTime?.split(' ')[1] || "AM"}
                   onChange={(e) => {
                      const currentParts = selectedTime ? selectedTime.split(/[: ]/) : ["09", "00", "AM"];
                      setSelectedTime(`${currentParts[0]}:${currentParts[1]} ${e.target.value}`);
                   }}
                   className="bg-blue-950/30 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors w-24 text-center appearance-none"
                 >
                    <option value="AM" className="bg-gray-900">AM</option>
                    <option value="PM" className="bg-gray-900">PM</option>
                 </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsTimeModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                disabled={!selectedTime}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MockInterviewScheduler;
