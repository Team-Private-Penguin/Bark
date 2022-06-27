import React from "react";
import { Group, Text } from "@mantine/core";

function Comment() {
  return (
    <>
      <Group className="bg-main" p=".5rem">
        <icon>UserIcon</icon>
        <Text className="bg-main" color="var(--black)" align="left">
          UserName
        </Text>
        <Text className="bg-main" color="var(--black)" align="left">
          Date and Time
        </Text>
      </Group>
      <Text className="bg-white p-2" color="var(--black)" align="left">
        Comment
      </Text>
    </>
  );
}

export default Comment;
