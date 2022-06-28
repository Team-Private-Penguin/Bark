import React from "react";
import EventCard from "../components/EventCard";
import { Stack } from "@mantine/core";

function EventFeed() {
  return (
    <Stack className="h-[74vh] overflow-auto">
      {/* .map of Events */}
      <EventCard image={true} />
      <EventCard image={false} />
    </Stack>
  );
}

export default EventFeed;
