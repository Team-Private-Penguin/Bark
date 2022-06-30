import React, { useState, useEffect } from "react";
import EventDetail from "./EventDetail";
import {
  Modal,
  Card,
  Text,
  Group,
  Switch,
  Button,
  Badge,
  Stack,
  Title,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPaw } from "@fortawesome/free-solid-svg-icons";
const axios = require("axios").default;
import Link from "next/link";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function EventCard({ event, rsvp, getUserRsvps, user_id, getEvents }) {
  const [opened, setOpened] = useState(false);
  const {
    name,
    address,
    date,
    prospective,
    description,
    group_name,
    admin_id,
    event_id,
    group_id,
    img_url,
    owner_id,
  } = event;
  const [isAdmin, setIsAdmin] = useState(false);
  const isOwner = owner_id === user_id;
  const timeStamp = new Date(date);
  let image = img_url || defaultPhoto;
  console.log(img_url);
  function handleRsvp() {
    if (rsvp) {
      axios({
        method: "DELETE",
        url: "/api/event/rsvp",
        data: {
          user_id,
          event_id,
        },
      })
        .then(() => getUserRsvps())
        .catch((err) => console.log(err));
    } else {
      const submission = { user_id, event_id };
      axios
        .post(`/api/event/rsvp`, submission)
        .then(() => getUserRsvps())
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    // axios({
    //   method: 'get',
    //   url:  '/api/events',
    //   params: {
    //     body: 'admin'
    //   }
    // })
    // .then((response) => {
    //   console.log(response);
    //   setIsAdmin(response.data); //edit this in accordance with the response.
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    setIsAdmin(false);
  }, [isAdmin]);

  const handleEdit = (event) => {
    event.preventDefault();
    // axios({
    //   method: "PUT",
    //   url: "/api/events",
    //   params: {
    //     everything: "",
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    // axios({
    //   method: "DELETE",
    //   url: "/api/events",
    //   params: {
    //     body: 1, //id of the event to delete.
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  function handleDeleteEvent() {
    axios({
      method: "DELETE",
      url: "/api/events",
      data: {
        event_id,
      },
    })
      .then(() => getEvents())
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-[550px]">
        <Card radius="10px" shadow="sm" p="sm">
          <Card.Section className="p-2">
            <Stack>
              {prospective ? <Badge color="grape">PLANNING EVENT</Badge> : null}
            </Stack>
            <Group position="apart">
              <Title order={3} className="" onClick={() => setOpened(true)}>
                {name}
              </Title>
              {isOwner ? (
                <Button onClick={handleDeleteEvent} color="red">
                  Delete Event
                </Button>
              ) : null}
              <Title order={5}>
                {timeStamp.toLocaleString([], {
                  dateStyle: "short",
                })}
              </Title>
            </Group>
            {isAdmin ? (
              <Group grow spacing={0}>
                <Button onClick={handleEdit} variant="default">
                  EDIT
                </Button>
                <Button onClick={handleDeleteEvent} variant="default">
                  DELETE
                </Button>
              </Group>
            ) : null}
          </Card.Section>
          <Card.Section className="flex justify-center items-center">
            <img
              className="rounded-[10px] max-h-[400px]"
              src={image}
              onClick={() => setOpened(true)}
            />
          </Card.Section>
          <Card.Section className="p-2">
            <Group className="group">
              <Link href={`/group?id=${group_id}`} passHref>
                <Badge className="">{group_name}</Badge>
              </Link>
              <Switch
                checked={rsvp}
                onChange={handleRsvp}
                label={prospective ? "Interested?" : "RSVP"}
              ></Switch>
            </Group>
          </Card.Section>
        </Card>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        transition="fade"
        transitionDuration={300}
        transitionTimingFunction="ease"
        size="65%"
        overflow="outside"
      >
        <EventDetail
          image={image}
          event={event}
          rsvp={rsvp}
          user_id={user_id}
          handleRsvp={handleRsvp}
          handleDeleteEvent={handleDeleteEvent}
          isOwner={isOwner}
        />
      </Modal>
    </div>
  );
}

export default EventCard;
