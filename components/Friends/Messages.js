import { Stack, Group, Avatar, Box, ScrollArea } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function messagesList(list, user = "Isaac", friend = "Doggo") {
  const mappedMessages = list?.map((message, i) => {
    const timeStamp =  new Date(message.time)
    return (
      <Stack key={i} align="flex-start" className="gap-1 border-b-2 w-full">
        <Group className="mb-1 pl-5 align-bottom">
          <Avatar src={message.photo} radius="xl" component="span" size={30} className="ml-" />
          <span className="font-bold">{message.name}</span>
          <span className="text-[0.65rem] ">
            {timeStamp.toLocaleString([], {
              dateStyle: 'short',
              timeStyle: 'short'
              // hour: "2-digit",
              // minute: "2-digit",
            })}
          </span>
        </Group>
        <span className="text-left text-sm mb-1 pl-5">{message.text}</span>
      </Stack>
    )
  });
  return (
    <ScrollArea
      className=" h-[70%] bg-white"
      offsetScrollbars
      scrollbarSize={8}
    >
      <Stack align="flex-start" justify="flex-end" className="">
        {mappedMessages}
      </Stack>
    </ScrollArea>
  );
}
