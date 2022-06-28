import React, { useEffect, useState } from "react";
import axios from "axios";
import { Group, Avatar, Stack, ScrollArea } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserCircle } from "@fortawesome/free-regular-svg-icons";

function FriendList({ friendList, setClicked, handleChat }) {
  const mappedFriends = friendList.map((friend, index) => {
    return (
      <Group className="border-b-2 pb-1 pt-50 mb-3">
        <Group className=" w-[50%]">
          <Avatar
            src={friend.photo}
            radius="xl"
            component="span"
            size={30}
            className="ml-5"
          />
          <span className="ml-2">{friend.name}</span>
        </Group>
        <Group position="right" className="w-[40%] ">
          <Avatar
            onClick={() => {
              handleChat(friend);
              setClicked(friend)
            }}
            radius="xl"
            size={25}
            className="cursor-pointer shadow"
          >
            <FontAwesomeIcon icon={faMessage} className="w-[55%] " />
          </Avatar>
          <Avatar radius="xl" size={25} className="cursor-pointer shadow">
            <FontAwesomeIcon icon={faUserCircle} className="w-[55%] " />
          </Avatar>
        </Group>
      </Group>
    );
  });
  return (
    <ScrollArea
      offsetScrollbars
      scrollbarSize={8}
      className="h-[85%] sm:h-[72%] mt-2"
    >
      {mappedFriends}
      <div>asd </div>
      <div>asd </div>
      <div>asd </div>
      <div>asd </div>
    </ScrollArea>
  );
}

export default FriendList;
