import React, { useState, useEffect } from "react";
import EventDetail from "./EventDetail";
import { Modal, Card, Text, Group } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Switch, Button } from "@mantine/core";
const axios = require("axios").default;

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
const defaultPhoto1 =
  "https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80";

function EventCard({ image, event, rsvp, getUserRsvps, user_id }) {
  image = image ? defaultPhoto : defaultPhoto1;
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
  } = event;
  const [isAdmin, setIsAdmin] = useState(false);

  function handleRsvp() {
    if (rsvp) {
      axios({
        method: "DELETE",
        url: "/api/event/rsvp",
        data: {
          user_id,
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

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-[550px]">
        <Card radius="10px" shadow="sm" p="sm">
          <Card.Section className="p-2" onClick={() => setOpened(true)}>
            <Group>
              <Text className="">{name}</Text>
              <Text color="var(--light-blue)" align="left" size="sm">
                {date}
              </Text>

              {prospective ? (
                <Text color="purple"> *PLANNING EVENT*</Text>
              ) : null}
            </Group>
            <Text color="var(--black)" align="left">
              {address}
            </Text>

            {isAdmin ? (
              <Group grow spacing={0}>
                <Button onClick={handleEdit} variant="default">
                  EDIT
                </Button>
                <Button onClick={handleDelete} variant="default">
                  DELETE
                </Button>
              </Group>
            ) : (
              <p>need admin privileges to change</p>
            )}
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
              <Text className="">{group_name}</Text>
              <Switch
                checked={rsvp}
                onChange={handleRsvp}
                label="RSVP"
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
        />
      </Modal>
    </div>
  );
}

export default EventCard;
