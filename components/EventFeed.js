import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Stack } from "@mantine/core";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

function EventFeed({ userFeed }) {
  const {
    query: { id },
  } = useRouter();
  const { user } = useUser();
  const user_id = user?.sub.split("google-oauth2|")[1];
  const [currentEvents, setCurrentEvents] = useState([]);
  function getUserEvents() {
    axios
      .get(`/api/userevents?user_id=${user_id}`)
      .then((data) => setCurrentEvents[data.data[0].rows])
      .catch((err) => console.log(err));
  }

  function getGroupEvents() {
    axios
      .get(`/api/events?group_id=${id}`)
      .then((data) => {
        setCurrentEvents[data.data[0].rows];
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (userFeed) {
      getUserEvents();
    } else {
      console.log(currentEvents);
      getGroupEvents();
    }
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
