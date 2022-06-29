import React, { useState, useEffect } from "react";
import EventDetail from "./EventDetail";
import { Modal, Card, Text, Group } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { createStyles, Button } from "@mantine/core";
// import eventId from "./EventFeed";
const axios = require("axios").default;

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
const defaultPhoto1 =
  "https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80";

function EventCard({ image, event, eventId1 }) {
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
  } = event;
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    axios({
      method: 'get',
      url:  '/api/events',
      params: {
        body: 'admin'
      }
    })
    .then((response) => {
      console.log(response);
      setIsAdmin(response.data); //edit this in accordance with the response.
    })
    .catch((err) => {
      console.log(err);
    })
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
    axios({
      method: "DELETE",
      url: "/api/events",
      params: {
        body: eventId1, //id of the event to delete.
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-[550px]">
        <Card radius="10px" shadow="sm" p="sm" onClick={() => setOpened(true)}>
          <Card.Section className="p-2">
            <Group>
              <Text className="">{name}</Text>
              <Text color="var(--light-blue)" align="left" size="sm">
                {date}
              </Text>
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
            <img className="rounded-[10px] max-h-[400px]" src={image} />
          </Card.Section>
          <Card.Section className="p-2">
            <Group className="group">
              <Text className="">{group_name}</Text>
              <FontAwesomeIcon icon={faPaw} />
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
        <EventDetail image={image} event={event} />
      </Modal>
    </div>
  );
}

export default EventCard;
