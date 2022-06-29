import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React, { useEffect, useState } from "react";
import { Card, Image, Text, Button, Stack, Group, Avatar } from "@mantine/core";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

function EventDetail({ image, event, rsvp, handleRsvp, user_id }) {
  const { user } = useUser();
  let userId = user?.sub.split("google-oauth2|")[1];
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
  useEffect(() => {
    axios
      .get(`/api/event/comment?id=${event_id}`)
      .then((data) => setComments(data.data[0].rows))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/event/rsvp?event_id=${event_id}`)
      .then((data) => setAttendees(data.data[0].rows))
      .catch((err) => console.log(err));
  }, [rsvp]);

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
          <h3 className="text-left font-bold">{group_name}</h3>
        </Card.Section>
        <Card.Section className="flex items-center justify-center space-x-4">
          <Stack className="w-[35%] flex-column">
            <h3 className="text-center font-bold color-accent">{name}</h3>
            <Text color="var(--light-blue)" align="center" size="sm">
              {timeStamp.toLocaleString([], {
                dateStyle: "short",
              })}
            </Text>
            <Text color="var(--black)" align="center">
              {address}
            </Text>
          </Stack>
          <Stack className="">
            <Button onClick={handleRsvp}>{rsvp ? "Cancel" : "RSVP!"}</Button>
          </Stack>
          <Stack className="w-[40%]">
            <Image radius="10px" fit="contain" src={image} />
          </Stack>
        </Card.Section>
        <Card.Section p=".5rem">{description}</Card.Section>
        <Card.Section>
          <AddComment
            user_id={userId}
            event={event}
            setComments={setComments}
          />
        </Card.Section>
        <Card.Section className="p-2 h-[37vh] overflow-auto">
          <CommentFeed comments={comments} />
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
