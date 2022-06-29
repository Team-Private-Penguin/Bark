import React from "react";
import { Group, Text, Card, Avatar } from "@mantine/core";

function Comment({ commentObj }) {
  const { comment, date, name, photo } = commentObj;
  return (
    <Card className="border rounded-xl">
      <Card.Section className="bg-main" p=".5rem">
        <Group>
          <Avatar src={photo} radius="xl" component="span" size={30} />
          <Text className="" color="var(--black)" align="left">
            {name}
          </Text>
          <Text className="" color="var(--black)" align="left">
            {date}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section p=".5rem">{comment}</Card.Section>
    </Card>
  );
}

export default Comment;
