import React from "react";
import AddEvent from "./AddEvent";
import EventCard from "../components/EventCard";

function EventFeed() {
  return (
    <div>
      <AddEvent />
      {/* .map of Events */}
      <EventCard image={true} />
      <EventCard image={false} />
    </div>
  );
}

export default EventFeed;
