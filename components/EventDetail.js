import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Switch,
  Stack,
  Group,
  Avatar,
  Badge,
  Title,
  Button,
} from "@mantine/core";
import axios from "axios";

function EventDetail({
  image,
  event,
  rsvp,
  handleRsvp,
  user_id,
  handleDeleteEvent,
  isOwner,
}) {
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
  const timeStamp = new Date(date);
  const [comments, setComments] = useState([{}]);
  const [attendees, setAttendees] = useState([{}]);

  function getComments() {
    axios
      .get(`/api/event/comment?id=${event_id}`)
      .then((data) => setComments(data.data[0].rows))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getComments();
  }, [user_id]);

  useEffect(() => {
    axios
      .get(`/api/event/rsvp?event_id=${event_id}`)
      .then((data) => setAttendees(data.data[0].rows))
      .catch((err) => console.log(err));
  }, [rsvp, user_id]);

  const attendeeList = attendees.map((attendee, index) => {
    return (
      <Group key={index} className="border-b-2 pb-1 pt-50 mb-3">
        <Avatar
          src={attendee.photo}
          radius="xl"
          component="span"
          size={30}
          className="ml-5"
        />
        <Text className="ml-1">{attendee.name}</Text>
      </Group>
    );
  });

  return (
    <div className="flex w-full h-full items-top justify-center space-x-2">
      <Card
        className="sticky top-0 space-y-1 w-[74%]"
        radius="10px"
        shadow="sm"
      >
        <Card.Section className="bg-main p-2">
          <Group position="apart">
            <Title order={3}>{name}</Title>
            <Title order={5}>
              {timeStamp.toLocaleString([], {
                dateStyle: "short",
              })}
            </Title>
            {isOwner ? (
              <Button onClick={handleDeleteEvent} color="red">
                Delete Event
              </Button>
            ) : null}
          </Group>
        </Card.Section>
        <Stack>
          {prospective ? <Badge color="grape">PLANNING EVENT</Badge> : null}
        </Stack>
        <Card.Section className="flex items-center justify-center space-x-4">
          <Stack className="w-[40%]">
            <Image radius="10px" fit="contain" src={image} />
          </Stack>
        </Card.Section>

        <Card.Section p=".5rem">
          <Group position="apart">
            <Badge className="">{group_name}</Badge>
            <Switch
              checked={rsvp}
              onChange={handleRsvp}
              label={prospective ? "Interested?" : "RSVP"}
            ></Switch>
          </Group>
          <Text color="var(--black)" size="lg">
            {address}
          </Text>
          <Text color="var(--black)" size="md">
            {description}
          </Text>
        </Card.Section>
        <Card.Section>
          <AddComment
            user_id={user_id}
            event={event}
            setComments={setComments}
          />
        </Card.Section>
        <Card.Section className="p-2 h-[37vh] overflow-auto">
          <CommentFeed
            comments={comments}
            isOwner={isOwner}
            getComments={getComments}
          />
        </Card.Section>
      </Card>
      <Card className="space-y-1 w-[24%] h-[85vh]" radius="10px" shadow="sm">
        <Card.Section className="bg-main p-2">
          <h3 className="text-left font-bold color-accent">Attendees</h3>
        </Card.Section>
        <Card.Section className="h-[95%] overflow-auto space-y-72">
          {attendeeList}
        </Card.Section>
      </Card>
    </div>
  );
}

export default EventDetail;
