import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { events } from "@/data/events";

export default function Schedule() {
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  // Sort dates chronologically
  const sortedDates = Object.keys(eventsByDate).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  // Sort events within each date by start time
  Object.keys(eventsByDate).forEach(date => {
    eventsByDate[date].sort((a, b) => {
      if (!a.time || !b.time) return 0;
      const timeA = a.time.split(' ')[0];
      const timeB = b.time.split(' ')[0];
      return timeA.localeCompare(timeB);
    });
  });

  return (
    <section id="schedule" className="section py-12 md:py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading className="mb-12 text-center">Schedule</SectionHeading>
        
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-4">
              <h3 className="font-orbitron text-2xl font-bold text-[var(--neon)] text-center mb-6">
                {date}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventsByDate[date].map((event, index) => {
                  const cardContent = (
                    <GlassCard key={`${event.eventName}-${index}`} className="p-4 cursor-pointer">
                      <div className="flex flex-col space-y-2">
                        <h4 className="font-orbitron text-lg font-semibold text-white text-center">
                          {event.eventName}
                        </h4>
                        
                        {event.time && (
                          <div className="flex items-center justify-center gap-2 text-[var(--neon)] text-sm font-medium">
                            <svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                              />
                            </svg>
                            <span>{event.time}</span>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  );

                  // Wrap with link if checkoutLink exists
                  return event.checkoutLink ? (
                    <a
                      key={`${event.eventName}-${index}`}
                      href={event.checkoutLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
