import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Stack, ScrollArea } from "@mantine/core";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

function EventFeed({ userFeed, eventCount }) {
  const {
    query: { id },
  } = useRouter();
  const { user } = useUser();
  const user_id =
    user?.sub.split("google-oauth2|")[1] || user?.sub.split("auth0|")[1];
  const [currentEvents, setCurrentEvents] = useState([]);
  const [userRsvps, setUserRsvps] = useState([]);

  function getUserRsvps() {
    axios
      .get(`/api/event/rsvp?user_id=${user_id}`)
      .then((data) => setUserRsvps(data.data[0].rows))
      .catch((err) => console.log(err));
  }

  function getUserEvents() {
    return axios
      .get(`/api/userevents?user_id=${user_id}`)
      .then((data) => setCurrentEvents(data.data[0].rows))
      .catch((err) => console.log(err));
  }

  function getGroupEvents() {
    return axios
      .get(`/api/events?group_id=${id}`)
      .then((data) => {
        setCurrentEvents(data.data[0].rows);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (user_id) {
      if (userFeed) {
        Promise.all([getUserEvents(), getUserRsvps()]);
      } else {
        Promise.all([getGroupEvents(), getUserRsvps()]);
      }
    }
  }, [user_id, eventCount, userFeed]);

  return (
    <Stack className="h-[vh] overflow-auto">
      {currentEvents.map((event, index) => {
        return (
          <EventCard
            rsvp={
              !!userRsvps.filter((rsvp) => {
                return rsvp.event_id === event.event_id;
              }).length
            }
            getUserRsvps={getUserRsvps}
            key={index}
            event={event}
            user_id={user_id}
            getEvents={userFeed ? getUserEvents : getGroupEvents}
            event_id={event.event_id}
          />
        );
      })}
    </Stack>
  );
}

export default EventFeed;
