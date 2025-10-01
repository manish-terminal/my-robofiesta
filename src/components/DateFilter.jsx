// src/components/ui/DateFilter.jsx

"use client";

import { useState, useMemo } from 'react';

export default function DateFilter({ events, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState('all');

  // Get unique, sorted dates from the events data
  const uniqueDates = useMemo(() => {
    if (!events) return [];
    const dates = [...new Set(events.map(event => event.date))];
    return dates.sort((a, b) => new Date(a) - new Date(b));
  }, [events]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Pass the selected date back to the parent page
  };

  // This is the CSS for the "shining" effect on the active button
  const activeButtonClass = "text-white border-2 border-[var(--neon)] bg-[var(--neon)]/10 shadow-[0_0_20px_var(--neon),inset_0_0_20px_rgba(0,255,240,0.3)]";

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        onClick={() => handleDateClick('all')}
        className={`neon-box px-6 py-2 transition-all duration-300 ${
          selectedDate === 'all' ? activeButtonClass : "text-white/80"
        }`}
      >
        All Events
      </button>
      {uniqueDates.map((date) => (
        <button
          key={date}
          onClick={() => handleDateClick(date)}
          className={`neon-box px-6 py-2 transition-all duration-300 ${
            selectedDate === date ? activeButtonClass : "text-white/80"
          }`}
        >
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })}
        </button>
      ))}
    </div>
  );
}
