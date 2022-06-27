import { Stack, Group, Avatar } from "@mantine/core";
import React from "react";

export default function messagesList(list, user = "Isaac", friend = "Doggo") {
  const mappedMessages = list.map((message) => (
    <Stack align="flex-start"  className="gap-1" >
      <Group>
        <Avatar radius="xl" component="span" size={35} className="ml-1" />
        <span className="font-bold">{message.sent ? user : friend}</span>
        <span className="text-xs ">
          {message.time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </Group>
      <span className="text-left">{message.text}</span>
    </Stack>
  ));
  return (
    <Stack align="flex-start" justify="flex-end" className="ml-5 h-[65%]">
      {mappedMessages}
    </Stack>
  );
}
