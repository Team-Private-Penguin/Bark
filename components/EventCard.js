import React, { useState, useEffect } from "react";
import EventDetail from "./EventDetail";
import { Modal, Card, Text, Group } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { createStyles, Button } from '@mantine/core';
const axios = require('axios').default;


const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
const defaultPhoto1 =
  "https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80";

function EventCard({ image }) {
  image = image ? defaultPhoto : defaultPhoto1;
  const [opened, setOpened] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

 //get admin id of this group, if it matches id here, conditionally render the buttons
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
    setIsAdmin(true);

  }, isAdmin);

  const handleEdit = (event) => {
    event.preventDefault();
    axios({
      method: 'PUT',
      url: '/api/events',
      params: {
        everything: ''
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleDelete = (event) => {
    event.preventDefault();
    axios({
      method: 'DELETE',
      url: '/api/events',
      params: {
        body: 1 //id of the event to delete.
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-[550px]">
        <Card radius="10px" shadow="sm" p="sm" onClick={() => setOpened(true)}>
          <Card.Section className="p-2">
            <Group>
              <Text className=""> Event Name TEMP</Text>
              <Text color="var(--light-blue)" align="left" size="sm">
                Date and Time TEMP
              </Text>
            </Group>
            <Text color="var(--black)" align="left">
              Event Location(Short)
            </Text>

            { isAdmin ? <Group grow spacing={0} >
              <Button onClick={handleEdit} variant="default" >
                EDIT
              </Button>
              <Button onClick={handleDelete} variant="default" >
                DELETE
              </Button>
            </Group> : <p>need admin privileges for button</p>}

          </Card.Section>
          <Card.Section className="flex justify-center items-center">
            <img className="rounded-[10px] max-h-[400px]" src={image} />
          </Card.Section>
          <Card.Section className="p-2">
            <Group className="group">
              <Text className="">Group Name TEMP</Text>
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
        <EventDetail />
      </Modal>
    </div>
  );
}

export default EventCard;
