import React from "react";
import { Group, Text, Card } from "@mantine/core";

function Comment() {
  return (
    <Card className="border rounded-xl">
      <Card.Section className="bg-main" p=".5rem">
        <Group>
          <div>UserIcon</div>
          <Text className="" color="var(--black)" align="left">
            UserName
          </Text>
          <Text className="" color="var(--black)" align="left">
            Date and Time
          </Text>
        </Group>
      </Card.Section>
      <Card.Section p=".5rem">Comment</Card.Section>
    </Card>
  );
}

export default Comment;
