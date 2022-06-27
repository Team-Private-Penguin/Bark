import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React from "react";
import { Card, Image, Text, Button } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function EventDetail() {
  return (
    <div className="flex w-full h-full items-top justify-center space-x-2">
      <Card
        className="sticky top-0 space-y-1 w-[74%]"
        radius="10px"
        shadow="sm"
      >
        <Card.Section className="bg-main p-2">
          <h3 className="text-left font-bold color-accent">
            Group Name and Icon
          </h3>
        </Card.Section>
        <Card.Section className="flex items-center justify-top space-x-4">
          <div className="w-[35%] flex-column space-y-4 mb-10">
            <h3 className="text-center font-bold color-accent">
              Event Name TEMP
            </h3>
            <Text color="var(--light-blue)" align="center" size="sm">
              Date and Time TEMP
            </Text>
            <Text color="var(--black)" align="center">
              Event Location TEMP
            </Text>
            <Text color="var(--black)" align="left" p=".5rem">
              Event Description
            </Text>
          </div>
          <div className="w-[40%]">
            <Image radius="10px" fit="contain" src={defaultPhoto} />
          </div>
          <div className="">
            <Button>RSVP!</Button>
          </div>
        </Card.Section>
        <Card.Section className="">
          <AddComment />
        </Card.Section>
        <Card.Section className="p-2 bg-main h-[37vh] overflow-auto">
          <CommentFeed />
        </Card.Section>
      </Card>
      <Card className="space-y-1 w-[24%] h-[85vh]" radius="10px" shadow="sm">
        <Card.Section className="bg-main p-2">
          <h3 className="text-left font-bold color-accent">Attendees</h3>
        </Card.Section>
        <Card.Section className="h-[95%] overflow-auto space-y-72">
          <div>UserName</div>
          <div>UserName</div>
          <div>UserName</div>
          <div>UserName</div>
          <div>UserName</div>
        </Card.Section>
      </Card>
    </div>
  );
}

export default EventDetail;
