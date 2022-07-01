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
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
const axios = require("axios").default;
import Link from "next/link";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function EventCard({
  event,
  rsvp,
  getUserRsvps,
  user_id,
  eventId1,
  getEvents,
}) {
  const [opened, setOpened] = useState(false);
  const {
    name,
    date,
    prospective,
    group_name,
    admin_id,
    event_id,
    group_id,
    img_url,
    owner_id,
  } = event;
  const canEdit = owner_id === user_id || admin_id === user_id;
  const timeStamp = new Date(date);
  let image = img_url || defaultPhoto;
  const [groupId, setGroupId] = useState(0);

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
  const editForm = useForm({
    initialValues: {
      name: "",
      date: "",
      description: "",
      lat: "",
      lng: "",
      address: "",
      prospective: "",
    },
  });

  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    axios({
      method: "PUT",
      url: "/api/admin",
      params: {
        body: "asdfasdf",
        event_id: eventId1,
      },
    })
      .then((response) => {
        console.log("updating!");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Card radius="10px" shadow="lg" p="md">
          <Card.Section className="p-2">
            <Stack>
              {prospective ? <Badge color="red">PLANNING EVENT</Badge> : null}
            </Stack>
            <Group position="apart">
              <Title
                order={3}
                className="cursor-pointer"
                onClick={() => setOpened(true)}
              >
                {name}
              </Title>

              <Title order={5}>
                {timeStamp.toLocaleString([], {
                  dateStyle: "short",
                })}
              </Title>
            </Group>
            {canEdit ? (
              <Group grow spacing={0}>
                <Button onClick={() => setOpenEdit(true)} variant="default">
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
              className="rounded-[10px] max-h-[400px] cursor-pointer"
              src={image}
              onClick={() => setOpened(true)}
            />
          </Card.Section>
          <Card.Section className="p-2">
            <Group className="group">
              <Link href={`/group?id=${group_id}`} passHref>
                <Badge color="cyan" className="hover:cursor-pointer">
                  {group_name}
                </Badge>
              </Link>

              <Switch
                color="cyan"
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
        size="50%"
        overflow="outside"
      >
        <EventDetail
          image={image}
          event={event}
          rsvp={rsvp}
          user_id={user_id}
          handleRsvp={handleRsvp}
          handleDeleteEvent={handleDeleteEvent}
          handleEdit={handleEdit}
          canEdit={canEdit}
        />
      </Modal>
      <Modal
        opened={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit event"
      >
        <form onSubmit={editForm.onSubmit((values) => editEvent(values))}>
          <TextInput
            placeholder="Event Name"
            label="Event name"
            required
            {...editForm.getInputProps("name")}
          />
          <TextInput
            placeholder="Address Line 1"
            label="Address"
            required
            {...editForm.getInputProps("address_1")}
          />
          <TextInput
            placeholder="description"
            label="Description"
            required
            {...editForm.getInputProps("description")}
          />
          <DatePicker
            placeholder="Pick date"
            label="Event date"
            required
            {...editForm.getInputProps("date")}
          />
          <TextInput
            placeholder="event id"
            label="Event id"
            required
            {...editForm.getInputProps("event_id")}
          />
          <TextInput
            placeholder="group id"
            label="group id"
            required
            {...editForm.getInputProps("group_id")}
          />

          <Group position="right" mt="md">
            <Button className="bg-slate-800" type="submit">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default EventCard;
