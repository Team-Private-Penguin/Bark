import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React from "react";
import { Card, Image, Text, Button, Stack } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function EventDetail({ image, event }) {
  const {
    name,
    address,
    date,
    prospective,
    description,
    group_name,
    admin_id,
  } = event;
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
              {date}
            </Text>
            <Text color="var(--black)" align="center">
              {address}
            </Text>
          </Stack>
          <Stack className="">
            <Button>RSVP!</Button>
          </Stack>
          <Stack className="w-[40%]">
            <Image radius="10px" fit="contain" src={defaultPhoto} />
          </Stack>
        </Card.Section>
        <Card.Section p=".5rem">{description}</Card.Section>
        <Card.Section>
          <AddComment />
        </Card.Section>
        <Card.Section className="p-2 h-[37vh] overflow-auto">
          <CommentFeed />
        </Card.Section>
      </Card>
      <Card className="space-y-1 w-[24%] h-[85vh]" radius="10px" shadow="sm">
        <Card.Section className="bg-main p-2">
          <h3 className="text-left font-bold color-accent">Attendees</h3>
        </Card.Section>
        <Card.Section className="h-[95%] overflow-auto space-y-72">
          <div>UserName</div>
        </Card.Section>
      </Card>
    </div>
  );
}

export default EventDetail;
