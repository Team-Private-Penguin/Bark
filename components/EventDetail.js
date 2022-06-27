import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React from "react";
import { Card, Image, Text } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function EventDetail() {
  return (
    <Card className="space-y-1" radius="10px" shadow="sm">
      <Card.Section className="bg-main p-2">
        <h3 className="text-left font-bold color-accent">
          Group Name and Icon
        </h3>
      </Card.Section>
      <Card.Section className="flex items-center justify-top">
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
        <div className="w-[65%]">
          <Image radius="10px" fit="contain" src={defaultPhoto} />
        </div>
      </Card.Section>
      <Card.Section>
        <AddComment />
      </Card.Section>
      <Card.Section className="p-2 bg-main">
        <CommentFeed />
      </Card.Section>
    </Card>
  );
}

export default EventDetail;
