import React from "react";
import EventCard from "../components/EventCard";

function EventFeed() {
  return (
    <div className="h-full overflow-auto">
      {/* .map of Events */}
      <EventCard image={true} />
      <EventCard image={false} />
    </div>
  );
}

export default EventFeed;
