import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Stack } from "@mantine/core";
import axios from "axios";

function EventFeed() {
  const TempUserId = 1;
  const [currentEvents, setCurrentEvents] = useState([]);
  function getUserEvents() {
    axios
      .get(`/api/userevents?user_id=${TempUserId}`)
      .then((data) => setCurrentEvents[data.data[0].rows])
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <Stack className="h-[74vh] overflow-auto">
      {currentEvents.map((event, index) => (
        <EventCard key={index} image={true} event={event} />
      ))}
    </Stack>
  );
}

export default EventFeed;
